const products = [
  {
    id: 1,
    name: "Apple",
    price: 30,
    category: "fruits",
    image: "img/apple.jpg",
    description: "Fresh red apples.",
  },
  {
    id: 2,
    name: "Banana",
    price: 10,
    category: "fruits",
    image: "img/banana.jpg",
    description: "Organic bananas.",
  },
  {
    id: 3,
    name: "Carrot",
    price: 20,
    category: "vegetables",
    image: "img/carrot.jpg",
    description: "Crunchy carrots.",
  },
  {
    id: 4,
    name: "Milk",
    price: 50,
    category: "dairy",
    image: "img/milk.jpg",
    description: "Pure cow milk.",
  },
  {
    id: 5,
    name: "Cheese",
    price: 100,
    category: "dairy",
    image: "img/cheese.jpg",
    description: "Aged cheddar cheese.",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Load and display products
function loadProducts(category = "all") {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  filteredProducts.forEach((product) => {
    const isInCart = cart.some((item) => item.id === product.id);

    const productCard = document.createElement("div");
    productCard.className =
      "bg-white border border-gray-200 text-gray-800 p-4 rounded-xl shadow-md text-center w-52 transition-transform transform hover:scale-105";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${
      product.name
    }" class="w-20 h-20 mx-auto mb-3">
      <h3 class="text-lg font-semibold">${product.name}</h3>
      <p class="text-sm text-gray-500">${product.description}</p>
      <div class="flex justify-between items-center mt-3">
        <span class="text-green-700 font-bold">₹${product.price}</span>
        <button onclick="toggleCart(${product.id})"
          class="px-3 py-1 text-sm font-medium rounded-full transition duration-300 
          ${
            isInCart
              ? "bg-red-400 text-white hover:bg-red-500"
              : "bg-green-400 text-white hover:bg-green-500"
          }">
          ${isInCart ? "Remove" : "Add"}
        </button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });
}

// Toggle cart function
function toggleCart(productId) {
  const product = products.find((p) => p.id === productId);
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    showToast(`${product.name} removed from cart.`);
  } else {
    cart.push(product);
    showToast(`${product.name} added to cart.`);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  loadProducts();
}

// Highlight active category tab
function filterProducts(category) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("bg-green-200", "text-green-900");
    btn.classList.add("bg-gray-100", "text-gray-700");
  });

  const activeTab = document.querySelector(`[data-category="${category}"]`);
  if (activeTab) {
    activeTab.classList.add("bg-green-200", "text-green-900");
  }

  loadProducts(category);
}

// Load products on page load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
});
