const productosContenedor = document.querySelector(".productos-contenedor");
const MasBoton = document.querySelector(".boton-mas");
const categoriasContenedor = document.querySelector(".categorias");
const categoriaLista = document.querySelectorAll(".categoria");
const carritotBoton = document.querySelector(".carrito-label");
const carritoMenu = document.querySelector(".carrito");
const menuBoton = document.querySelector(".menu-label");
const barraMenu = document.querySelector(".navbar-list-link");
const overlay = document.querySelector(".overlay");
const productosCarrito = document.querySelector(".carrito-contenedor");
const total = document.querySelector(".total");
const exitoModal = document.querySelector(".añadir-modal");
const comprarBoton = document.querySelector(".boton-comprar");
const borrarBoton = document.querySelector(".boton-borrar");
const carritoBurbuja = document.querySelector(".carrito-burbuja");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const crearPlantillaProductos = (producto) => {
  const { id, nombre, precio, tallas, tarjetaImg } = producto;

  return `
     <div class="productos-contenedor-tarjeta">
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
									class="tarjeta-info-comprar"
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

const renderizarProductos = (productosLista) => {
  productosContenedor.innerHTML += productosLista
    .map(crearPlantillaProductos)
    .join("");
};

const ultimoIndice = () => {
  return appEstado.indiceProductosActuales === appEstado.productosLimite - 1;
};

const mostrarMasProductos = () => {
  appEstado.indiceProductosActuales += 1;
  let { productos, indiceProductosActuales } = appEstado;
  renderizarProductos(productos[indiceProductosActuales]);
  if (ultimoIndice()) {
    MasBoton.classList.add("oculto");
  }
};

const inactivoFiltroBoton = (element) => {
  return (
    element.classList.contains("categoria") &&
    !element.classList.contains("activo")
  );
};

const cambiarEstadoActivoDelBoton = (seleccionarCategoria) => {
  const categorias = [...categoriaLista];
  categorias.forEach((categoriaBoton) => {
    if (categoriaBoton.dataset.category !== seleccionarCategoria) {
      categoriaBoton.classList.remove("activo");
      return;
    }
    categoriaBoton.classList.add("activo");
  });
};

const establecerMostrarVisibilidad = () => {
  if (!appEstado.activoFiltro) {
    MasBoton.classList.remove("oculto");
    return;
  }
  MasBoton.classList.add("oculto");
};

const cambiarEstadoFiltro = (boton) => {
  appEstado.activoFiltro = boton.dataset.category;
  cambiarEstadoActivoDelBoton(appEstado.activoFiltro);
  establecerMostrarVisibilidad();
};

const renderizarProductosFiltrados = () => {
  const filtradosProductos = productosData.filter((producto) => {
    return producto.categoria === appEstado.activoFiltro;
  });
  renderizarProductos(filtradosProductos);
};

const aplicarFiltro = ({ target }) => {
  //Chequear que sea boton y no este activo
  if (!inactivoFiltroBoton(target)) {
    return;
  }
  //cambiar el estado del filtro
  cambiarEstadoFiltro(target);

  //si hay filtro activo, renderizo prod filtrados
  productosContenedor.innerHTML = "";
  if (appEstado.activoFiltro) {
    renderizarProductosFiltrados();
    appEstado.indiceProductosActuales = 0;
    return;
  }
  //Si no hay filtro activo, renderizo 1er array
  renderizarProductos(appEstado.productos[0]);
};

const toggleCarrito = () => {
  carritoMenu.classList.toggle("abrir-cart");
  if (barraMenu.classList.contains("abrir-menu")) {
    barraMenu.classList.remove("abrir-menu");
    return;
  }
  overlay.classList.toggle("mostrar-overlay");
};

const toggleMenu = () => {
  barraMenu.classList.toggle("abrir-menu");
  if (carritoMenu.classList.contains("abrir-cart")) {
    carritoMenu.classList.remove("abrir-cart");
    return;
  }
  overlay.classList.toggle("mostrar-overlay");
};

const cerrarScrollAlDesplazar = () => {
  if (
    !barraMenu.classList.contains("abrir-menu") &&
    !carritoMenu.classList.contains("abrir-cart")
  ) {
    return;
  }
  barraMenu.classList.remove("abrir-menu");
  carritoMenu.classList.remove("abrir-cart");
  overlay.classList.remove("mostrar-overlay");
};

const cerrarAlHacerClick = (e) => {
  if (!e.target.classList.contains("lista-link")) {
    return;
  }
  barraMenu.classList.remove("abrir-menu");
  overlay.classList.remove("mostrar-overlay");
};

const cerrarAlOverlayClick = () => {
  barraMenu.classList.remove("abrir-menu");
  carritoMenu.classList.remove("abrir-cart");
  overlay.classList.remove("mostrar-overlay");
};

//LOGICA DEL CARRITO

const crearPlanillaDeTarjetaCarrito = (carritoProducto) => {
  const { id, nombre, precio, img, cantidad } = carritoProducto;
  return `
	<div class="carrito-item">
		<img
			src=${img}
			alt="img"
		/>
		<div class="item-info">
			<h3 class="item-titulo">${nombre}</h3>
			<p class="item-bid">Precio</p>
			<span class="item-precio">${precio} $</span>
		</div>
		<div class="item-manipulador">
			<span class="cantidad-manipulador menos" data-id=${id}>-</span>
			<span class="item-cantidad">${cantidad}</span>
			<span class="cantidad-manipulador mas" data-id=${id}>+</span>
		</div>
	</div>
	`;
};

const renderizarCarrito = () => {
  if (!carrito.length) {
    productosCarrito.innerHTML = `<div class="contenedor-vacio">
    <p class="mensaje-vacio">Tu carrito está vacío...</p>
    <img class="logo-carrito-vacio" src="./img/triste.png" alt="logo">
  </div>
    `;
    return;
  }
  productosCarrito.innerHTML = carrito
    .map(crearPlanillaDeTarjetaCarrito)
    .join("");
};

const obtenerCarritoTotal = () => {
  return carrito.reduce((acc, val) => {
    return acc + Number(val.precio) * Number(val.cantidad);
  }, 0);
};

const mostrarCarritoTotal = () => {
  total.innerHTML = `${obtenerCarritoTotal().toFixed(2)} $`;
};

const crearDatosProductos = (producto) => {
  const { id, nombre, precio, img } = producto;
  return { id, nombre, precio, img };
};

const esUnProductoExistenteEnCarrito = (productoId) => {
  return carrito.find((item) => {
    return item.id === productoId;
  });
};

const agregarUnidadProducto = (producto) => {
  carrito = carrito.map((carritoProducto) => {
    return carritoProducto.id === producto.id
      ? { ...carritoProducto, cantidad: carritoProducto.cantidad + 1 }
      : carritoProducto;
  });
};

const mostrarModalExitoso = (mensaje) => {
  exitoModal.classList.add("activo-modal");
  exitoModal.textContent = mensaje;
  setTimeout(() => {
    exitoModal.classList.remove("activo-modal");
  }, 1500);
};

const crearTarjetaProductos = (producto) => {
  carrito = [
    ...carrito,
    {
      ...producto,
      cantidad: 1,
    },
  ];
};

const desactivarBoton = (boton) => {
  if (!carrito.length) {
    boton.classList.add("desactivar");
  } else {
    boton.classList.remove("desactivar");
  }
};

const renderizarCarritoBurbuja = () => {
  carritoBurbuja.textContent = carrito.reduce((acc, val) => {
    return acc + val.cantidad;
  }, 0);
};

const actualizarCarritoEstado = () => {
  //Guardar carrito en LC
  guardarCarrito();
  //Renderizar Carrito
  renderizarCarrito();
  //Mostrar el total del carrito
  mostrarCarritoTotal();
  //Chequear disable de botones
  desactivarBoton(comprarBoton);
  desactivarBoton(borrarBoton);
  //Render burbuja del cart
  renderizarCarritoBurbuja();
};

const agregarProducto = (e) => {
  if (!e.target.classList.contains("tarjeta-info-comprar")) {
    return;
  }
  const producto = crearDatosProductos(e.target.dataset);
  //si el producto ya existe
  if (esUnProductoExistenteEnCarrito(producto.id)) {
    //agregamos unidad al producto
    agregarUnidadProducto(producto);
    //damos feedback
    mostrarModalExitoso("Se agregó una unidad del producto al carrito");
  } else {
    //Si el producto no existe
    //Creamos el nuevo producto en el array
    crearTarjetaProductos(producto);
    //damos feedback
    mostrarModalExitoso("El producto se ha agregado al carrito");
  }

  //actualizamos data del carrito
  actualizarCarritoEstado();
};

const quitarProductoDelCarrito = (existeProducto) => {
  carrito = carrito.filter((producto) => {
    return producto.id !== existeProducto.id;
  });
  actualizarCarritoEstado();
};

const restarUnidadProducto = (existeProducto) => {
  carrito = carrito.map((producto) => {
    return producto.id === existeProducto.id
      ? { ...producto, cantidad: Number(producto.cantidad) - 1 }
      : producto;
  });
};

const eventoBotonMenos = (id) => {
  const existeProductoCarrito = carrito.find((item) => item.id === id);

  if (existeProductoCarrito.cantidad === 1) {
    //Eliminar producto
    if (window.confirm("¿Deseas eliminar el productos de tu carrito?")) {
      quitarProductoDelCarrito(existeProductoCarrito);
    }
    return;
  }
  //Sacarle unidad al producto
  restarUnidadProducto(existeProductoCarrito);
};

const eventoBotonMas = (id) => {
  const existeProductoCarrito = carrito.find((item) => item.id === id);
  agregarUnidadProducto(existeProductoCarrito);
};

const manejarCantidad = (e) => {
  if (e.target.classList.contains("menos")) {
    //Manejamos evento de boton -
    eventoBotonMenos(e.target.dataset.id);
  } else if (e.target.classList.contains("mas")) {
    //Manejamos evento de boton +
    eventoBotonMas(e.target.dataset.id);
  }
  //Actualizamos estado de carrito
  actualizarCarritoEstado();
};

const resetCarritotItem = () => {
  carrito = [];
  actualizarCarritoEstado();
};

const completarCarritoAccion = (confirmarMensaje, exitoMensaje) => {
  if (!carrito.length) return;

  if (window.confirm(confirmarMensaje)) {
    resetCarritotItem();
    alert(exitoMensaje);
  }
};

const completarCompra = () => {
  completarCarritoAccion(
    "¿Deseas completar tu compra?",
    `Muchas gracias por su compra, con un total de ${total.innerHTML}.`
  );
};

const borrarCarrito = () => {
  completarCarritoAccion(
    "¿Deseas vaciar tu carrito?",
    "Tu carrito está vacío..."
  );
};

const init = () => {
  renderizarProductos(appEstado.productos[appEstado.indiceProductosActuales]);
  MasBoton.addEventListener("click", mostrarMasProductos);
  categoriasContenedor.addEventListener("click", aplicarFiltro);
  carritotBoton.addEventListener("click", toggleCarrito);
  menuBoton.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", cerrarScrollAlDesplazar);
  barraMenu.addEventListener("click", cerrarAlHacerClick);
  overlay.addEventListener("click", cerrarAlOverlayClick);
  document.addEventListener("DOMContentLoaded", renderizarCarrito);
  document.addEventListener("DOMContentLoaded", mostrarCarritoTotal);
  productosContenedor.addEventListener("click", agregarProducto);
  productosCarrito.addEventListener("click", manejarCantidad);
  comprarBoton.addEventListener("click", completarCompra);
  borrarBoton.addEventListener("click", borrarCarrito);
  desactivarBoton(comprarBoton);
  desactivarBoton(borrarBoton);
  renderizarCarritoBurbuja();
};

init();
