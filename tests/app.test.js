/* eslint-disable no-undef */
import "../src/setup.js";
import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js";

afterAll(() => {
	connection.end();
});
