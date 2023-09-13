/* eslint-disable no-unused-vars */
const {Sequelize,DataTypes ,Model} = require("sequelize");
const {sequelize} = require("./connectDB.js");

//static method is available on class
//instant method is available on instance of class

class Todo extends Model {

  static async create (params){
    return await Todo.create(params);
  }

  displayableString() {
    return '${this.id}. ${this.title} - ${this.dueDate}'
  }
}




Todo.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
  }
);


module.exports = Todo;
Todo.sync();