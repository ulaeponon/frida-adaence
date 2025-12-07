import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));


app.use("/images", express.static("images"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// selections des profils
app.get("/seniors", async (req, res) => {
  try { 
    const result =  await pool.query(`SELECT 
  seniors.firstname,
  seniors.city,
  seniors.age,
  seniors.img,
  activities.name AS activity_name
FROM seniors
JOIN activities 
  ON seniors.activity_id = activities.id`
);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des profils :", error);
    res.status(500).json({ error: "Erreur serveur" });
  } 
});
// filter par activité et ville
app.get("/seniors/filter", async (req, res) => {
  try {
    const { activity, city } = req.query;

    let query = `
      SELECT
        seniors.id,
        seniors.firstname,
        seniors.city,
        seniors.age,
        seniors.img,
        activities.name AS activity_name
      FROM seniors
      JOIN activities 
        ON seniors.activity_id = activities.id 
      WHERE 1=1
    `;
    const params = [];

    if (activity) {
      query += ` AND activities.name ILIKE $${params.length + 1}`;
      params.push(`%${activity}%`);
    }
    if (city) {
      query += ` AND seniors.city ILIKE $${params.length + 1}`;
      params.push(`%${city}%`);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors du filtrage des profils :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


  app.listen(3000, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
