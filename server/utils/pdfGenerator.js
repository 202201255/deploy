const PDFDocument = require('pdfkit');

const generatePdf = (studentId, semester, fees) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    doc.fontSize(16).text(`Receipt for Semester ${semester}`, { align: 'center' });
    doc.text(`Student ID: ${studentId}\n\n`);

    fees.forEach(fee => {
      doc.text(`${fee.type}: $${fee.amount} - Paid`);
    });

    doc.end();
  });
};

module.exports = generatePdf;
