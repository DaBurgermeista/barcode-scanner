let products = [];

const input = document.getElementById("barcode-input");
const output = document.getElementById("scan-output");
const log = document.getElementById("scan-log");

// Load product list from server
fetch("/products")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    console.log("Products loaded:", products);
  });

// Handle scans
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const code = input.value.trim();
    if (code.length === 0) return;

    handleScan(code);
    input.value = "";
  }
});

async function handleScan(code) {
  const product = products.find((p) => p.barcode === code);

  if (product) {
    output.textContent = `✔️ ${product.name} (Stock: ${product.stock})`;
  } else {
    // Not found, try Open Food Facts
    const result = await fetchProductFromOpenFoodFacts(code);

    const newItem = {
      barcode: code,
      name: result?.name || "Unknown Item",
      brand: result?.brand || "Unknown Brand",
      image: result?.image || null,
      stock: 1,
    };

    products.push(newItem);
    output.textContent = name
      ? `🔍 Auto-named: ${name}`
      : `❓ Unknown item added: ${code}`;

    saveNewProduct(newItem);
  }

  logScan(code);
}

function logScan(code) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString()} - ${code}`;
  log.prepend(li);
}

function saveNewProduct(product) {
  fetch("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((response) => console.log("Saved:", response));
}

async function fetchProductFromOpenFoodFacts(barcode) {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await res.json();

    if (data.status === 1) {
      const p = data.product;
      return {
        name: p.product_name || "Unnamed Product",
        brand: p.brands || "Unknown Brand",
        image: p.image_front_url || null,
      };
    }
  } catch (err) {
    console.warn("Failed to fetch product info:", err);
  }

  return null;
}
