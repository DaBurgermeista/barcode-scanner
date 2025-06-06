const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'sample-products.json');

app.use(bodyParser.json());
app.use(express.static('public'));

// GET all products
app.get('/products', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    res.json(parsed);
  } catch (err) {
    console.error("🔥 Error loading products:", err.message);
    res.status(500).send("Server error loading products.");
  }
});



// POST new product
app.post('/products', (req, res) => {
  const newProduct = req.body;

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  data.push(newProduct);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  res.json({ status: 'success', product: newProduct });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
