const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 2499,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    rating: 4.5,
    stock: 8,
    badge: "Best Seller",
    description: "Premium running shoes with lightweight comfort, stylish design, and strong grip for daily use."
  },
  {
    id: 2,
    name: "Classic Watch",
    price: 1899,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    rating: 4.6,
    stock: 6,
    badge: "Trending",
    description: "Elegant wrist watch with modern styling, durable build, and premium finish for everyday fashion."
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 3299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    rating: 4.7,
    stock: 10,
    badge: "Top Rated",
    description: "High-quality wireless headphones with deep bass, long battery backup, and comfortable ear cushions."
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 2199,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    rating: 4.4,
    stock: 5,
    badge: "Popular",
    description: "Stylish leather backpack with spacious compartments, premium finish, and comfortable shoulder support."
  },
  {
    id: 5,
    name: "Smartphone",
    price: 14999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    rating: 4.8,
    stock: 4,
    badge: "Hot Deal",
    description: "Powerful smartphone with sleek design, sharp display, smooth performance, and long-lasting battery."
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 999,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    rating: 4.3,
    stock: 12,
    badge: "New Arrival",
    description: "Trendy sunglasses with UV protection, lightweight frame, and modern premium styling."
  },
  {
    id: 7,
    name: "Casual T-Shirt",
    price: 799,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    rating: 4.2,
    stock: 15,
    badge: "Budget Pick",
    description: "Soft and comfortable casual t-shirt perfect for daily wear with premium fabric quality."
  },
  {
    id: 8,
    name: "Laptop",
    price: 52999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    rating: 4.7,
    stock: 3,
    badge: "Premium",
    description: "High-performance laptop designed for productivity, multitasking, and a premium user experience."
  },
  {
    id: 9,
    name: "Sneakers",
    price: 2799,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
    rating: 4.5,
    stock: 9,
    badge: "Stylish",
    description: "Modern sneakers with comfortable sole, durable build, and clean everyday streetwear style."
  },
  {
    id: 10,
    name: "Bluetooth Speaker",
    price: 1599,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800",
    rating: 4.4,
    stock: 7,
    badge: "Smart Choice",
    description: "Portable Bluetooth speaker with powerful sound, compact design, and excellent battery backup."
  },
  {
    id: 11,
    name: "Handbag",
    price: 1899,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    rating: 4.3,
    stock: 6,
    badge: "Elegant",
    description: "Premium handbag with spacious interior, classy design, and stylish finish for daily use."
  },
  {
    id: 12,
    name: "Sports Cap",
    price: 499,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800",
    rating: 4.1,
    stock: 14,
    badge: "Fresh Pick",
    description: "Comfortable sports cap with breathable material and trendy design for casual outdoor wear."
  }
];
function highlight(text, search) {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, `<mark>$1</mark>`);
}

