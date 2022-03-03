const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

module.exports = {
  init: () => {
    return mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB,
    });
  },
  connect: (connection) => {
    connection.connect((error) => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
      connection.query(
        `CREATE TABLE IF NOT EXISTS USERS(
          id int primary key auto_increment,
          user_id varchar(255) not null,
          name varchar(255),
          password varchar(255) not null,
          created_at datetime DEFAULT current_timestamp,
          updated_at datetime ON UPDATE current_timestamp
          )`,
        (error, result) => {
          if (error) {
            throw error;
          }
          console.log("USERS table created");
        }
      );
      // connection.end(function (err) {
      //   if (err) {
      //     return console.log(err.message);
      //   }
      // });
    });
  },
  createDatabase: (connection) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`,
      (error, result) => {
        if (error) {
          throw error;
        }
        console.log("Database created");
      }
    );
  },
  // createUserTable: (connection) => {
  //   connection.query(
  //     `CREATE TABLE IF NOT EXISTS USERS(
  //       id int primary key auto_increment,
  //       use_id int not null,
  //       name varchar(255),
  //       password varchar(255) not null
  //       created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  //       updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  //       `,
  //     (error, result) => {
  //       if (error) {
  //         throw error;
  //       }
  //       console.log("USERS table created");
  //     }
  //   );
  // },
  // connectionEnd: () => {
  //   connection.end(function (err) {
  //     if (err) {
  //       return console.log(err.message);
  //     }
  //   });
  // },
};
