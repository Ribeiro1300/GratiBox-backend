import express from "express";
import cors from "cors";
import { auth } from "./middlewares/auth.js";
import { login, signup } from "./controllers/users.js";
import { deleteCurrentSession } from "./controllers/sessions.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/signup", signup);

app.get("/plans", auth);
app.post("/plans", auth);

app.post("/deleteSession", auth, deleteCurrentSession);

export default app;
