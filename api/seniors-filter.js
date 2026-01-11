import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
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
    JOIN activities ON seniors.activity_id = activities.id
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

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
