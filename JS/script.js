//Menú burger:cerrar

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el botón del menú (Burger) y el contenido del menú desplegable
  const menuButton = document.querySelector(".navbar-toggler");
  const menuContent = document.querySelector(".navbar-collapse");

  // Agrega un event listener para detectar clics en cualquier parte del documento
  document.addEventListener("click", function (event) {
    // Verifica si el clic no está dentro del botón del menú y del contenido del menú
    if (
      !menuButton.contains(event.target) &&
      !menuContent.contains(event.target)
    ) {
      // Comprueba si el menú está actualmente abierto
      const isMenuOpen = menuButton.getAttribute("aria-expanded") === "true";
      if (isMenuOpen) {
        // Si el menú está abierto, simula un clic en el botón del menú para cerrarlo
        menuButton.click();
      }
    }
  });
});



//BUSCADOR
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form'); // Selecciona el formulario de búsqueda
  const searchInput = document.querySelector('.form-control'); // Selecciona el campo de entrada de búsqueda
  const main = document.getElementById('main'); // Elemento donde se mostrarán los resultados

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const searchTerm = searchInput.value; // Obtiene el término de búsqueda ingresado por el usuario

    // Construye la URL de la API de Google Books con el término de búsqueda
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;

    // Realiza la solicitud a la API de Google Books
    fetch(url)
      .then(response => response.json()) // Convierte la respuesta a formato JSON
      .then(response => displayBooks(response.items)) // Muestra los resultados de la búsqueda
      .catch(error => {
        console.log("Error al realizar la búsqueda:", error);
      });
  });

  // Función para mostrar los libros encontrados en la página
  function displayBooks(books) {
    main.innerHTML = ''; // Limpia el contenido actual en el contenedor

    // Verifica si se encontraron libros
    if (books && books.length > 0) {
      books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'mx-auto');

        const cardContent = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}" class="img-fluid rounded-start card-img" alt="Book Cover">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${book.volumeInfo.title || 'Title not available'}</h5>
                <p class="card-text">${book.volumeInfo.description || 'Description not available'}</p>
                <p class="card-text"><small class="text-body-secondary">${book.volumeInfo.publishedDate || 'Unknown'}</small></p>
              </div>
            </div>
          </div>
        `;

        card.innerHTML = cardContent;
        main.appendChild(card);
      });
    } else {
      main.innerHTML = '<p>No se encontraron libros.</p>';
    }
  }
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


//PAGINACIÓN 

