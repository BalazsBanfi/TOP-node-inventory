#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const CATEGORIES_SQL = `
DROP TABLE IF EXIST categories;

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
  category VARCHAR ( 64 ) NOT NULL,
  UNIQUE (category)
);

INSERT INTO categories (category) 
VALUES ('Racing'), ('Daily trainer'), ('Trail'), ('Stability'), ('Value'), ('Other');
`
  ;

const SHOES_SQL = `
DROP TABLE IF EXISTS shoes;

CREATE TABLE IF NOT EXISTS shoes (
  category_id INTEGER,
  name VARCHAR ( 64 ),
  brand VARCHAR ( 64 ),
  color VARCHAR ( 16 ),
  size INTEGER,
  price DECIMAL (4, 2),
  shoetype INTEGER,
  added DATE
);

INSERT INTO shoes (category_id INTEGER,
  name,
  brand,
  color,
  size,
  price,
  shoetype,
  added) 
VALUES ('Racing'), ('Daily trainer'), ('Trail'), ('Stability'), ('Value'), ('Other');

`;

const initDb = async () => {
  console.log("seeding...");
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    ssl: true
  });
  await client.connect();
  await client.query(CATEGORIES_SQL);
  await client.query(SHOES_SQL);
  await client.end();
  console.log("done");
}

initDb();