const { use } = require("react");
const db = require("./db");
const express = require("express");
const { error, timeEnd } = require("console");
const app = express();
const funcs = require("./functions.js");
const dateFuncs = require("./funnctionsWithDates.js");
const nodemailer = require("nodemailer");
const configi = require("./email.js");

const cors = require("cors");
app.use(cors());
//import "./functions.js";

app.use(express.json());

app.post("/login", (req, res) => {
  console.log(req.body);
  const user = req.body;
  console.log(user);
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
            return res
              .status(200)
              .json([results, dateFuncs.setNewParam(results1)]);
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
    case 3:
      functionForGetSQLRequest = [
        user.username !== user.oldName
          ? funcs.renameTable(user.oldName, user.username)
          : "SELECT * FROM USERS LIMIT 1 ",
        funcs.updateUser(
          user.email,
          user.password,
          user.username,
          user.colorInterface,
          user.timetodeadline,
          user.oldName,
          user.time
        ),
      ];
  }

  db.query(functionForGetSQLRequest[0], (err, results) => {
    db.query(functionForGetSQLRequest[1], (err1, results1) => {
      if (err || err1) {
        return res.status(500).json({ error: err, error2: err1 });
      } else {
        return res.json(results);
      }
    });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
console.log("OK");

const pohibka = 10;

const chastota = 10 * 1000;

measseges();

function sentEmail(email, user, data) {
  const transporter = nodemailer.createTransport(configi);
  const htmlContent = `
    <h1>Вітаю ${user}</h1>
    ${data.map((n) => `<b>${n}</b><br>`).join("")}
  `;
  const emailOptions = {
    from: "yuriytechserver@meta.ua",
    to: email,
    subject: "Nodemailer test",
    text: htmlContent,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
}

async function measseges() {
  const nowi = new Date();
  const now = nowi.getHours() + ":" + nowi.getMinutes();
  const today =
    nowi.getFullYear() +
    "-" +
    dateFuncs.getValidData(nowi.getMonth() + 1) +
    "-" +
    dateFuncs.getValidData(nowi.getDate());

  //get all users
  let arrWithUsersName = [];

  await new Promise((resolve, reject) => {
    db.query("SELECT username FROM users.users;", (err, res) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(res.map((r) => r.username));
    });
  })
    .then((users) => {
      arrWithUsersName = users;
    })
    .catch((err) => console.error(err));

  //iterate all users
  for (let i of arrWithUsersName) {
    let allDataFromUser = [];
    //get all data from user

    await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users.users WHERE username ='" + i + "';",
        (err, res) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(res);
        }
      );
    })
      .then((users) => {
        allDataFromUser = users;
      })
      .catch((err) => console.error(err));

    const timeToSend = allDataFromUser[0].timeToSend;

    //is now send email

    if (
      dateFuncs.getMinutesSub(
        now,
        timeToSend === undefined || timeToSend === null ? "00:00" : timeToSend,
        pohibka
      ) &&
      allDataFromUser[0].dateSendZvit !== today
    ) {
      let userTechData = [];
      let zvit = [];

      await new Promise((resolve, reject) => {
        db.query("SELECT * FROM users." + i + ";", (err, res) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(res);
        });
      })
        .then((users) => {
          userTechData = users;
        })
        .catch((err) => (userTechData = -1));
      if (userTechData === -1) {
        continue;
      }
      //iterate all techremind
      for (let j of userTechData) {
        //Check is today deadline
        if (dateFuncs.getNumberDaysToTargetData(j.date) === 0) {
          //restarttimer
          console.log("eeee");
          if (j.type >= 0) {
            db.query(
              "UPDATE `users`.`" +
                i +
                "` SET `date` = '" +
                dateFuncs.addDays(j.date, j.type) +
                "' WHERE (`name` = '" +
                j.name +
                "');"
            );
          }
          zvit.push(
            "Ви повинні відвідати, або ви забули відвідати: " +
              j.name +
              " в: " +
              j.date
          );
          //endRestartTimer
        }
        //end check today deadline
      }
      if (zvit.length > 0) {
        console.log("це звіт:" + zvit);
        sentEmail(allDataFromUser[0].email, i, zvit);
      }
      db.query(
        "UPDATE `users`.`users` SET `dateSendZvit` = '" +
          today +
          "' WHERE (`username` = '" +
          i +
          "');"
      );
    }
  }
  console.log("Я відпрацював");
  setTimeout(measseges, chastota);
}

/*
{
  "requestType": 1,
	"email": "nuuu",
	"password": "ee",
	"username": "dado"
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
