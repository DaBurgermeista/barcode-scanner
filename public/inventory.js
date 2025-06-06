fetch("/products")
  .then((res) => res.json())
  .then((data) => {
    const tbody = document.querySelector("#inventory-table tbody");

    data.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
  <td>${product.barcode}</td>
  <td>
    <strong>${product.name}</strong><br/>
    <em>${product.brand || ""}</em>
    ${
      product.image
        ? `<br/><img src="${product.image}" alt="${product.name}" style="height:40px;">`
        : ""
    }
  </td>
  <td>${product.stock}</td>
`;

      tbody.appendChild(row);
    });
  });
