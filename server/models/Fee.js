const pool = require('../config/db');

const Fee = {
  async getFeesBySemester(studentId, semester) {
    const query = 'SELECT * FROM fees WHERE student_id = $1 AND semester = $2';
    const { rows } = await pool.query(query, [studentId, semester]);
    return rows;
  },

  async payFee(feeId) {
    const query = 'UPDATE fees SET is_paid = TRUE WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [feeId]);
    return rows[0];
  },
};

module.exports = Fee;
