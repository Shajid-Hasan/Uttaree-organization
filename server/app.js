const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { publicContent } = require('./lib/content');
const { saveInquiry } = require('./lib/inquiries');
const { security, apiLimiter, inquiryLimiter, validateInquiry } = require('./middleware/security');

function createApp() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';

  security(app);
  app.use(express.json({ limit: '16kb' }));
  app.use('/api', apiLimiter);

  const allowed = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowed.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
      methods: ['GET', 'POST'],
    })
  );

  app.get('/api/health', (req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/content', (req, res) => {
    res.set('Cache-Control', 'public, max-age=60');
    res.json(publicContent());
  });

  app.post('/api/inquiries', inquiryLimiter, async (req, res) => {
    const result = validateInquiry(req.body || {});
    if (result.honeypot) return res.json({ ok: true });
    if (!result.ok) return res.status(400).json({ error: 'Check the form and try again.', fields: result.fields });

    try {
      await saveInquiry(result.record);
      return res.json({ ok: true });
    } catch (error) {
      console.error('Inquiry save failed');
      return res.status(500).json({ error: 'Message could not be saved. Please call the office.' });
    }
  });

  if (isProd) {
    const clientDir = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(clientDir, { index: false, maxAge: '1h' }));
    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      res.sendFile(path.join(clientDir, 'index.html'));
    });
  }

  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    res.status(500).json({ error: 'Something went wrong.' });
  });

  return app;
}

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    return true;
  } catch (error) {
    console.error('Database unavailable. Inquiries will be stored in a local file.');
    return false;
  }
}

module.exports = { createApp, connectDatabase };
