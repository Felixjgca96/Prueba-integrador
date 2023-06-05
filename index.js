const productsContainer = document.querySelector(".productos-contenedor");
const showMoreBtn = document.querySelector(".boton-mas");
const categoriesContainer = document.querySelector(".categorias");
const categoriesList = document.querySelectorAll(".categoria");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-lista");
const overlay = document.querySelector(".overlay");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const createProductTemplate = (product) => {
  const { id, nombre, precio, tallas, tarjetaImg } = product;

  return `
     <div class="productos-contenedor-tarjeta product">
     <img class="tarjeta-img" src=${tarjetaImg} alt="" />
     <div class="tarjeta-info">
         <h3 class="tarjeta-info-titulos">${nombre}</h3>
         <div class="tarjeta-info-tallas">
             <h4 class="tallas">Tallas:</h4>
             <p class="tallas-numeros">${tallas[0]}</p>
             <p class="tallas-numeros">${tallas[1]}</p>
             <p class="tallas-numeros">${tallas[2]}</p>
         </div>
         <div class="tarjeta-info-precios">
             <h4 class="precios-titulos">Precio:</h4>
             <p class="precios-numeros">${precio} $</p>
         </div>
         
         <button
									class="btn-add tarjeta-info-comprar"
									data-id="${id}"
									data-nombre="${nombre}"
									data-precio="${precio}"
									data-img="${tarjetaImg}"
								>
									Comprar
								</button>


     </div>
   </div>
   `;
};

const renderProducts = (productsList) => {
  productsContainer.innerHTML += productsList
    .map(createProductTemplate)
    .join("");
};

const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

const showMoreProducts = () => {
  appState.currentProductsIndex += 1;
  let { products, currentProductsIndex } = appState;
  renderProducts(products[currentProductsIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("categoria") &&
    !element.classList.contains("active")
  );
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility();
};

const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter((product) => {
    return product.categoria === appState.activeFilter;
  });
  renderProducts(filteredProducts);
};

const applyFilter = ({ target }) => {
  //Chequear que sea boton y no este activo
  if (!isInactiveFilterBtn(target)) {
    return;
  }
  //cambiar el estado del filtro
  changeFilterState(target);

  //si hay filtro activo, renderizo prod filtrados
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  //Si no hay filtro activo, renderizo 1er array
  renderProducts(appState.products[0]);
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  ) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
  if (!e.target.classList.contains("lista-link")) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

//LOGICA DEL CARRITO

const createCartProductTemplate = (cartProduct) => {
  const { id, nombre, precio, img, quantity } = cartProduct;
  return `
	<div class="cart-item">
		<img
			src=${img}
			alt="img"
		/>
		<div class="item-info">
			<h3 class="item-title">${nombre}</h3>
			<p class="item-bid">Precio</p>
			<span class="item-price">${precio} $</span>
		</div>
		<div class="item-handler">
			<span class="quantity-handler down" data-id=${id}>-</span>
			<span class="item-quantity">${quantity}</span>
			<span class="quantity-handler up" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">Tu carrito está vacío...</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const getCartTotal = () => {
  return cart.reduce((acc, val) => {
    return acc + Number(val.precio) * Number(val.quantity);
  }, 0);
};

const showCartTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} $`;
};

const createProductData = (product) => {
  const { id, nombre, precio, img } = product;
  return { id, nombre, precio, img };
};

const isExistingCartProduct = (productId) => {
  return cart.find((item) => {
    return item.id === productId;
  });
};

const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

const createCartProduct = (product) => {
  cart = [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];
};

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, val) => {
    return acc + val.quantity;
  }, 0);
};

const updateCartState = () => {
  //Guardar carrito en LC
  saveCart();
  //Renderizar Carrito
  renderCart();
  //Mostrar el total del carrito
  showCartTotal();
  //Chequear disable de botones
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  //Render burbuja del cart
  renderCartBubble();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) {
    return;
  }
  const product = createProductData(e.target.dataset);
  //si el producto ya existe
  if (isExistingCartProduct(product.id)) {
    //agregamos unidad al producto
    addUnitToProduct(product);
    //damos feedback
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else {
    //Si el producto no existe
    //Creamos el nuevo producto en el array
    createCartProduct(product);
    //damos feedback
    showSuccessModal("El producto se ha agregado al carrito");
  }

  //actualizamos data del carrito
  updateCartState();
};

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => {
    return product.id !== existingProduct.id;
  });
  updateCartState();
};

const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    //Eliminar producto
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  //Sacarle unidad al producto
  substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    //Manejamos evento de boton -
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    //Manejamos evento de boton +
    handlePlusBtnEvent(e.target.dataset.id);
  }
  //Actualizamos estado de carrito
  updateCartState();
};

const resetCartItem = () => {
  cart = [];
  updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;

  if (window.confirm(confirmMsg)) {
    resetCartItem();
    alert(successMsg);
  }
};

const completeBuy = () => {
  completeCartAction(
    "¿Desea completar su compra?",
    `Muchas gracias por su compra, con un total de ${total.innerHTML}.`
  );
};

const deleteCart = () => {
  completeCartAction(
    "¿Desea vaciar el carrito?",
    "No hay productos en el carrito"
  );
};

const init = () => {
  renderProducts(appState.products[appState.currentProductsIndex]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble();
};

init();
