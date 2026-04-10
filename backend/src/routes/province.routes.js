import express from "express";
import { getProvinces } from "../controllers/province.Controller.js";

const router = express.Router();

/* LISTAR PROVINCIAS */
router.get("/", getProvinces);

export default router;