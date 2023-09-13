// // connectDB.js

// const Sequelize = require("sequelize");

// const database = "todo_db";
// const username = "postgres";
// const password = "Shreyas@123";
// const sequelize = new Sequelize(database, username, password, {
//   host: "localhost",
//   dialect: "postgres",
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });




const Sequelize = require("sequelize");

// const database = "todo_db";
// const username = "postgres";
// const password = "Shreyas@123";
const sequelize = new Sequelize('todo_db', 'postgres', 'Shreyas@123', {
  host: "localhost",
  dialect: "postgres",
  logging:false,
});

const connect = async () => {
  return sequelize.authenticate();
}

module.exports = {
  connect,
  sequelize
}