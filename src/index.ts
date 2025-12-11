import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ENV
const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.API_TOKEN;

// Fila em memória
let queue: any[] = [];

// Middleware de autenticação
function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-api-token"];

  if (!API_TOKEN) {
    console.error("API_TOKEN não definido no .env");
    return res.status(500).json({ error: "Server not configured" });
  }

  if (!token || token !== API_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

// Rota para adicionar eventos (ex: Telegram → OCI)
app.post("/add-event", auth, (req: Request, res: Response) => {
  const event = {
    id: Date.now(),
    receivedAt: new Date().toISOString(),
    payload: req.body,
  };

  queue.push(event);

  console.log("Novo evento recebido:", event);

  res.json({ ok: true });
});

// Rota para o n8n buscar o próximo evento
app.get("/next-event", auth, (req: Request, res: Response) => {
  if (queue.length === 0) {
    return res.json({ event: null });
  }

  const event = queue.shift();
  res.json({ event });
});

app.get("/", async (req: Request, res: Response) => {
  const uptimeSeconds: number = process.uptime();
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  return res.status(200).json({
    CODE: "S",
    MESSAGE: "MOBIS MES WEB IS RUNNING!",
    uptime: `${Math.floor(uptimeSeconds)}s`,
    memory: memoryUsage.rss,
    cpu: cpuUsage,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

// Inicializar servidor
app.listen(PORT, () =>
  console.log(`Relay OCI rodando em http://0.0.0.0:${PORT}`)
);
