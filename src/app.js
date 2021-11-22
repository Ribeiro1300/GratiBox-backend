import express from "express";
import cors from "cors";
import { auth } from "./middlewares/auth.js";
import { login, signup } from "./controllers/users.js";
import { userPlan, newPlan } from "./controllers/plans.js";
import { deleteCurrentSession } from "./controllers/sessions.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", login);
app.post("/signup", signup);

app.post("/plans", auth, userPlan);
app.post("/newPlan", auth, newPlan);

app.post("/deleteSession", auth, deleteCurrentSession);

export default app;
