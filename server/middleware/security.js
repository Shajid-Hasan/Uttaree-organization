const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

function security(app) {
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          frameAncestors: ["'none'"],
          objectSrc: ["'none'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          upgradeInsecureRequests: null,
        },
      },
    })
  );
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please wait and try again.' },
});

function clean(value, max) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function validateInquiry(body) {
  const fields = {};
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 24);
  const email = clean(body.email, 120);
  const message = clean(body.message, 2000);
  const projectSlug = clean(body.projectSlug, 80);
  const source = clean(body.source, 80);
  const kind = body.kind === 'landing' ? 'landing' : 'contact';

  if (name.length < 2) fields.name = 'Enter your name.';
  if (!/^[0-9+\-\s()]{6,24}$/.test(phone)) fields.phone = 'Enter a phone number.';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'Enter a valid email or leave it blank.';
  if (message.length < 10) fields.message = 'Write a short message.';

  return {
    ok: Object.keys(fields).length === 0,
    fields,
    record: { kind, name, phone, email, message, projectSlug, source },
    honeypot: clean(body.company, 80).length > 0,
  };
}

module.exports = { security, apiLimiter, inquiryLimiter, validateInquiry };
