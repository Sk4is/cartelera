const requestURL = "../json/movies.json";

async function fetchMoviesJson() {
  const response = await fetch(requestURL);
  const movies = await response.json();
  return movies;
}

fetchMoviesJson().then((movies) => {
  const moviesSection = document.getElementById("movieSection");
  const movieDetails = document.getElementById("movieDetails");
  const detailsContent = document.getElementById("detailsContent");
  const backButton = document.getElementById("backButton");
  const aboutUsButton = document.getElementById("aboutUsButton");
  const aboutUsSection = document.getElementById("aboutUsSection");
  const movieSectionCards = document.getElementById("movieSectionCards");

  movies.movies.forEach((movie) => {
    moviesSection.innerHTML += `
      <div class="card movie-card" data-id="${movie.id}">
        <img src="${movie.poster}" class="card-img-top" alt="${movie.title} poster">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-title"><span class="h6">${movie.year}</span> · ${movie.length}</p>
          <h6 class="card-title mb-4">${movie.director}</h6>
          <p class="card-text">${movie.synopsis}</p>
        </div>
      </div>
    `;
  });

  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", function () {
      const movieId = this.getAttribute("data-id");
      const movie = movies.movies.find((m) => m.id == movieId);
      showMovieDetails(movie);
    });
  });

  function showMovieDetails(movie) {
    moviesSection.classList.add("d-none");

    movieDetails.classList.remove("d-none");
    detailsContent.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title} poster" class="img-fluid mb-3">
      <h2>${movie.title} (${movie.year})</h2>
      <p><strong>Duración:</strong> ${movie.length}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Sinopsis:</strong> ${movie.synopsis}</p>
      <p><strong>Información Adicional:</strong> ${movie.details}</p>
    `;
  }

  backButton.addEventListener("click", () => {
    movieDetails.classList.add("d-none");
    moviesSection.classList.remove("d-none");
  });

  aboutUsButton.addEventListener("click", () => {
    moviesSection.classList.add("d-none");
    movieDetails.classList.add("d-none");
    aboutUsSection.classList.remove("d-none");
  });
});
