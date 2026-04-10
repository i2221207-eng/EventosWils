import Province from "../models/Province.js";

export const getProvinces = async (req, res) => {

  try {

    const provinces = await Province.findAll({
      order: [["name", "ASC"]]
    });

    res.json(provinces);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error obteniendo provincias",
      error: error.message
    });

  }

};