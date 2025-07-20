const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Explicitly enable CORS for all origins. While `cors()` without
// options already allows any origin, some hosting providers may not
// respect the default configuration. By specifying the origin we ensure
// the `Access-Control-Allow-Origin` header is always set.
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
// Support pre-flight requests
app.options('*', cors(corsOptions));

const dataPath = path.join(__dirname, 'data', 'teams8.json');

app.get('/api/teams', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
