document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".navbar-toggler");
  const menuContent = document.querySelector(".navbar-collapse");

  document.addEventListener("click", function (event) {
    if (
      !menuButton.contains(event.target) &&
      !menuContent.contains(event.target)
    ) {
      const isMenuOpen = menuButton.getAttribute("aria-expanded") === "true";
      if (isMenuOpen) {
        menuButton.click();
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchInput = document.querySelector(".form-control");
  const main = document.getElementById("main");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTerm = searchInput.value;

    // Construye la URL de la API de Google Books con el término de búsqueda
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchTerm
    )}`;

    // Realiza la solicitud a la API de Google Books
    fetch(url)
      .then((response) => response.json())
      .then((response) => displayBooks(response.items))
      .catch((error) => {
        console.log("Error al realizar la búsqueda:", error);
      });
  });

  function displayBooks(books) {
    main.innerHTML = "";

    if (books && books.length > 0) {
      books.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "mx-auto");

        const cardContent = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${
                book.volumeInfo.imageLinks?.thumbnail || "placeholder.jpg"
              }" class="img-fluid rounded-start card-img" alt="Book Cover">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${
                  book.volumeInfo.title || "Title not available"
                }</h5>
                <p class="card-text">${
                  book.volumeInfo.description || "Description not available"
                }</p>
                <p class="card-text"><small class="text-body-secondary">${
                  book.volumeInfo.publishedDate || "Unknown"
                }</small></p>
              </div>
            </div>
          </div>
        `;

        card.innerHTML = cardContent;
        main.appendChild(card);
      });
    } else {
      main.innerHTML = "<p>No se encontraron libros.</p>";
    }
  }
});

// Término de búsqueda para feminismo transinclusivo y queer
const searchInput = "feminismo transinclusivo queer";

// Construir la URL de la API con el término de búsqueda
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
  searchInput
)}`;

const main = document.getElementById("main");

fetch(url)
  .then((response) => response.json())
  .then((response) => printData(response.items))
  .catch((error) => {
    console.log("Error al hacer la solicitud:", error);
  });

function printData(books) {
  books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3", "mx-auto");

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
