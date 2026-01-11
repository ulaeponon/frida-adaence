import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static("../frontend"));
app.use("/css", express.static("../frontend/css"));
app.use("/script", express.static("../frontend/script"));
app.use("/images", express.static("../frontend/images"));

app.use(express.static("frontend"));
app.use("/images", express.static("frontend/images"));
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// selections des profils
app.get("/seniors", async (req, res) => {
  try { 
    const result =  await pool.query(`SELECT 
      seniors.id,
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

app.post("/volunteers", async (req, res) => {
  try{
    const{
      firstname, lastname, email, city, zipcode, availabity, motivation}
     = req.body;
    if(!firstname || !lastname || !email){
      return res.status(400).json({error: "Champs obligatoires manquants"});
    }
    const query = `INSERT INTO volunteers (firstname, lastname, email, city, zipcode, availability, motivation) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const values = [firstname, lastname, email, city, zipcode, availabity, motivation];
    const result = await pool.query (query, values);
    res.status (201).json({message: "Volontaire enregistré avec succès", volunteerId: result.rows[0].id});
  } catch (error){
    console.error("Erreur lors de l'enregistrement du volontaire :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

  app.listen(3000, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
