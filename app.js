const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.database,
    });
    app.listen(3000);
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

app.get("/players/", async (request, response) => {
  const getAuthorBooksQuery = `
    SELECT
     *
    FROM
     cricket_team
   `;
  const booksArray = await db.all(getAuthorBooksQuery);
  response.send(booksArray);
});

initializeDBAndServer();
