// /app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // put this in .env.local
});

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM todos ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}

export async function POST(req: NextRequest) {
  const { task, description } = await req.json();
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO todos (task, description) VALUES ($1, $2) RETURNING *',
      [task, description]
    );
    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}
