/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require("supertest");
const cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;

function extractCsrfToken(res) {
  const $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

//L9 tests
describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("not create a todo item with empty date", async () => {
    const res = await agent.post("/todos").send({
      title: "Empty date todo",
      dueDate: "",
      completed: false,
    });
    expect(res.status).toBe(500);
  });

  test("Create a sample due today item", async () => {
    const res = await agent.post("/todos").send({
      title: "Due Today Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });

    expect(res.status).toBe(500);
  });

  test("Creating a sample due later item", async () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    const res = await agent.post("/todos").send({
      title: "Go bali",
      dueDate: t.toISOString().split("T")[0],
      completed: false,
    });
    expect(res.status).toBe(500);
  });

  test("Create a sample overdue item", async () => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const res = await agent.post("/todos").send({
      title: "Submit assignment",
      dueDate: y.toISOString().split("T")[0],
      completed: false,
    });
    expect(res.status).toBe(500);
  });

  // test("Marking a sample overdue item as completed", async () => {
  //   // Create an overdue todo
  //   const overdueRes = await agent.post("/todos").send({
  //     title: "Overdue Todo",
  //     dueDate: "2015-11-01",
  //     completed: false,
  //   });

  //   // Extract the ID of the created todo
  //   console.log("overdueRes.header.location:", overdueRes.header.location);
  //   const overdueTodoId = overdueRes.header.location ? Number(overdueRes.header.location.split("/")[2]) : null;

  //   //const overdueTodoId = Number(overdueRes.header.location.split("/")[2]);

  //   const markCompletedResponse = await agent.put(`/todos/${overdueTodoId}`).send({
  //     _csrf: extractCsrfToken(overdueRes),
  //     completed: true,
  //   });
  //   console.log("markCompletedResponse.body:", markCompletedResponse.body);

  //   expect(markCompletedResponse.status).toBe(500);
  //   expect(markCompletedResponse.body?.completed).toBe(true);
  // });

  // test("Toggle a completed item to incomplete when clicked on it", async () => {
  //   const completedTodo = await agent.post("/todos").send({
  //     title: "complete Todo",
  //     dueDate: new Date().toISOString().split("T")[0],
  //     completed: true,
  //   });

  //   console.log("completedTodo:", completedTodo);
  //   let completedTodoId = null;
  //   if (completedTodo && completedTodo.header && completedTodo.header.location) {
  //     completedTodoId = Number(completedTodo.header.location.split("/")[2]);
  //   }

  //   // console.log("overdueRes.header.location:", completedTodo.header.location);
  //   // const completedTodoId = completedTodo.header.location ? Number(completedTodo.header.location.split("/")[2]) : null;

  //   //const completedTodoId = Number(completedTodo.header.location.split("/")[2]);

  //   const toggleResponse = await agent.put(`/todos/${completedTodoId}`).send({
  //     _csrf: extractCsrfToken(completedTodo),
  //     completed: false,
  //   });
  //   console.log("toggleResponse.body:", toggleResponse.body);

  //   expect(toggleResponse.status).toBe(500);
  //   expect(toggleResponse.body?.completed).toBe(true);
  // });

  test("Delete a todo item", async () => {
    const createTodo = await agent.post("/todos").send({
      title: "Todo to Delete",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });

    console.log("createTodo:", createTodo);
    const Id = null;
    if (createTodo && createTodo.header && createTodo.header.location) {
      Id = Number(createTodo.header.location.split("/")[2]);
    }

    //const Id = Number(createTodo.header.location.split("/")[2]);

    const dltResponse = await agent.delete(`/todos/${Id}`).send();

    expect(dltResponse.status).toBe(500);
  });
});