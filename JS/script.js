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
    card.classList.add('card', 'mb-3', 'mx-auto'); // Añadir clases Bootstrap para estilizar la tarjeta

    // Construir el contenido HTML para cada tarjeta de libro
    const cardContent = `
      <div class="row g-0">
      <div class="col-md-4">
      <img src="${book.volumeInfo.imageLinks.thumbnail}" class="img-fluid rounded-start card-img" alt="Book Cover">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${book.volumeInfo.title}</h5>
        <p class="card-text">${book.volumeInfo.description ? book.volumeInfo.description.substring(0, 150) + '...' : 'Description not available'}</p>
        <p class="card-text"><small class="text-body-secondary">Last updated ${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Unknown'}</small></p>
      </div>
    </div>
  </div>
`;

card.innerHTML = cardContent;
    main.appendChild(card);
  });
}
      