let cart = JSON.parse(localStorage.getItem("nexcartCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("nexcartWishlist")) || [];
let appliedCoupon = localStorage.getItem("nexcartCoupon") || "";
let orders = [];
let filteredProducts = [...products];

const GST_RATE = 0.18;
const DELIVERY_CHARGE = 99;
const COUPON_CODE = "SAVE10";
const COUPON_DISCOUNT_RATE = 0.1;
const API_BASE_URL = "http://localhost:5000";

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const toast = document.getElementById("toast");
const loaderWrapper = document.getElementById("loaderWrapper");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortOption = document.getElementById("sortOption");

const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const gstEl = document.getElementById("gst");
const deliveryEl = document.getElementById("delivery");
const finalTotalEl = document.getElementById("finalTotal");

const checkoutItemsCount = document.getElementById("checkoutItemsCount");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutDiscount = document.getElementById("checkoutDiscount");
const checkoutGST = document.getElementById("checkoutGST");
const checkoutDelivery = document.getElementById("checkoutDelivery");
const checkoutTotal = document.getElementById("checkoutTotal");

const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const goToCheckoutBtn = document.getElementById("goToCheckoutBtn");
const clearOrdersBtn = document.getElementById("clearOrdersBtn");

const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");

const successModal = document.getElementById("successModal");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");

const checkoutForm = document.getElementById("checkoutForm");
const cartBtn = document.getElementById("cartBtn");
const wishlistBtn = document.getElementById("wishlistBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const authSection = document.getElementById("authSection");

function saveState() {
  localStorage.setItem("nexcartCart", JSON.stringify(cart));
  localStorage.setItem("nexcartWishlist", JSON.stringify(wishlist));
  localStorage.setItem("nexcartCoupon", appliedCoupon);
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️"
  };

  toast.innerHTML = `${icons[type]} ${message}`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 7000);
}

function formatPrice(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}

function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCounts() {
  if (cartCount) cartCount.textContent = getCartItemCount();
  if (wishlistCount) wishlistCount.textContent = wishlist.length;
}

function calculateSummary() {
  const subtotal = cart.reduce((total, item) => {
    const product = getProductById(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const discount = appliedCoupon === COUPON_CODE ? Math.round(subtotal * COUPON_DISCOUNT_RATE) : 0;
  const taxableAmount = Math.max(subtotal - discount, 0);
  const gst = Math.round(taxableAmount * GST_RATE);
  const delivery = subtotal > 1000 ? 0 : (cart.length ? DELIVERY_CHARGE : 0);
  const finalTotal = taxableAmount + gst + delivery;

  return { subtotal, discount, gst, delivery, finalTotal };
}

function renderProducts(items) {
  if (!productGrid) return;

  if (!items.length) {
    productGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-box-open"></i>
        <h3>No products found</h3>
        <p>Try changing search, category, or sorting options.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = items.map((product) => {
    const isWishlisted = wishlist.includes(product.id);

    return `
      <div class="product-card glass">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" />
          ${localStorage.getItem("lastAdded") == product.id 
  ? '<span class="badge">Recently Added</span>' 
  : `<span class="badge">${product.badge}</span>`}
          <button class="wishlist-icon ${isWishlisted ? "active" : ""}" onclick="toggleWishlist(${product.id})">
            <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${highlight(product.name, searchInput?.value)}</h3>
          <p class="product-desc">${product.description}</p>

          <div class="product-meta">
            <span class="price">${formatPrice(product.price)}</span>
            <span class="rating"><i class="fa-solid fa-star"></i> ${product.rating}</span>
          </div>

          <p class="stock ${product.stock <= 5 ? 'low-stock' : ''}">
  ${product.stock <= 5 ? `⚠ Only ${product.stock} left` : `Stock: ${product.stock}`}
</p>

          <div class="product-actions">
            <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="quick-view-btn" onclick="openModal(${product.id})">Quick View</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}
function renderCart() {
  if (!cartItems) return;

if (!cart.length) {
  cartItems.innerHTML = `
    <div class="empty-state">
      <i class="fa-solid fa-cart-shopping"></i>
      <h3>Your cart is empty 😢</h3>
      <p>Looks like you haven’t added anything yet.</p>

      <button onclick="document.getElementById('products').scrollIntoView({behavior:'smooth'})" 
              class="primary-btn" 
              style="margin-top:10px;">
        Shop Now
      </button>
    </div>
  `;
  return;
}
  cartItems.innerHTML = cart.map((item) => {
    const product = getProductById(item.id);
    if (!product) return "";

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" />

        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p>${product.category}</p>
          <div class="cart-price">${formatPrice(product.price)}</div>

          <div class="qty-controls">
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  }).join("");
}

function renderWishlist() {
  if (!wishlistItems) return;

  if (!wishlist.length) {
    wishlistItems.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-heart"></i>
        <h3>Your wishlist is empty</h3>
        <p>Save your favorite products here.</p>
      </div>
    `;
    return;
  }


  wishlistItems.innerHTML = wishlist.map((id) => {
    const product = getProductById(id);
    if (!product) return "";

    return `
      <div class="wishlist-card">
        <img src="${product.image}" alt="${product.name}" />

        <div class="wishlist-card-info">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <strong>${formatPrice(product.price)}</strong>
        </div>

        <div class="wishlist-card-actions">
          <button class="move-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="remove-wishlist-btn" onclick="toggleWishlist(${product.id})">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderOrders() {
  const ordersList = document.getElementById("ordersList");
  if (!ordersList) return;

  const ordersCountTitle = document.getElementById("ordersCountTitle");
  if (ordersCountTitle) ordersCountTitle.textContent = `Total Orders: ${orders.length}`;

  if (!orders.length) {
    ordersList.innerHTML = `
      <div class="orders-empty">
        <i class="fa-solid fa-box-open"></i>
        <h3>No orders placed yet</h3>
        <p>Your past orders will appear here.</p>
      </div>
    `;
    return;
  }

  ordersList.innerHTML = orders.map((order, index) => {
    const status = order.status || "Pending";
    const statusClass = status.toLowerCase();

    return `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">Order #${orders.length - index}</span>
          <span class="order-date">${order.orderedAt || ""}</span>
        </div>

        <div class="order-top-row">
          <div class="order-status ${statusClass}">${status}</div>
        </div>

        <div class="tracking-bar">
          <div class="tracking-step active">
            <span>1</span>
            <p>Pending</p>
          </div>
          

          <div class="tracking-line ${status === "Shipped" || status === "Delivered" ? "active" : ""}"></div>
          <div class="tracking-step ${status === "Shipped" || status === "Delivered" ? "active" : ""}">
            <span>2</span>
            <p>Shipped</p>
          </div>
          <div class="tracking-line ${status === "Delivered" ? "active" : ""}"></div>
          <div class="tracking-step ${status === "Delivered" ? "active" : ""}">
            <span>3</span>
            <p>Delivered</p>
          </div>
        </div>

        <div class="order-customer">
          <strong>${order.customer?.fullName || ""}</strong> | ${order.customer?.phone || ""}<br>
          ${order.customer?.city || ""}, ${order.customer?.pincode || ""}<br>
          Payment: ${(order.customer?.paymentMethod || "").toUpperCase()}
        </div>

        <div class="order-items">
          ${(order.items || []).map((item) => {
            const product = getProductById(item.id);
            if (!product) return "";

            return `
              <div class="order-item">
                <span class="order-item-name">${product.name}</span>
                <span class="order-item-qty">x${item.quantity}</span>
                <span class="order-item-price">${formatPrice(product.price * item.quantity)}</span>
              </div>
            `;
          }).join("")}
        </div>

        <div class="order-summary">
          <span><span>Subtotal</span><span>${formatPrice(order.summary?.subtotal)}</span></span>
          <span><span>Discount</span><span>- ${formatPrice(order.summary?.discount)}</span></span>
          <span><span>GST</span><span>${formatPrice(order.summary?.gst)}</span></span>
          <span><span>Delivery</span><span>${formatPrice(order.summary?.delivery)}</span></span>
          <span class="order-total"><span>Total</span><span>${formatPrice(order.summary?.finalTotal)}</span></span>
        </div>

        <div class="order-actions">
          <select onchange="updateOrderStatus('${order._id}', this.value)">
            <option value="Pending" ${status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Shipped" ${status === "Shipped" ? "selected" : ""}>Shipped</option>
            <option value="Delivered" ${status === "Delivered" ? "selected" : ""}>Delivered</option>
          </select>

          <button class="remove-btn" onclick="deleteOrder('${order._id}')">Delete Order</button>
        </div>
      </div>
    `;
  }).join("");
}

function renderSummary() {
  const summary = calculateSummary();

  if (subtotalEl) subtotalEl.textContent = formatPrice(summary.subtotal);
  if (discountEl) discountEl.textContent = summary.discount ? `- ${formatPrice(summary.discount)}` : "₹0";
  if (gstEl) gstEl.textContent = formatPrice(summary.gst);
  if (deliveryEl) deliveryEl.textContent = formatPrice(summary.delivery);
  if (finalTotalEl) finalTotalEl.textContent = formatPrice(summary.finalTotal);

  if (checkoutItemsCount) checkoutItemsCount.textContent = getCartItemCount();
  if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(summary.subtotal);
  if (checkoutDiscount) checkoutDiscount.textContent = summary.discount ? `- ${formatPrice(summary.discount)}` : "₹0";
  if (checkoutGST) checkoutGST.textContent = formatPrice(summary.gst);
  if (checkoutDelivery) checkoutDelivery.textContent = formatPrice(summary.delivery);
  if (checkoutTotal) checkoutTotal.textContent = formatPrice(summary.finalTotal);

  if (couponInput) couponInput.value = appliedCoupon;
}

function refreshUI() {
  saveState();
  updateCounts();
  renderProducts(filteredProducts);
  renderCart();
  renderWishlist();
  renderSummary();
  renderOrders();
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity >= product.stock) {
      showToast("Maximum stock limit reached");
      return;
    }
    existingItem.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }
  refreshUI();
  showToast(`${product.name} added to cart`);
}
// DELETE THIS COMPLETELY ❌

function removeFromCart(productId) {
  const product = getProductById(productId);
  cart = cart.filter((item) => item.id !== productId);
  refreshUI();
  showToast(`${product?.name || "Item"} removed from cart`);
}

function changeQuantity(productId, change) {
  const cartItem = cart.find((item) => item.id === productId);
  const product = getProductById(productId);

  if (!cartItem || !product) return;

  const newQuantity = cartItem.quantity + change;

  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  if (newQuantity > product.stock) {
    showToast("Cannot exceed available stock");
    return;
  }

  cartItem.quantity = newQuantity;
  refreshUI();
}

function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (!product) return;

  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
    showToast(`${product.name} removed from wishlist`);
  } else {
    wishlist.push(productId);
    showToast(`${product.name} added to wishlist`);
  }

  refreshUI();
}

function openModal(productId) {
  const product = getProductById(productId);
  if (!product || !modalContent || !productModal) return;

  const isWishlisted = wishlist.includes(product.id);

  modalContent.innerHTML = `
    <div class="modal-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>

    <div class="modal-details">
      <span class="modal-category">${product.category}</span>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <div class="modal-price">${formatPrice(product.price)}</div>
      <div class="modal-rating"><i class="fa-solid fa-star"></i> ${product.rating}</div>
      <p><strong>Stock:</strong> ${product.stock} available</p>
      <p><strong>Badge:</strong> ${product.badge}</p>

      <div class="modal-actions">
        <button class="modal-add-cart" onclick="addToCart(${product.id}); closeModal();">Add to Cart</button>
        <button class="modal-wishlist" onclick="toggleWishlist(${product.id}); openModal(${product.id});">
          ${isWishlisted ? "Remove Wishlist" : "Add Wishlist"}
        </button>
      </div>
    </div>
  `;

  productModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!productModal) return;
  productModal.classList.remove("show");
  document.body.style.overflow = "";
}
function openSuccessModal() {
  if (!successModal) return;

  successModal.classList.add("show");
  document.body.style.overflow = "hidden";

  launchConfetti();

  // 🔁 Restart truck animation
  const truck = document.querySelector(".truck");
  if (truck) {
    truck.style.animation = "none";
    truck.offsetHeight; // trigger reflow
    truck.style.animation = "truckMove 3s ease forwards";
  }
}
  
function closeSuccessModal() {
  if (!successModal) return;
  successModal.classList.remove("show");
  document.body.style.overflow = "";
}

function applyCoupon() {
  if (!couponInput) return;

  const enteredCoupon = couponInput.value.trim().toUpperCase();

  if (!cart.length) {
    showToast("Add products to cart first");
    return;
  }

  if (!enteredCoupon) {
    showToast("Please enter coupon code");
    return;
  }

  if (enteredCoupon === COUPON_CODE) {
    appliedCoupon = COUPON_CODE;
    refreshUI();
    showToast("Coupon applied successfully");
  } else {
    appliedCoupon = "";
    refreshUI();
    showToast("Invalid coupon code");
  }
}

function clearCart() {
  if (!cart.length) {
    showToast("Cart is already empty");
    return;
  }

  cart = [];
  appliedCoupon = "";
  refreshUI();
  showToast("Cart cleared");
}

function filterAndSortProducts() {
  const searchValue = (searchInput?.value || "").trim().toLowerCase();
  const selectedCategory = categoryFilter?.value || "all";
  const selectedSort = sortOption?.value || "default";

  filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue);

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (selectedSort === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "ratingHighLow") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filteredProducts);
}

function validateCheckoutForm() {
  const fullName = document.getElementById("fullName")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const city = document.getElementById("city")?.value.trim();
  const address = document.getElementById("address")?.value.trim();
  const pincode = document.getElementById("pincode")?.value.trim();
  const paymentMethod = document.getElementById("paymentMethod")?.value;

  if (!fullName || !phone || !email || !city || !address || !pincode || !paymentMethod) {
    showToast("Please fill all checkout details");
    return false;
  }

  if (!/^\d{10}$/.test(phone)) {
    showToast("Enter valid 10-digit phone number");
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showToast("Enter valid email address");
    return false;
  }

  if (!/^\d{6}$/.test(pincode)) {
    showToast("Enter valid 6-digit pincode");
    return false;
  }

  return true;
}

async function loadOrdersFromBackend() {
  const ordersList = document.getElementById("ordersList");
  if (!ordersList) return;

  try {
    ordersList.innerHTML = `
      <div class="orders-empty">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <h3>Loading orders...</h3>
        <p>Please wait while we fetch your orders.</p>
      </div>
    `;

    const response = await fetch(`${API_BASE_URL}/api/orders`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to fetch orders");
    }

    orders = result.data || [];
    renderOrders();
  } catch (error) {
    console.error("Load orders error:", error);

    ordersList.innerHTML = `
      <div class="orders-empty">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h3>Failed to load orders</h3>
        <p>Make sure backend server is running on port 5000.</p>
      </div>
    `;
  }
}

async function clearAllOrdersFromBackend() {
  if (!orders.length) {
    showToast("No orders to clear");
    return;
  }

  const ok = window.confirm("Are you sure you want to clear all orders?");
  if (!ok) return;

  try {
    for (const order of orders) {
      if (order._id) {
        await fetch(`${API_BASE_URL}/api/orders/${order._id}`, {
          method: "DELETE"
        });
      }
    }

    orders = [];
    renderOrders();
    showToast("Order history cleared");
  } catch (error) {
    console.error("Clear orders error:", error);
    showToast("Failed to clear order history");
  }
}

async function deleteOrder(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to delete order");
    }

    showToast("Order deleted successfully");
    loadOrdersFromBackend();
  } catch (error) {
    console.error("Delete order error:", error);
    showToast("Failed to delete order");
  }
}

async function updateOrderStatus(id, newStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to update status");
    }

    showToast(`Order marked as ${newStatus}`);
    loadOrdersFromBackend();
  } catch (error) {
    console.error("Update status error:", error);
    showToast("Failed to update order status");
  }
}

async function placeOrder(e) {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("nexcartUser"));

  if (!user) {
    showToast("Please login to place order");
    openAuthModal();
    return;
  }

  if (!validateCheckoutForm()) return;

  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }

  const orderData = {
    user: {
      name: user.name,
      email: user.email
    },
    customer: {
      fullName: document.getElementById("fullName").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      city: document.getElementById("city").value.trim(),
      address: document.getElementById("address").value.trim(),
      pincode: document.getElementById("pincode").value.trim(),
      paymentMethod: document.getElementById("paymentMethod").value
    },
    items: [...cart],
    summary: calculateSummary(),
    orderedAt: new Date().toLocaleString(),
    status: "Pending"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to place order");
    }

    cart = [];
    appliedCoupon = "";
    checkoutForm.reset();
    saveState();
    refreshUI();
    openSuccessModal();

    setTimeout(() => {
      closeSuccessModal();
      document.getElementById("orders")?.scrollIntoView({ behavior: "smooth" });
      loadOrdersFromBackend();
    }, 1500);
  } catch (error) {
    console.error("Place order error:", error);
    showToast("Order could not be saved");
  }
}
/* AUTH MODAL + PROFILE DROPDOWN */
function openAuthModal() {
  document.getElementById("authModal").classList.add("show");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("show");
}

function switchTab(tab) {
  document.getElementById("loginForm").classList.toggle("hidden", tab !== "login");
  document.getElementById("registerForm").classList.toggle("hidden", tab !== "register");

  document.getElementById("loginTab").classList.toggle("active", tab === "login");
  document.getElementById("registerTab").classList.toggle("active", tab === "register");
}

function renderAuthSection() {
  const user = JSON.parse(localStorage.getItem("nexcartUser"));

  if (!authSection) return;

  if (!user) {
    authSection.innerHTML = `
      <button onclick="openAuthModal()" class="primary-btn" type="button">
        Login
      </button>
    `;
    return;
  }

  const letter = user.name ? user.name.charAt(0).toUpperCase() : "U";

  authSection.innerHTML = `
    <div class="profile-dropdown">
      <button class="profile-btn" onclick="toggleProfileMenu()" type="button">
        <span class="avatar-circle">${letter}</span>
        <span class="profile-name">${user.name}</span>
        <i class="fa-solid fa-angle-down"></i>
      </button>

      <div class="profile-menu" id="profileMenu">
        <div class="profile-menu-header">
          <span class="avatar-circle big">${letter}</span>
          <div>
            <strong>${user.name}</strong>
            <p>${user.email}</p>
          </div>
        </div>

        <button onclick="document.getElementById('orders').scrollIntoView({behavior:'smooth'})">
          <i class="fa-solid fa-box"></i> My Orders
        </button>

        <button onclick="logout()">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  `;
}

function toggleProfileMenu() {
  document.getElementById("profileMenu")?.classList.toggle("show");
}

function logout() {
  localStorage.removeItem("nexcartUser");
  showToast("Logged out successfully");
  setTimeout(() => location.reload(), 600);
}

/* EVENTS */
window.addEventListener("load", () => {
  setTimeout(() => {
    if (loaderWrapper) loaderWrapper.classList.add("hide");
  }, 700);
});

if (searchInput) searchInput.addEventListener("input", filterAndSortProducts);
if (categoryFilter) categoryFilter.addEventListener("change", filterAndSortProducts);
if (sortOption) sortOption.addEventListener("change", filterAndSortProducts);

if (applyCouponBtn) applyCouponBtn.addEventListener("click", applyCoupon);
if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
if (clearOrdersBtn) clearOrdersBtn.addEventListener("click", clearAllOrdersFromBackend);

if (goToCheckoutBtn) {
  goToCheckoutBtn.addEventListener("click", () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

if (productModal) {
  productModal.addEventListener("click", (event) => {
    if (event.target === productModal) closeModal();
  });
}

if (continueShoppingBtn) {
  continueShoppingBtn.setAttribute("type", "button");
  continueShoppingBtn.textContent = "View Orders";

  continueShoppingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeSuccessModal();
    document.getElementById("orders")?.scrollIntoView({ behavior: "smooth" });
    loadOrdersFromBackend();
  });
}

if (successModal) {
  successModal.addEventListener("click", (event) => {
    if (event.target === successModal) closeSuccessModal();
  });
}

if (checkoutForm) {
  checkoutForm.addEventListener("submit", placeOrder);
}

if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    document.getElementById("cartSection")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (wishlistBtn) {
  wishlistBtn.addEventListener("click", () => {
    document.querySelector(".wishlist-section")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerText = "☀";
  } else {
    themeToggle.innerText = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerText = "☀";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerText = "🌙";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAuthSection();

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = {
        email: document.getElementById("loginEmail").value.trim(),
        password: document.getElementById("loginPassword").value.trim()
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("nexcartUser", JSON.stringify(data.user));
          showToast("Login successful 🔥");
          closeAuthModal();
          renderAuthSection();
        } else {
          showToast(data.message || "Login failed ❌");
        }
      } catch (error) {
        console.error("Login error:", error);
        showToast("Server error");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = {
        name: document.getElementById("registerName").value.trim(),
        email: document.getElementById("registerEmail").value.trim(),
        password: document.getElementById("registerPassword").value.trim()
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });

        const data = await response.json();

        if (data.success) {
          showToast("Registered successfully 🚀");
          switchTab("login");
        } else {
          showToast(data.message || "Register failed ❌");
        }
      } catch (error) {
        console.error("Register error:", error);
        showToast("Server error");
      }
    });
  }
});

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.toggleWishlist = toggleWishlist;
window.openModal = openModal;
window.closeModal = closeModal;
window.deleteOrder = deleteOrder;
window.updateOrderStatus = updateOrderStatus;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchTab = switchTab;
window.toggleProfileMenu = toggleProfileMenu;
window.logout = logout;

refreshUI();
loadOrdersFromBackend();
renderAuthSection();


// 🎉 CONFETTI ANIMATION
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -10;

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    requestAnimationFrame(update);
  }

  update();

  // stop after 3 seconds
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 3000);
}
const faders = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

faders.forEach(el => {
  el.classList.add("fade-in");
  observer.observe(el);
});