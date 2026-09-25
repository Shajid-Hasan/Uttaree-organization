require('dotenv').config();
const { createApp, connectDatabase } = require('./app');
const { publicContent } = require('./lib/content');

const port = Number(process.env.PORT) || 5000;

publicContent();

const app = createApp();

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
