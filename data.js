const productsData = [
  {
    id: 1,
    nombre: "Franela 100% Algodon",
    tallas: ["S", "L", "XL"],
    precio: "8",
    categoria: "hombre",
    tarjetaImg: "./img/franela100.png",
  },
  {
    id: 2,
    nombre: "Camisa Poliester",
    tallas: ["S", "M", "L"],
    precio: "5",
    categoria: "hombre",
    tarjetaImg: "./img/camisapoliester.jpg",
  },
  {
    id: 3,
    nombre: "Conjunto Deportivo",
    tallas: ["S", "M", "L"],
    precio: "15",
    categoria: "hombre",
    tarjetaImg: "./img/conjuntodeportivo.jpg",
  },
  {
    id: 4,
    nombre: "Chaqueta Impermeable",
    tallas: ["M", "L", "XL"],
    precio: "12",
    categoria: "hombre",
    tarjetaImg: "./img/chaquetaimpermeable.jpg",
  },
  {
    id: 5,
    nombre: "Uniforme Deportivo",
    tallas: ["M", "L", "XL"],
    precio: "20",
    categoria: "hombre",
    tarjetaImg: "./img/uniformedeportivo.jpg",
  },
  {
    id: 6,
    nombre: "Jogger Caballero",
    tallas: ["S", "M", "L"],
    precio: "10",
    categoria: "hombre",
    tarjetaImg: "./img/jogger.jpg",
  },
  {
    id: 7,
    nombre: "Franelillas",
    tallas: ["S", "M", "L"],
    precio: "5",
    categoria: "hombre",
    tarjetaImg: "./img/franelilla.png",
  },
  {
    id: 8,
    nombre: "Calza Dama",
    tallas: ["S", "M", "L"],
    precio: "15",
    categoria: "dama",
    tarjetaImg: "./img/calzadama.jpg",
  },
  {
    id: 9,
    nombre: "Campera Dama",
    tallas: ["S", "M", "L"],
    precio: "25",
    categoria: "dama",
    tarjetaImg: "./img/camperadama.jpg",
  },
  {
    id: 10,
    nombre: "Campera Niño",
    tallas: ["8", "12", "14"],
    precio: "15",
    categoria: "niño",
    tarjetaImg: "./img/camperaniño.jpg",
  },
  {
    id: 11,
    nombre: "Jogger Dama",
    tallas: ["M", "L", "XL"],
    precio: "5",
    categoria: "dama",
    tarjetaImg: "./img/joggerdama.jpg",
  },
  {
    id: 12,
    nombre: "Mochila Dama",
    tallas: ["P", "M", "G"],
    precio: "35",
    categoria: "dama",
    tarjetaImg: "./img/mochiladama.jpg",
  },
  {
    id: 13,
    nombre: "Mochila Niño",
    tallas: ["P", "M", "G"],
    precio: "35",
    categoria: "niño",
    tarjetaImg: "./img/mochilaniño.jpg",
  },
  {
    id: 14,
    nombre: "Remera Dama",
    tallas: ["S", "M", "XL"],
    precio: "5",
    categoria: "dama",
    tarjetaImg: "./img/remeradama.jpg",
  },
  {
    id: 15,
    nombre: "Top Dama",
    tallas: ["S", "L", "XL"],
    precio: "15",
    categoria: "dama",
    tarjetaImg: "./img/topdama.jpg",
  },
];

const divideProductsInParts = (size) => {
  let productsList = [];
  for (let i = 0; i < productsData.length; i += size) {
    productsList.push(productsData.slice(i, i + size));
  }
  return productsList;
};

const appState = {
  products: divideProductsInParts(4),
  currentProductsIndex: 0,
  productsLimit: divideProductsInParts(4).length,
  activeFilter: null,
};
