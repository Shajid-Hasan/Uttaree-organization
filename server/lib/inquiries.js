const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const storageDir = path.join(__dirname, '..', 'storage');
const filePath = path.join(storageDir, 'inquiries.json');

const inquirySchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['contact', 'landing'], required: true },
    name: { type: String, required: true, maxlength: 80 },
    phone: { type: String, required: true, maxlength: 24 },
    email: { type: String, default: '', maxlength: 120 },
    message: { type: String, required: true, maxlength: 2000 },
    projectSlug: { type: String, default: '', maxlength: 80 },
    source: { type: String, default: '', maxlength: 80 },
  },
  { timestamps: true }
);

function InquiryModel() {
  return mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
}

function ensureFile() {
  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]', 'utf8');
}

let writeChain = Promise.resolve();

function saveToFile(record) {
  writeChain = writeChain.then(() => {
    ensureFile();
    const current = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    current.push({ ...record, createdAt: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(current, null, 2), 'utf8');
  });
  return writeChain;
}

async function saveInquiry(record) {
  if (mongoose.connection.readyState === 1) {
    await InquiryModel().create(record);
    return { stored: 'database' };
  }

  await saveToFile(record);
  return { stored: 'file' };
}

module.exports = { saveInquiry };
