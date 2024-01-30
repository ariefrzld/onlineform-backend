import express, { response } from "express";
import apiRouter from "./routes/api.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "404_NOT_FOUND" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
