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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await pool.query("DELETE FROM items WHERE id = $1", [id]);
  res.json({ message: "Item deleted" });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, category, unit, current_stock, minimum_stock } = req.body;
  const result = await pool.query(
    "UPDATE items SET name=$1, category=$2, unit=$3, current_stock=$4, minimum_stock=$5 WHERE id=$6 RETURNING *",
    [name, category, unit, current_stock, minimum_stock, id]
  );
  res.json(result.rows[0]);
});

export default router;
