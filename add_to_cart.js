// Get elements
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let addCartButtons = document.querySelectorAll('.add-cart');
let buyButton = document.querySelector('.btn-buy');
let cartContent = document.querySelector('.cart-content');
let totalPrice = document.querySelector('.total-price');

// Open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Add to cart
addCartButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

// Remove item from cart
cartContent.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart-remove')) {
    const cartItem = event.target.parentElement.parentElement;
    cartItem.remove();
    updateTotal();
  }
});

// Buy button clicked
buyButton.addEventListener('click', buyButtonClicked);

function addToCart(event) {
  const button = event.target;
  const shopProduct = button.parentElement.parentElement;
  const title = shopProduct.querySelector('.product-title').innerText;
  const price = shopProduct.querySelector('.price').innerText;
  const productImg = shopProduct.querySelector('.product-img').src;

  const cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');

  const cartBoxContent = `
    <img src="${productImg}" class="cart-img" alt="">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
      <i class='bx bx-trash-alt cart-remove' style='color:#ffffff'></i>
    </div>
  `;
  cartShopBox.innerHTML = cartBoxContent;

  const removeButton = cartShopBox.querySelector('.cart-remove');
  removeButton.addEventListener('click', (event) => {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
  });

  const quantityInput = cartShopBox.querySelector('.cart-quantity');
  quantityInput.addEventListener('change', quantityChanged);

  cartContent.appendChild(cartShopBox);
  updateTotal();
}

function buyButtonClicked() {
  if (cartContent.children.length === 0) {
    alert('Your cart is empty. Please add items to the cart before placing an order.');
  } else {
    let emptyCart = true;
    const cartBoxes = document.querySelectorAll('.cart-box');
    cartBoxes.forEach((cartBox) => {
      const quantityElement = cartBox.querySelector('.cart-quantity');
      const quantity = quantityElement.value;
      if (quantity > 0) {
        emptyCart = false;
        return;
      }
    });

    if (emptyCart) {
      alert('Your cart is empty. Please add items to the cart before placing an order.');
    } else {
      alert('Your order is placed');
      while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild);
      }
      updateTotal();
    }
  }
}

function quantityChanged(event) {
  updateTotal();
}

function updateTotal() {
  const cartBoxes = document.querySelectorAll('.cart-box');
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector('.cart-price');
    const quantityElement = cartBox.querySelector('.cart-quantity');
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    total += price * quantity;
  });
  totalPrice.innerText = "$" + total.toFixed(2);
}

// Ensure the close button is always visible
closeCart.style.display = "block";
