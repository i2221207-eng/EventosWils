import { Router } from "express"
import db from "../config/db.js"

const router = Router()

// provincias
router.get("/provinces", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name FROM provinces ORDER BY name"
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// distritos
router.get("/districts", async (req, res) => {
  try {
    const { province_id } = req.query

    const [rows] = await db.query(
      "SELECT id, name FROM districts WHERE province_id = ? ORDER BY name",
      [province_id]
    )

    res.json(rows)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router