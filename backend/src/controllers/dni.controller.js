export const buscarDNI = async (req, res) => {
  const { numero } = req.params;

  try {
    const response = await fetch(
      `https://api.apis.net.pe/v2/reniec/dni?numero=${numero}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RENIEC_TOKEN}`
        }
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error consultando DNI" });
    console.log("TOKEN:", process.env.RENIEC_TOKEN)
  }
};