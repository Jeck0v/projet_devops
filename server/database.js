const { Pool, Client } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  password: 'phgh206',
  host: 'localhost',
  port: 5433,
});

(async () => {
  try {
    const dbName = 'shopping_db';

    // Ici c'est pour vérifier si la base de donnée existe 
    const checkDB = await pool.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);

    if (checkDB.rowCount === 0) {
      await pool.query(`CREATE DATABASE ${dbName}`);
      console.log('DATABASE CREATED');
    } else {
      console.log('DATABASE ALREADY EXISTS');
    }

    // Ici c'est pour se connecter à la base de donnée
    const client = new Client({
      user: 'postgres',
      password: 'phgh206',
      host: 'localhost',
      port: 5433,
      database: dbName,
    });

    await client.connect();

    // Ici vu que le fichier init.sql est dans un autre dossier il va falloir le charger et l'exécuter
    const initSQLPath = "../DB/init.sql";
    if (!fs.existsSync(initSQLPath)) {
      throw new Error(`Fichier introuvable : ${initSQLPath}`);
    }

    const initSQL = fs.readFileSync(initSQLPath, 'utf8');
    await client.query(initSQL);
    console.log('Tables créées et les données ont été insérées.');

    await client.end();
  } catch (err) {
    console.error('Erreur lors de l'/'initialisation de la base de donnée:', err.message);
  } finally {
    await pool.end();
  }
})();
