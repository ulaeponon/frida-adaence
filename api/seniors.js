import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  try {
    const result = await pool.query(`
      SELECT 
        seniors.id,
        seniors.firstname,
        seniors.city,
        seniors.age,
        seniors.img,
        activities.name AS activity_name
      FROM seniors
      JOIN activities ON seniors.activity_id = activities.id
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
