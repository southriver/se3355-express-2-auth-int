const express = require('express');
const i18n = require('i18n');
const path = require('path');

const app = express();

// Configure i18n
i18n.configure({
  locales: ['en', 'es', 'fr'], // Supported languages
  directory: path.join(__dirname, 'locales'), // Directory for language files
  defaultLocale: 'en',
  cookie: 'lang', // Optional: use cookies to remember language preference
  queryParameter: 'lang',           // Query parameter for language switching
  autoReload: true,                 // Automatically reload changes in translation files
  syncFiles: true                   // Sync missing keys across files  
});

// Initialize i18n in the app
app.use(i18n.init);

// Route example
app.get('/', (req, res) => {
  res.send(req.__('welcome')); // Translate 'welcome' based on the current locale
});

// Set language route
app.get('/set-locale', (req, res) => {
  const lang = req.query.lang;
  if (i18n.getLocales().includes(lang)) {
    res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
    res.setLocale(lang);
    res.send(`Locale set to ${lang}`);
  } else {
    res.status(400).send('Invalid locale');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
