import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const COUNTER_FILE = path.join(__dirname, 'visitor_count.json');

// Initialisiere Counter-Datei falls nicht vorhanden
if (!fs.existsSync(COUNTER_FILE)) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
}

app.use(express.json());

// CORS simple implementation for dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/visitor-count', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Lesen des Counters' });
  }
});

app.post('/api/visitor-count/increment', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    data.count += 1;
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(data));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Hochzählen des Counters' });
  }
});

app.listen(PORT, () => {
  console.log(`Counter API läuft auf http://localhost:${PORT}`);
});
