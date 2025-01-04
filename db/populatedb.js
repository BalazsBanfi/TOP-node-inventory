#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();
/*
 * Shoe inventory
 * Table: categories
 *  Columns: id, category
 *  Values: Racing, Daily trainer, Trail, Stability, Value, Other
 * Table: shoes
 *  Columns: id, category_id, name, brand, color, size, price, added
 */

const CATEGORIES_SQL = `
DROP TABLE IF EXISTS categories;

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
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,  
  category_id INTEGER,
  name VARCHAR ( 64 ),
  brand VARCHAR ( 64 ),
  color VARCHAR ( 16 ),
  size INTEGER,
  price DECIMAL (4, 2),
  added DATE
);

INSERT INTO shoes
  (category_id, name, brand, color, size, price, added) 
  VALUES (5, 'Run Active Grip', 'Kalenji', 'Blue', 46, 22.50, '2019-01-14'),
  (2, 'Rouge Rabbit IV', 'Li-Ning', 'Black', 46, 24.20, '2023-12-27'),
  (5, 'Vitaly', 'Joma', 'Black', 46, 26.70, '2024-08-10'),
  (1, 'Red Hare 7', 'Li-Ning', 'Black', 46, 28.00, '2024-10-12');
`;

const initDb = async () => {
  console.log("seeding...");
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
    //,ssl: true
  });
  await client.connect();
  await client.query(CATEGORIES_SQL);
  await client.query(SHOES_SQL);
  await client.end();
  console.log("done");
}

initDb();