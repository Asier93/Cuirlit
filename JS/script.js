// Término de búsqueda para feminismo transinclusivo y queer
const searchInput = 'feminismo transinclusivo queer'; 

// Construir la URL de la API con el término de búsqueda
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`;

// Obtener el elemento principal en el DOM
const main = document.getElementById("main");

// Hacer la solicitud a la API de Google Books
fetch(url)
  .then(response => response.json()) // Convertir la respuesta a formato JSON
  .then(response => printData(response.items)) // Llamar a la función printData con los elementos de libros
  .catch(error => {
    console.log('Error al hacer la solicitud:', error);
  });

// Función para mostrar los datos de los libros en la página
function printData(books) {
  // Iterar sobre cada libro recibido en la respuesta
  books.forEach(book => {
    // Crear un contenedor para cada tarjeta de libro
    const card = document.createElement('div');
    card.classList.add('col');

    // Construir el contenido HTML para cada tarjeta de libro
    const cardContent = `
      <div class="card">
        <img src="${book.volumeInfo.imageLinks.thumbnail}" class="card-img" alt="Book Cover">
        <div class="card-body">
          <h5 class="card-title">${book.volumeInfo.title}</h5>
          <p class="card-text">${book.volumeInfo.description}</p>
          <p class="card-text"><strong>Author(s):</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
        </div>
      </div>
    `;

    // Establecer el contenido HTML en el contenedor de la tarjeta de libro
    card.innerHTML = cardContent;

    // Agregar la tarjeta de libro al elemento principal en el DOM
    main.appendChild(card);
  });
}
