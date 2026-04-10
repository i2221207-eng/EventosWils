import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2131693",
  key: "934b107e901e230f781c",
  secret: "c2230dbb395ac4df218d",
  cluster: "sa1",
  useTLS: true
});

// 🔥 EVENTO DE INACTIVIDAD
export const inactiveUser = async (req, res) => {
  try {

    await pusher.trigger("chat", "inactive-user", {
      message: "Usuario inactivo"
    });

    console.log("📡 Evento de usuario inactivo enviado");

    res.json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en Pusher" });
  }
};