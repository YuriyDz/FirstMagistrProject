const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "", // заміни якщо потрібен пароль
  database: "users",
  port: 3306, // назва твоєї БД
});

connection.connect((err) => {
  if (err) {
    console.error("Помилка підключення:", err);
    return;
  }
  console.log("Підключено до MySQL!");
});

module.exports = connection;
