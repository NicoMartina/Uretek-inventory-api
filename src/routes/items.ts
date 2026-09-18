import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM items");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { name, category, unit, current_stock, minimum_stock } = req.body;
  const result = await pool.query(
    "INSERT INTO items (name, category, unit, current_stock, minimum_stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, category, unit, current_stock, minimum_stock]
  );
  res.json(result.rows[0]);
});

export default router;
