// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function renderCart() {
//   const container = document.getElementById("cart-items");
//   container.innerHTML = "";
//   cart.forEach((item, idx) => {
//     const div = document.createElement("div");
//     div.innerHTML = `${item.name} - ₹${item.price} 
//       <button onclick="removeItem(${idx})">Remove</button>`;
//     container.appendChild(div);
//   });
// }

// function removeItem(index) {
//   cart.splice(index, 1);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   renderCart();
// }

// function placeOrder() {
//   localStorage.removeItem("cart");
//   window.location.href = "order.html";
// }

// renderCart();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, idx) => {
    // Default quantity if missing
    if (!item.quantity) item.quantity = 1;

    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" width="80" alt="${item.name}">
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <div class="quantity-controls">
        <button onclick="decreaseQty(${idx})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${idx})">+</button>
      </div>
      <button onclick="removeItem(${idx})">Remove</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("cart-total").textContent = `Total: ₹${total}`;
}

function increaseQty(index) {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1); // remove if quantity goes to 0
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function placeOrder() {
  localStorage.removeItem("cart");
  window.location.href = "order.html";
}

renderCart();