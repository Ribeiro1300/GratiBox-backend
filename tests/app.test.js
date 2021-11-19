/* eslint-disable no-undef */
import "../src/setup.js";
import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js";
import bcrypt from "bcrypt";

describe("POST /login", () => {
  beforeAll(async () => {
    const passwordHash = bcrypt.hashSync("123", 10);
    await connection.query(
      "INSERT INTO users (name,email,password) VALUES ('teste','teste@hotmail.com',$1);",
      [passwordHash]
    );
  });

  afterAll(async () => {
    await connection.query("DELETE FROM sessions;");
    await connection.query("DELETE FROM users;");
  });

  it("return status 201 for registered user", async () => {
    const body = { email: "teste@hotmail.com", password: "123" };

    const result = await supertest(app).post("/login").send(body);
    expect(result.status).toEqual(201);
  });

  it("return status 409 for unregistered user", async () => {
    const body = { email: "fulaninhodetal@hotmail.com", password: "123" };

    const result = await supertest(app).post("/login").send(body);
    expect(result.status).toEqual(409);
  });
  it("return status 401 for wrong password", async () => {
    const body = { email: "teste@hotmail.com", password: "12" };

    const result = await supertest(app).post("/login").send(body);
    expect(result.status).toEqual(401);
  });
});

describe("POST /signup", () => {
  beforeAll(async () => {
    const passwordHash = bcrypt.hashSync("123", 10);
    await connection.query(
      "INSERT INTO users (name,email,password) VALUES ('teste','teste@hotmail.com',$1);",
      [passwordHash]
    );
  });

  afterAll(async () => {
    await connection.query("DELETE FROM sessions;");
    await connection.query("DELETE FROM users;");
  });

  it("return status 201 for available email", async () => {
    const body = { name: "teste2", email: "teste2@hotmail.com", password: "123" };
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(201);
  });

  it("return status 409 for unavailable email", async () => {
    const body = { name: "teste", email: "teste@hotmail.com", password: "123" };
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(409);
  });
});

afterAll(() => {
  connection.end();
});
