/**
 * Doc: https://www.prisma.io/docs/orm/more/development-environment/environment-variables#using-multiple-env-files
 */
import request from "supertest";
import { testServer } from "../../test-server";

describe("todos-router.ts", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  test("Should return TODOS api/todos", async () => {
    const response = await request(testServer.app).get("/api/todos").expect(200);

    console.log(response.body);
  });
});
