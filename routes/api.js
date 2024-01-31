import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.get("/", (request, response) => {
  response.json({ title: `Hello ${request.query.nama}, umur ${request.body.umur}` });
});

router.post("/", (request, response) => {
  response.json({ title: `Hello ${request.body.orang.nama}, umur ${request.body.orang.umur}` });
});

router.get("/submit", (request, response) => {
  response.json({ title: `Hello submit` });
});

router.post("/register", AuthController.register);

export default router;
