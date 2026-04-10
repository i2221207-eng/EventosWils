import District from "../models/District.js";

export const getDistrictsByProvince = async (req, res) => {

  try {

    const { province_id } = req.params;

    if (!province_id) {
      return res.status(400).json({
        message: "province_id requerido"
      });
    }

    const districts = await District.findAll({
      where: { province_id },
      order: [["name", "ASC"]]
    });

    res.json(districts);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error obteniendo distritos",
      error: error.message
    });

  }

};