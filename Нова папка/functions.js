export const newTable = (name) => {
  return (
    "CREATE TABLE `users`.`" +
    name +
    "` (`name` VARCHAR(100) NOT NULL,`date` VARCHAR(15) NULL,`type` INT NULL,PRIMARY KEY (`name`));"
  );
};

export const newUser = (email, password, username) => {
  return (
    "INSERT INTO `users`.`users` (`email`, `password`, `username`, `colorInterface`, `timetodeadline`,`timeToSend`) VALUES ('" +
    email +
    "', '" +
    password +
    "', '" +
    username +
    "','" +
    "#aabbcc" +
    "','" +
    "1" +
    "','" +
    "08:00" +
    "');"
  );
};

export const updateUser = (
  email,
  password,
  username,
  colorInterface,
  timetodeadline,
  oldName,
  time
) => {
  return (
    "UPDATE `users`.`users` SET " +
    "`email`='" +
    email +
    "', " +
    "`password`='" +
    password +
    "', " +
    "`username`='" +
    username +
    "', " +
    "`colorInterface`='" +
    colorInterface +
    "', " +
    "`timetodeadline`='" +
    timetodeadline +
    "', " +
    "`timeToSend`='" +
    time +
    "' " +
    "WHERE `username`='" +
    oldName +
    "';"
  );
};

export const deleteUserByUsername = (username) => {
  return "DELETE FROM `users`.`users` WHERE `username` = '" + username + "';";
};

export const deleteTable = (tableName) => {
  return "DROP TABLE IF EXISTS `users`.`" + tableName + "`;";
};

export const insertRow = (tableName, name, date, type) => {
  return (
    "INSERT INTO `" +
    tableName +
    "` (`name`, `date`, `type`) VALUES ('" +
    name +
    "', '" +
    date +
    "', " +
    type +
    ");"
  );
};

export const deleteRow = (tableName, name) => {
  return "DELETE FROM `" + tableName + "` WHERE `name` = '" + name + "';";
};

export const updateRow = (tableName, name, newName, newDate, newType) => {
  return (
    "UPDATE `" +
    tableName +
    "` SET `date`='" +
    newDate +
    "', `type`=" +
    newType +
    ", `name`='" + // ← тут кома а не закриваюча лапка!
    newName +
    "' WHERE `name`='" +
    name +
    "';"
  );
};

export const getLoginData = (username, email, password) => {
  return (
    "SELECT * FROM users.users WHERE (email = '" +
    email +
    "' OR username = '" +
    username +
    "') AND password = '" +
    password +
    "';"
  );
};

export const renameTable = (oldName, newName) => {
  return "RENAME TABLE `" + oldName + "` TO `" + newName + "`;";
};
