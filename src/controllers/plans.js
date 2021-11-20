import connection from "../database/database.js";

async function userPlan(req, res) {
  try {
    const { token } = req.body;
    const result = await connection.query("SELECT user_id FROM users WHERE token = $1;", [token]);
    const userId = Number(result.rows);
    console.log(userId);
    res.send("oi");
  } catch (error) {
    res.send(error);
  }
}

export { userPlan };
