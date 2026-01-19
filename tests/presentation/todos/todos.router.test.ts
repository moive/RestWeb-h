/**
 * Doc: https://www.prisma.io/docs/orm/more/development-environment/environment-variables#using-multiple-env-files
 */
import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { text } from "stream/consumers";

describe("todos-router.ts", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: "Text testing 1" };
  const todo2 = { text: "Text testing 2" };

  test("Should return TODOS api/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeNull();
  });

  test("Should return a TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: null,
    });
  });

  test("Should return a 404 NotFound api/todos/999", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("Should return a new Todo api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201);
    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test("Should return an error if text is not valid api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400);

    expect(body).toEqual({ error: "Text property is required" });
  });

  test("Should return a update TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: "Hello world, UPDATE", completedAt: "2025-01-18" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: "Hello world, UPDATE",
      completedAt: "2025-01-18T00:00:00.000Z",
    });
  });

  test("Should return 404 if TODO not found", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("Should return and update TODO only the date", async () => {
    const todo = await prisma.todo.create({ data: todo1 });
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: "2023-12-25" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo.text,
      completedAt: "2023-12-25T00:00:00.000Z",
    });
  });
});
