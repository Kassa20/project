
function arrowLogic() {
    const arrows = document.querySelectorAll(".arrow");
    const movieLists = document.querySelectorAll(".movie-list")

    arrows.forEach((arrow, i) => {
        const itemNumber = movieLists[i].querySelectorAll(".card").length;
        console.log(itemNumber);
        let clickCounter = 0;
        arrow.addEventListener("click", () => {
            clickCounter++;
            if (itemNumber - (3 + clickCounter) > 0) {
                movieLists[i].style.transform = `translateX(${
                    movieLists[i].computedStyleMap().get("transform")[0].x.value - 300}px)`
            }
            else {
                movieLists[i].style.transform = "translateX(0)";
                clickCounter = 0;
            }
        })
    })
}



const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJiMDE3MzNlMjZiOGViZGFmYjg3NWY3NzMxYmQyMSIsIm5iZiI6MTc2ODEwNzUyMC4xMTEsInN1YiI6IjY5NjMyZTAwNjg3YTM5ODc0YTE3MWI4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lfngcNeX3q8L7U1YZlDlQeZ766J5XdLP83kPH_cNt78'
  }
};



//Trending
fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  .then(res => res.json())
  .then(data => {

    const list = data.results;
    list.map((item) => {
        const title = item.original_title;
        const rating = item.vote_average;
        const poster = item.poster_path;
        const movie = `<div class="card" style="background-image: url(https://image.tmdb.org/t/p/w500${poster});">
                            <span class="title gloss">${title}</span>
                            <span class="rating gloss"><i class="fa-solid fa-star"></i>${Math.round(rating * 10) / 10}/10</span>
                        </div>`
        document.getElementById("featured").innerHTML += movie;
    })

    arrowLogic();

  })
  .catch(err => console.error(err));


fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(res => res.json())
  .then(data => {

    const list = data.results;
    list.map((item) => {
        const title = item.original_title;
        const rating = item.vote_average;
        const poster = item.poster_path;
        const movie = `<div class="card" style="background-image: url(https://image.tmdb.org/t/p/w500${poster});">
                            <span class="title gloss">${title}</span>
                            <span class="rating gloss"><i class="fa-solid fa-star"></i>${Math.round(rating * 10) / 10}/10</span>
                        </div>`
        document.getElementById("top").innerHTML += movie;
    })
        
    arrowLogic();

  })
  .catch(err => console.error(err));


// TV-top
fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
  .then(res => res.json())
  .then(data => {

    const list = data.results;
    list.map((item) => {
        const title = item.original_name;
        const rating = item.vote_average;
        const poster = item.poster_path;
        const movie = `<div class="card" style="background-image: url(https://image.tmdb.org/t/p/w500${poster});">
                            <span class="title gloss">${title}</span>
                            <span class="rating gloss"><i class="fa-solid fa-star"></i>${Math.round(rating * 10) / 10}/10</span>
                        </div>`
        document.getElementById("tv").innerHTML += movie;
    })
        
    arrowLogic();

  })
  .catch(err => console.error(err));



const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJiMDE3MzNlMjZiOGViZGFmYjg3NWY3NzMxYmQyMSIsIm5iZiI6MTc2ODEwNzUyMC4xMTEsInN1YiI6IjY5NjMyZTAwNjg3YTM5ODc0YTE3MWI4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lfngcNeX3q8L7U1YZlDlQeZ766J5XdLP83kPH_cNt78'
// search

const input = document.querySelector(".search-input")
const button = document.getElementById("search-button")
const container = document.querySelector(".search-result-container")

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
})

button.addEventListener("click", async () => {
    const query = input.value.trim();
    if(!query) return;

    try {
        const url = `https://api.themoviedb.org/3/search/movie?` + `query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;

        const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: TOKEN,
                        "Content-Type": "application/json",
                     },
        });

        if(!res.ok) {
            const text = await res.text();
            throw new Error(`TMDB error`);
        }

        const data = await res.json();
        renderMovies(data.results ?? []);

    } catch (err) {
        console.log(err);
    }
    
});


function renderMovies(movies) {
  container.innerHTML = "";

  movies.slice(0, 12).forEach((m) => {
    const posterUrl = m.poster_path
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
      : "images/nopicture.gif";

    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="search-item">
        <img class="search-image" src="${posterUrl}" alt="" />
        <span class="search-title gloss">${m.title}</span>
        <span class="search-rating gloss">${m.vote_average.toFixed(1) ?? "N/A"}/10</span>
        </div>
      `
    );
  });
}