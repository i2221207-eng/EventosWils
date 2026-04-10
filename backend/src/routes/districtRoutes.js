import express from "express";
import { getDistrictsByProvince } from "../controllers/districtController.js";

const router = express.Router();

/* OBTENER DISTRITOS POR PROVINCIA */
router.get("/:province_id", getDistrictsByProvince);

export default router;