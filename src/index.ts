import express from "express";
import dotenv from "dotenv";
dotenv.config();
import itemsRouter from "./routes/items";
import jobsRouter from "./routes/jobs";

const app = express();
app.use(express.json());
app.use("/items", itemsRouter);
app.use("/jobs", jobsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
