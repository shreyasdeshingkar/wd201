/* eslint-disable no-undef */
/* eslint-disable no-undef */
// const todoList = require('../todo');

// const { all, markAsComplete, add } = todoList();

// describe("Todolist Test Suite", () => {
//     // eslint-disable-next-line no-undef
//     beforeAll(() => {
//         add(
//             {
//                 title: "Test todo",
//                 completed: false,
//                 duedate: new Date().toISOString()
//             }
//         );

//     })
//     test("Should add new todo", () => {
        
//         const todoItemsCount = all.length;
//         add(
//             {
//                 title: "Test todo",
//                 completed: false,
//                 duedate: new Date().toISOString()

//             }
//         );
//         expect(all.length).toBe(todoItemsCount + 1);
//     });

//     test("Should mark a todo as complete", () => {
//         expect(all[0].completed).toBe(false);
//         markAsComplete(0);
//         expect(all[0].completed).toBe(true);

//     })
// })


// const todoList = require("../todo");

// const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

// const formattedDate = (d) => {
//   return d.toISOString().split("T")[0];
// };

// var dateToday = new Date();

// const today = formattedDate(dateToday);

// const yesterday = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() - 1)),
// );

// const tomorrow = formattedDate(
//   new Date(new Date().setDate(dateToday.getDate() + 1)),
// );

// describe("Todolist Test Suite", () => {
//   beforeAll(() => {
//     [
//       {
//         title: "Breakfast",
//         completed: false,
//         dueDate: yesterday,
//       },
//       {
//         title: "Lunch",
//         completed: false,
//         dueDate: today,
//       },
//       {
//         title: "Dinner",
//         completed: false,
//         dueDate: tomorrow,
//       },
//     ].forEach(add);
//   });
//   test("Should add new todo", () => {
//     const cnt = all.length;
//     expect(all.length).toBe(cnt);
//     add({
//       title: "Test todo",
//       completed: false,
//       dueDate: today,
//     });
//     expect(all.length).toBe(cnt + 1);
//   });

//   test("Should mark a todo as complete", () => {
//     expect(all[1].completed).toBe(false);
//     markAsComplete(1);
//     expect(all[1].completed).toBe(true);
//   });

//   test("overdue test", () => {
//     expect(overdue().length).toBe(1);
//   });

//   test("dueToday test", () => {
//     expect(dueToday().length).toBe(2);
//   });

//   test("duelater test", () => {
//     expect(dueLater().length).toBe(1);
//   });
// });


const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.create({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});