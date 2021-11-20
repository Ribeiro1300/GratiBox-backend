/* eslint-disable no-undef */
import "../src/setup.js";
import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js";
import bcrypt from "bcrypt";

function prepTestEnv() {
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
}

describe("POST /login", () => {
  prepTestEnv();

  it("return status 201 for registered user", async () => {
    const body = { email: "teste@hotmail.com", password: "123" };

    const result = await supertest(app).post("/login").send(body);
    expect(result.status).toEqual(201);
    const userId = await connection.query("SELECT id FROM users WHERE email = $1;", [body.email]);
    const session = await connection.query("SELECT * FROM sessions WHERE user_id = $1;", [
      userId.rows[0].id,
    ]);
    expect(session.rows[0].user_id).toEqual(userId.rows[0].id);
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
  prepTestEnv();

  it("return status 201 for available email", async () => {
    const body = { name: "teste2", email: "teste2@hotmail.com", password: "123" };
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(201);
    const check = await connection.query("SELECT * FROM users WHERE email = $1;", [body.email]);
    expect(check.rows[0].email).toEqual(body.email);
  });

  it("return status 409 for unavailable email", async () => {
    const body = { name: "teste", email: "teste@hotmail.com", password: "123" };
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(409);
  });
});

describe("POST /plans", () => {
  prepTestEnv();
  it("returns 201 for valid token", async () => {
    const token = await connection.query("SELECT * FROM sessions;");
    const body = token.rows;
    const result = await supertest(app)
      .post("/plans")
      .set("Authorization", "Bearer " + token)
      .send(body);
    expect(result.status).toEqual(201);
  });
});

afterAll(() => {
  connection.end();
});
