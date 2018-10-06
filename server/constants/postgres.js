const host = process.env.POSTGRES_HOST || '127.0.0.1';
const port = process.env.POSTGRES_PORT || 5432;
const database = process.env.POSTGRES_DATABASE || 'postgres';
const dialect = 'postgres';
const user = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'password';
const url = process.env.POSTGRES_URL || 'postgresql://postgres:password@127.0.0.1:5432/postgres';

module.exports = {
  host,
  port,
  database,
  dialect,
  password,
  url,
  user,
}
