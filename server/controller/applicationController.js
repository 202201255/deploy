const pool = require("../config/db");

// Fetch all applications
const getApplications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new application
const createApplication = async (req, res) => {
  try {
    const { student_id, application_year, full_name, email, phone } = req.body;
    const application_id = `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newApplication = await pool.query(
      `INSERT INTO applications (student_id, application_year, application_id, full_name, email, phone) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [student_id, application_year, application_id, full_name, email, phone]
    );
    res.status(201).json(newApplication.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getApplications, createApplication };
