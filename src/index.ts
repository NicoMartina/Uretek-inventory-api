import express from "express";
import dotenv from "dotenv";
dotenv.config();
import itemsRouter from "./routes/items";
import jobsRouter from "./routes/jobs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/items", itemsRouter);
app.use("/jobs", jobsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
