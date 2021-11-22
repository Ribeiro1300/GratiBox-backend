import dayjs from "dayjs";
import connection from "../database/database.js";

async function userPlan(req, res) {
  try {
    const { user_id } = req.body;
    const result = await connection.query("SELECT * FROM plans WHERE user_id = $1;", [user_id]);
    res.status(201).send(result.rows);
  } catch (error) {
    res.status(420).send(error);
  }
}

async function newPlan(req, res) {
  try {
    const { user_id, type, chosenDates, product, name, city, state, street, CEP } = req.body;
    const signup_date = dayjs().format("DD/MM/YYYY");
    const delivery_dates = "2";
    const result = await connection.query(
      "INSERT INTO plans (user_id,type,signup_date,delivery_dates,product,receiver_name,address,cep,city,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
      [user_id, type, signup_date, delivery_dates, product, name, street, CEP, city, state]
    );
    console.log(chosenDates);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
  }
}

export { userPlan, newPlan };
