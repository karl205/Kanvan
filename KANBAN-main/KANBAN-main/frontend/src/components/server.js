const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

let alarms = []; // Aquí se almacenan las alarmas (puedes usar una base de datos)

// Ruta para obtener todas las alarmas
app.get("/api/alarms", (req, res) => {
  res.json(alarms);
});

// Ruta para agregar una nueva alarma
app.post("/api/alarms", (req, res) => {
    const { time } = req.body;  // Sólo estamos usando 'time'
    const newAlarm = { time, id: alarms.length + 1 };
    alarms.push(newAlarm);
    res.status(201).json(newAlarm);
  });

// Ruta para eliminar una alarma por ID
app.delete("/api/alarms/:id", (req, res) => {
  const { id } = req.params;
  alarms = alarms.filter((alarm) => alarm.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
