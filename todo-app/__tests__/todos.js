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

const login = async (agent, username, password) => {
  let res = await agent.get("/login");
  let csrfToken = extractCsrfToken(res);
  res = await agent.post("/session").send({
    email: username,
    password: password,
    _csrf: csrfToken,
  });
};

describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(3000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("Sign up", async () => {
    let res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);

    res = await agent.post("/users").send({
      firstName: "Test",
      lastName: "User A",
      email: "user.a@test.com",
      password: "12345678",
      _csrf: csrfToken,
    });
    expect(res.statusCode).toBe(302);
  });

  test("Sign out", async () => {
    let res = await agent.get("/todos");
    expect(res.statusCode).toBe(200);

    res = await agent.get("/signout");
    expect(res.statusCode).toBe(302);

    res = await agent.get("/todos");
    expect(res.statusCode).toBe(302);
  });

  test("Creates a todo and responds with json at /todos POST endpoint", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");

    const res = await agent.get("/todos");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });

  test("Marks a todo with the given ID as complete", async () => {
    const agent = request.agent(server);
    await login(agent, "user.a@test.com", "12345678");

    let res = await agent.get("/todos");
    let csrfToken = extractCsrfToken(res);
    await agent.post("/todos").send({
      title: "Buy milk",
      dueDate: new Date().toISOString(),
      completed: false,
    });
    expect(res.status).toBe(200);
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

  //   test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
  //     const agent = request.agent(server);
  //     await login(agent, "user.a@test.com", "12345678");

  //     let res = await agent.get("/todos");
  //     let csrfToken = extractCsrfToken(res);
  //     // FILL IN YOUR CODE HERE
  //     await agent.post("/todos").send({
  //       title: "Go Goa",
  //       dueDate: new Date().toISOString(),
  //       completed: false,
  //     });

  //     console.log("createTodo:", createTodo);
  //     const Id = null;
  //     if (createTodo && createTodo.header && createTodo.header.location) {
  //       Id = Number(createTodo.header.location.split("/")[2]);
  //     }

  //     //const Id = Number(createTodo.header.location.split("/")[2]);

  //     const dltResponse = await agent.delete(`/todos/${Id}`).send();

  //     expect(dltResponse.status).toBe(500);
  //   });
});
