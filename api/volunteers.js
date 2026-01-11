import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const {
    firstname,
    lastname,
    email,
    city,
    zipcode,
    availabity,
    motivation
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO volunteers 
      (firstname, lastname, email, city, zipcode, availability, motivation)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [firstname, lastname, email, city, zipcode, availabity, motivation]
    );

    res.status(201).json({ message: "Volontaire enregistré" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
