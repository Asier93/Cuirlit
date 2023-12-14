//Menú burger:cerrar

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el botón del menú (Burger) y el contenido del menú desplegable
  const menuButton = document.querySelector('.navbar-toggler');
  const menuContent = document.querySelector('.navbar-collapse');

  // Agrega un event listener para detectar clics en cualquier parte del documento
  document.addEventListener('click', function(event) {
    // Verifica si el clic no está dentro del botón del menú y del contenido del menú
    if (!menuButton.contains(event.target) && !menuContent.contains(event.target)) {
      // Comprueba si el menú está actualmente abierto
      const isMenuOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (isMenuOpen) {
        // Si el menú está abierto, simula un clic en el botón del menú para cerrarlo
        menuButton.click();
      }
    }
  });
});


// Término de búsqueda para feminismo transinclusivo y queer
const searchInput = "feminismo transinclusivo queer";

// Construir la URL de la API con el término de búsqueda
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
  searchInput
)}`;

// Obtener el elemento principal en el DOM
const main = document.getElementById("main");

// Hacer la solicitud a la API de Google Books
fetch(url)
  .then((response) => response.json()) // Convertir la respuesta a formato JSON
  .then((response) => printData(response.items)) // Llamar a la función printData con los elementos de libros
  .catch((error) => {
    console.log("Error al hacer la solicitud:", error);
  });

// Función para mostrar los datos de los libros en la página
function printData(books) {
  // Iterar sobre cada libro recibido en la respuesta
  books.forEach((book) => {
    // Crear un contenedor para cada tarjeta de libro
    const card = document.createElement("div");
    card.classList.add("card", "mb-3", "mx-auto"); // Añadir clases Bootstrap para estilizar la tarjeta

    // Construir el contenido HTML para cada tarjeta de libro
    const cardContent = `
      <div class="row g-0">
      <div class="col-md-4">
      <img src="${
        book.volumeInfo.imageLinks.thumbnail
      }" class="img-fluid rounded-start card-img" alt="Book Cover">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${book.volumeInfo.title}</h5>
        <p class="card-text">${
          book.volumeInfo.description
            ? book.volumeInfo.description.substring(0, 150) + "..."
            : "Description not available"
        }</p>
        <p class="card-text"><small class="text-body-secondary">Last updated ${
          book.volumeInfo.publishedDate
            ? book.volumeInfo.publishedDate
            : "Unknown"
        }</small></p>
      </div>
    </div>
  </div>
`;

    card.innerHTML = cardContent;
    main.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card"); // Obtén todas las tarjetas
  const cardsPerPage = 6; // Cantidad de tarjetas a mostrar por página
  const cardContainer = document.getElementById("cardContainer");
  const pagination = document.getElementById("pagination");

  function displayCards(startIndex, endIndex) {
    cards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  function generatePagination() {
    const pageCount = Math.ceil(cards.length / cardsPerPage);

    let paginationButtons = "";
    for (let i = 1; i <= pageCount; i++) {
      paginationButtons += `<button class="page-link" onclick="changePage(event, ${i})">${i}</button>`;
    }

    pagination.innerHTML = paginationButtons;
  }

  function changePage(event, pageNumber) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace (botón)

    const startIndex = (pageNumber - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    displayCards(startIndex, endIndex);
  }

  displayCards(0, cardsPerPage); // Mostrar las primeras tarjetas al cargar la página
  generatePagination(); // Generar los botones de paginación
});

//Este código asume que tienes tarjetas con la clase .card. Selecciona todas las tarjetas, establece cuántas tarjetas deseas mostrar por página (`cardsPerPage`), y utiliza estas funciones para mostrar las tarjetas según la página seleccionada.
//El script creará los botones de paginación según la cantidad de tarjetas y cambiará la visibilidad de las tarjetas al hacer clic en los botones de paginación.
//Asegúrate de ajustar y personalizar el código según la estructura real de tus tarjetas y su cantidad. Además, considera que este ejemplo es una paginación simple y puedes mejorarla o modificarla según tus necesidades específicas.
