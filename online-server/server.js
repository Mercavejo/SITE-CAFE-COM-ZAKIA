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
  broadcast(room, roomState(room));
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
  };
  rooms.set(code, room);
  ws.roomCode = code;
  ws.playerId = id;
  room.clients.set(id, { id, ws, player: { ...player, id, host: true } });
  publishRoom(room);
}

function joinRoom(ws, data) {
  const code = safeRoomCode(data.roomCode);
  const room = rooms.get(code);
  if (!room) return send(ws, { type: "error", message: "Sala nao encontrada." });
  if (room.clients.size >= MAX_PLAYERS) return send(ws, { type: "error", message: "Sala cheia." });

  const player = data.player || {};
  const id = player.id || `p${Date.now().toString(36)}`;
  ws.roomCode = code;
  ws.playerId = id;
  room.clients.set(id, { id, ws, player: { ...player, id, host: false } });
  publishRoom(room);
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
    if (data.type === "player-update") return updatePlayer(ws, data);
    if (data.type === "input") return relayInput(ws, data);
    if (data.type === "start-race" || data.type === "snapshot") return relayFromHost(ws, data);
  });
  ws.on("close", () => leaveRoom(ws));
});

server.listen(PORT, () => {
  console.log(`CARFUK Online server running on ws://localhost:${PORT}`);
});
