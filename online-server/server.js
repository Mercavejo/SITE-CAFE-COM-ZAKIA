const http = require("http");
const { WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT || 8787);
const MAX_PLAYERS = 4;
const rooms = new Map();

function safeRoomCode(value = "") {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

function send(ws, payload) {
  if (ws.readyState !== ws.OPEN) return;
  ws.send(JSON.stringify(payload));
}

function broadcast(room, payload, except = null) {
  for (const client of room.clients.values()) {
    if (client.ws === except) continue;
    send(client.ws, payload);
  }
}

function roomState(room) {
  return {
    type: "room-state",
    roomCode: room.code,
    players: [...room.clients.values()].map((client) => ({
      ...client.player,
      host: client.id === room.hostId,
    })),
  };
}

function publishRoom(room) {
  if (room.raceConfig) room.raceConfig.players = roomState(room).players;
  broadcast(room, roomState(room));
}

function makeRoomCode() {
  let code = "";
  do {
    code = `DZ${Math.floor(1000 + Math.random() * 9000)}`;
  } while (rooms.has(code));
  return code;
}

function nextFreeCarIndex(room, requested = 0) {
  const used = new Set([...room.clients.values()].map((client) => Number(client.player.carIndex)));
  const wanted = Number.isFinite(Number(requested)) ? Number(requested) : 0;
  if (!used.has(wanted)) return wanted;
  for (let i = 0; i < 12; i++) {
    if (!used.has(i)) return i;
  }
  return wanted;
}

function addClientToRoom(room, ws, player, host = false) {
  const id = player.id || `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const carIndex = nextFreeCarIndex(room, player.carIndex);
  ws.roomCode = room.code;
  ws.playerId = id;
  const normalizedPlayer = {
    ...player,
    id,
    carIndex,
    host,
  };
  room.clients.set(id, { id, ws, player: normalizedPlayer });
  return normalizedPlayer;
}

function availableQuickRoom() {
  const liveRooms = [...rooms.values()]
    .filter((room) => room.public && room.clients.size > 0 && room.clients.size < MAX_PLAYERS)
    .sort((a, b) => {
      const liveA = a.raceConfig ? 1 : 0;
      const liveB = b.raceConfig ? 1 : 0;
      return liveB - liveA || (b.updatedAt || 0) - (a.updatedAt || 0);
    });
  return liveRooms[0] || null;
}

function leaveRoom(ws) {
  const code = ws.roomCode;
  const id = ws.playerId;
  if (!code || !id) return;
  const room = rooms.get(code);
  if (!room) return;
  room.clients.delete(id);
  if (!room.clients.size) {
    rooms.delete(code);
    return;
  }
  if (room.hostId === id) {
    const nextHost = room.clients.values().next().value;
    room.hostId = nextHost.id;
  }
  publishRoom(room);
}

function createRoom(ws, data) {
  const code = safeRoomCode(data.roomCode);
  if (!code) return send(ws, { type: "error", message: "Codigo de sala invalido." });
  if (rooms.has(code)) return send(ws, { type: "error", message: "Esta sala ja existe. Tente criar outra." });

  const player = data.player || {};
  const id = player.id || `p${Date.now().toString(36)}`;
  const room = {
    code,
    hostId: id,
    clients: new Map(),
    public: Boolean(data.public),
    raceConfig: null,
    latestSnapshot: null,
    updatedAt: Date.now(),
  };
  rooms.set(code, room);
  addClientToRoom(room, ws, { ...player, id }, true);
  publishRoom(room);
}

function joinRoom(ws, data) {
  const code = safeRoomCode(data.roomCode);
  const room = rooms.get(code);
  if (!room) return send(ws, { type: "error", message: "Sala nao encontrada." });
  if (room.clients.size >= MAX_PLAYERS) return send(ws, { type: "error", message: "Sala cheia." });

  const player = data.player || {};
  const id = player.id || `p${Date.now().toString(36)}`;
  addClientToRoom(room, ws, player, false);
  publishRoom(room);
  if (room.raceConfig) {
    send(ws, {
      type: "live-race",
      roomCode: room.code,
      config: room.raceConfig,
      snapshot: room.latestSnapshot,
    });
  }
}

function quickPlay(ws, data) {
  const player = data.player || {};
  let room = availableQuickRoom();
  let created = false;
  if (!room) {
    const code = makeRoomCode();
    const id = player.id || `p${Date.now().toString(36)}`;
    room = {
      code,
      hostId: id,
      clients: new Map(),
      public: true,
      raceConfig: null,
      latestSnapshot: null,
      updatedAt: Date.now(),
    };
    rooms.set(code, room);
    addClientToRoom(room, ws, { ...player, id }, true);
    created = true;
  } else {
    addClientToRoom(room, ws, player, false);
  }
  publishRoom(room);
  send(ws, {
    type: "quick-play-result",
    roomCode: room.code,
    role: ws.playerId === room.hostId ? "host" : "client",
    created,
    players: roomState(room).players,
    config: room.raceConfig,
    snapshot: room.latestSnapshot,
    autoStart: created && !room.raceConfig,
  });
}

function updatePlayer(ws, data) {
  const room = rooms.get(ws.roomCode);
  if (!room || !ws.playerId || !room.clients.has(ws.playerId)) return;
  const client = room.clients.get(ws.playerId);
  client.player = {
    ...client.player,
    ...(data.player || {}),
    id: ws.playerId,
    host: ws.playerId === room.hostId,
  };
  publishRoom(room);
}

function relayInput(ws, data) {
  const room = rooms.get(ws.roomCode);
  if (!room) return;
  const host = room.clients.get(room.hostId);
  if (!host || host.ws === ws) return;
  send(host.ws, {
    type: "input",
    roomCode: room.code,
    playerId: ws.playerId,
    input: data.input || {},
  });
}

function relayFromHost(ws, data) {
  const room = rooms.get(ws.roomCode);
  if (!room || ws.playerId !== room.hostId) return;
  room.updatedAt = Date.now();
  if (data.type === "start-race") {
    room.raceConfig = data.config || null;
    room.latestSnapshot = null;
  }
  if (data.type === "snapshot") {
    room.latestSnapshot = data.snapshot || null;
  }
  broadcast(room, { ...data, roomCode: room.code }, ws);
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ ok: true, service: "CARFUK Online", rooms: rooms.size }));
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let data = null;
    try {
      data = JSON.parse(raw.toString());
    } catch (error) {
      return send(ws, { type: "error", message: "Mensagem invalida." });
    }
    if (data.type === "create-room") return createRoom(ws, data);
    if (data.type === "join-room") return joinRoom(ws, data);
    if (data.type === "quick-play") return quickPlay(ws, data);
    if (data.type === "player-update") return updatePlayer(ws, data);
    if (data.type === "input") return relayInput(ws, data);
    if (data.type === "start-race" || data.type === "snapshot") return relayFromHost(ws, data);
  });
  ws.on("close", () => leaveRoom(ws));
});

server.listen(PORT, () => {
  console.log(`CARFUK Online server running on ws://localhost:${PORT}`);
});
