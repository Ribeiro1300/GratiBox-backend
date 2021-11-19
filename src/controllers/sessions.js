import connection from "../database/database.js";

async function deleteCurrentSession(req, res) {
  try {
    const { token } = req.body;
    await connection.query("DELETE FROM sessions WHERE token = $1;", [token]);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(401);
  }
}

export { deleteCurrentSession };
