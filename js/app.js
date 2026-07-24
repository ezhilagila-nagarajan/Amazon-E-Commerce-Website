let products = [];
let currentPage = 1;
const itemsPerPage = 6;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts() {
  const res = await fetch("data/products.json");
  products = await res.json();
  populateCategories();
  renderProducts();
}

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  const select = document.getElementById("categoryFilter");
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

// function renderProducts() {
//   const list = document.getElementById("product-list");
//   list.innerHTML = "";
//   const searchTerm = document.getElementById("search").value.toLowerCase();
//   const category = document.getElementById("categoryFilter").value;

//   let filtered = products.filter(p =>
//     p.name.toLowerCase().includes(searchTerm) &&
//     (category === "all" || p.category === category)
//   );

//   const start = (currentPage - 1) * itemsPerPage;
//   const paginated = filtered.slice(start, start + itemsPerPage);

//   paginated.forEach(p => {
//     const div = document.createElement("div");
//     div.className = "product";
//     div.innerHTML = `
//       <img src="images/${p.image}" width="150">
//       <h3>${p.name}</h3>
//       <p>₹${p.price}</p>
//       <button onclick="addToCart(${p.id})">Add to Cart</button>
//     `;
//     list.appendChild(div);
//   });

//   renderPagination(filtered.length);
// }

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const sortBy = document.getElementById("sortBy").value;

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm) &&
    (category === "all" || p.category === category)
  );

  // Sorting logic
  switch (sortBy) {
    case "priceAsc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "nameAsc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  paginated.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" width="150">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });

  renderPagination(filtered.length);
}

document.getElementById("sortBy").addEventListener("change", renderProducts);


function renderPagination(totalItems) {
  const pages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => { currentPage = i; renderProducts(); };
    pagination.appendChild(btn);
  }
}

// function addToCart(id) {
//   const product = products.find(p => p.id === id);
//   cart.push(product);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   alert("Added to cart!");
// }


function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    // Ensure we copy product and add quantity
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

document.getElementById("search").addEventListener("input", renderProducts);
document.getElementById("categoryFilter").addEventListener("change", renderProducts);

loadProducts();
