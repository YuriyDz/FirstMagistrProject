const { use } = require("react");
const db = require("./db");
const express = require("express");
const { error } = require("console");
const app = express();
const funcs = require("./functions.js");
const cors = require("cors");
app.use(cors());
//import "./functions.js";

app.use(express.json());

app.post("/login", (req, res) => {
  const user = req.body;
  if (user === undefined) {
    return res.status(300).json({ error: "no data" });
  }
  db.query(
    funcs.getLoginData(user.username, user.email, user.password),
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (results.length === 0) {
        return res.status(400).json({ find: false });
      } else {
        db.query(
          "SELECT * FROM users." + results[0].username,
          (err1, results1) => {
            if (err1) {
              return res.status(500).json({ error: err1 });
            }
            return res.status(200).json([results, results1]);
          }
        );
      }
    }
  );
});

app.post("/userData/make", (req, res) => {
  const techData = req.body;

  if (techData === undefined) {
    return res.status(300).json({ error: "no data" });
  }

  let functionForGetSQLRequest;

  switch (techData.requestType) {
    case 1:
      functionForGetSQLRequest = funcs.insertRow(
        techData.tableName,
        techData.name,
        techData.date,
        techData.type
      );
      break;

    case 2:
      functionForGetSQLRequest = funcs.updateRow(
        techData.tableName,
        techData.oldName,
        techData.name,
        techData.date,
        techData.type
      );
      break;

    case 3:
      functionForGetSQLRequest = funcs.deleteRow(
        techData.tableName,
        techData.oldName
      );
      break;
  }

  db.query(functionForGetSQLRequest, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return err;
    }
    res.json(results);
  });
});

app.post("/userMake", (req, res) => {
  const user = req.body;
  if (user === undefined) {
    return res.status(300).json({ error: "no data" });
  }
  let functionForGetSQLRequest;
  switch (user.requestType) {
    case 1:
      functionForGetSQLRequest = [
        funcs.newTable(user.username),
        funcs.newUser(user.email, user.password, user.username),
      ];
      break;
    case 2:
      functionForGetSQLRequest = [
        funcs.deleteTable(user.username),
        funcs.deleteUserByUsername(user.username),
      ];
      break;
  }

  db.query(functionForGetSQLRequest[0], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    db.query(functionForGetSQLRequest[1], (err, results1) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
    });
    return res.json(results);
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
console.log("Срака");

/*
{
  "requestType": 1,
	"email": "dido",
	"password": "her",
	"username": "dido"
}

{
  "requestType": 1,
  "tableName": "my_table",
  "name": "Test Name",
  "date": "2025-11-18",
  "type": 1,
  "oldName": "Test Name"
}
*/
