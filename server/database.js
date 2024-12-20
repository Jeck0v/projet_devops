const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  password: 'phgh206',
  host: 'localhost',
  port: 5433,
});

(async () => {
  try {
    const dbName = 'shopping_db';

    // Vérifiez si la base de données existe
    const checkDB = await pool.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);

    if (checkDB.rowCount === 0) {
      await pool.query(`CREATE DATABASE ${dbName}`);
      console.log('DATABASE CREATED');
    } else {
      console.log('DATABASE ALREADY EXISTS');
    }

    // Connectez-vous à la base
    const client = new Client({
      user: 'postgres',
      password: 'phgh206',
      host: 'localhost',
      port: 5433,
      database: dbName,
    });

    await client.connect();

    // Chargez et exécutez le fichier init.sql
    const initSQLPath = "/Users/ghp/projet_devops-1/DB/init.sql";
    if (!fs.existsSync(initSQLPath)) {
      throw new Error(`Fichier introuvable : ${initSQLPath}`);
    }

    const initSQL = fs.readFileSync(initSQLPath, 'utf8');
    await client.query(initSQL);
    console.log('Tables created and data inserted.');

    await client.end();
  } catch (err) {
    console.error('Error initializing database:', err.message);
  } finally {
    await pool.end();
  }
})();
