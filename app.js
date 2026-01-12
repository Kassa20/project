
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

    // arrowLogic();

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
        
    // arrowLogic();

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


// search
fetch('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));