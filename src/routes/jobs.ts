import { Router } from "express";
import pool from "../db";

const router = Router();

router.post("/", async (req, res) => {
  const { presupuesto_number, job_date, notes, materials_used } = req.body;

  await pool.query("BEGIN");
  try {
    //1. Insert job
    const jobResult = await pool.query(
      "INSERT INTO jobs (presupuesto_number, job_date, notes) VALUES ($1, $2, $3) RETURNING *",
      [presupuesto_number, job_date, notes]
    );
    const job = jobResult.rows[0];
    //2. Loop through materials_used
    for (const material of materials_used) {
      await pool.query(
        "INSERT INTO job_usage (job_id, item_id, quantity_used) VALUES ($1, $2, $3)",
        [job.id, material.item_id, material.quantity_used]
      );

      await pool.query(
        "UPDATE items SET current_stock = current_stock - $1 WHERE id = $2",
        [material.quantity_used, material.item_id]
      );
    }

    await pool.query("COMMIT");
    res.json({ message: "Job Created" });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Transaction Failed" });
  }
});

export default router;
