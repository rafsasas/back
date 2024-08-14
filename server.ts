import { app } from "./app";

const PORT = 3000;
const ip = "localhost";

app.listen(PORT, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${PORT}/\n`);
  console.log("Ctrl + C para derrubar o servidor");
});
