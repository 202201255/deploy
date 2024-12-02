const Fee = require('../models/Fee');
const generatePdf = require('../utils/pdfGenerator');
const pool = require('../config/db');

exports.getFees = async (req, res) => {
  const { studentId, semester } = req.query;
  try {
    const result = await pool.query(
      'SELECT * FROM fees WHERE student_id = $1 AND semester = $2',
      [studentId, semester]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: 'Failed to fetch fees' });
  }
};

exports.payFee = async (req, res) => {
  const { feeId } = req.body;
  try {
    const result = await pool.query('UPDATE fees SET is_paid = TRUE WHERE id = $1', [feeId]);
    if (result.rowCount > 0) {
      res.json({ message: 'Payment successful!' });
    } else {
      res.status(404).json({ message: 'Fee not found!' });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Failed to update payment status' });
  }
};

exports.downloadReceipt = async (req, res) => {
  try {
    const { studentId, semester } = req.params;
    const fees = await Fee.getFeesBySemester(studentId, semester);

    if (fees.every(fee => fee.is_paid)) {
      const pdfBuffer = await generatePdf(studentId, semester, fees);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    } else {
      res.status(400).json({ error: 'Not all fees are paid' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
};
