import { randomUUID } from "crypto";
import { Pool } from "pg";

export type ParticipantRequestStatus = "novo" | "aprovado" | "reprovado";

export type ParticipantRequestInput = {
  name: string;
  email: string;
  whatsapp: string;
  social: string;
  payload: Record<string, unknown>;
  importLink: string;
};

export type ParticipantDocumentInput = {
  name: string;
  email: string;
  whatsapp: string;
  social: string;
  cpfLast4: string;
  payload: Record<string, unknown>;
  pdfBase64: string;
  pdfFilename: string;
};

export type ParticipantRequestRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ParticipantRequestStatus;
  name: string;
  email: string;
  whatsapp: string;
  social: string;
  payload: Record<string, unknown>;
  importLink: string;
  reviewNote: string | null;
};

let pool: Pool | null = null;
let initialized = false;

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    ""
  );
}

export function hasParticipantDatabase() {
  return Boolean(getDatabaseUrl());
}

function getPool() {
  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("Banco de dados nao configurado. Configure DATABASE_URL na Vercel.");
  }

  if (!pool) {
    const isLocal = /localhost|127\.0\.0\.1/i.test(connectionString);
    pool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    });
  }

  return pool;
}

async function ensureTables() {
  if (initialized) return;

  const client = getPool();
  await client.query(`
    CREATE TABLE IF NOT EXISTS participant_requests (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status TEXT NOT NULL DEFAULT 'novo',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      social TEXT NOT NULL,
      payload JSONB NOT NULL,
      import_link TEXT NOT NULL,
      review_note TEXT
    );

    CREATE INDEX IF NOT EXISTS participant_requests_created_idx
      ON participant_requests (created_at DESC);

    CREATE TABLE IF NOT EXISTS participant_documents (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      social TEXT NOT NULL,
      cpf_last4 TEXT NOT NULL,
      payload JSONB NOT NULL,
      pdf_filename TEXT NOT NULL,
      pdf_base64 TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS participant_documents_created_idx
      ON participant_documents (created_at DESC);
  `);

  initialized = true;
}

function mapRequestRow(row: Record<string, unknown>): ParticipantRequestRecord {
  return {
    id: String(row.id),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
    status: String(row.status) as ParticipantRequestStatus,
    name: String(row.name),
    email: String(row.email),
    whatsapp: String(row.whatsapp),
    social: String(row.social),
    payload: row.payload as Record<string, unknown>,
    importLink: String(row.import_link),
    reviewNote: row.review_note ? String(row.review_note) : null,
  };
}

export async function saveParticipantRequest(input: ParticipantRequestInput) {
  if (!hasParticipantDatabase()) return null;

  await ensureTables();
  const id = randomUUID();
  const result = await getPool().query(
    `
      INSERT INTO participant_requests
        (id, name, email, whatsapp, social, payload, import_link)
      VALUES
        ($1, $2, $3, $4, $5, $6::jsonb, $7)
      RETURNING *
    `,
    [
      id,
      input.name,
      input.email,
      input.whatsapp,
      input.social,
      JSON.stringify(input.payload),
      input.importLink,
    ],
  );

  return mapRequestRow(result.rows[0]);
}

export async function listParticipantRequests() {
  if (!hasParticipantDatabase()) return null;

  await ensureTables();
  const result = await getPool().query(
    `
      SELECT *
      FROM participant_requests
      ORDER BY created_at DESC
      LIMIT 100
    `,
  );

  return result.rows.map(mapRequestRow);
}

export async function updateParticipantRequestStatus(
  id: string,
  status: ParticipantRequestStatus,
  reviewNote = "",
) {
  if (!hasParticipantDatabase()) return null;

  await ensureTables();
  const result = await getPool().query(
    `
      UPDATE participant_requests
      SET status = $2,
          review_note = NULLIF($3, ''),
          updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
    [id, status, reviewNote],
  );

  return result.rowCount ? mapRequestRow(result.rows[0]) : null;
}

export async function saveParticipantDocument(input: ParticipantDocumentInput) {
  if (!hasParticipantDatabase()) return null;

  await ensureTables();
  const id = randomUUID();
  await getPool().query(
    `
      INSERT INTO participant_documents
        (id, name, email, whatsapp, social, cpf_last4, payload, pdf_filename, pdf_base64)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9)
    `,
    [
      id,
      input.name,
      input.email,
      input.whatsapp,
      input.social,
      input.cpfLast4,
      JSON.stringify(input.payload),
      input.pdfFilename,
      input.pdfBase64,
    ],
  );

  return { id };
}
