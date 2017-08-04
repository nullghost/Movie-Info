
function getdefault(){
  document.getElementById("Popular").classList.add('active');
  document.getElementById("rated").classList.remove('active');
  document.getElementById("latest").classList.remove('active');
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&sort_by=popularity.desc')
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = "<h3>Most Popular</h3></br>";
      $.each(movies, (index, movie) => {
        output += `

          <div class="col-md-3 col-xs-12 movie-result">
            <div class="well text-center">
              <img src="http://image.tmdb.org/t/p/w185//${movie.poster_path}" onerror="this.onerror=null;this.src='poster-not-found.png';">
              <h5>${movie.original_title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getTopRated(){
  document.getElementById("Popular").classList.remove('active');
  document.getElementById("latest").classList.remove('active');
  document.getElementById("rated").classList.add('active');
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&certification=R&sort_by=vote_average.desc')
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = "<h3>Top Rated</h3></br>";
      $.each(movies, (index, movie) => {
        output += `

          <div class="col-md-3 col-xs-12 movie-result">
            <div class="well text-center">
              <img src="http://image.tmdb.org/t/p/w185//${movie.poster_path}" onerror="this.onerror=null;this.src='poster-not-found.png';">
              <h5>${movie.original_title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getlatest(){
  document.getElementById("Popular").classList.remove('active');
  document.getElementById("rated").classList.remove('active');
  document.getElementById("latest").classList.add('active');
  axios.get('https://api.themoviedb.org/3/discover/movie?api_key=fa155f635119344d33fcb84fb807649b&primary_release_date.gte=2017-08-10&primary_release_date.lte=2017-08-15')
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = "<h3>Top Rated</h3></br>";
      $.each(movies, (index, movie) => {
        output += `

          <div class="col-md-3 col-xs-12 movie-result">
            <div class="well text-center">
              <img src="http://image.tmdb.org/t/p/w185//${movie.poster_path}" onerror="this.onerror=null;this.src='poster-not-found.png';">
              <h5>${movie.original_title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}


$(document).ready(() => {

  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    $('#movies').html(`<div class="col-md-8 col-md-offset-2 text-center">
                              <div class="well" style="background-color:#1b809e;color:#fff;">
                                  <h4>Searching....</h4>
                              </div>
                            </div>`
                            );
    if (searchText != '') {
      getMovies(searchText);
    }else{
      $('#movies').html(`<div class="col-md-8 col-md-offset-2 text-center">
                              <div class="well" style="background-color:#1b809e;color:#fff;">
                                  <h4 style="color:red">Please enter some data !!!</h4>
                              </div>
                            </div>`
                            );
    }
    
    e.preventDefault();
  });
});

function getMovies(searchText){


  axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src=" http://image.tmdb.org/t/p/w185//${movie.poster_path}" onerror="this.onerror=null;this.src='poster-not-found.png';">
              <h5>${movie.original_title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

       if ( movies.length > 0 ) {
          $('#movies').html(output);
      } else {
          $('#movies').html(`<div class="col-md-8 col-md-offset-2 text-center">
                              <div class="well" style="background-color:#1b809e;color:#fff;">
                                  <h4><strong>Sorry!</strong> Result for <span style="color:red" >"${searchText}"</span> not found!
                                </h4>
                              </div>
                            </div>`
                            );
      }


    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  $('#movie').html(`<h3>Searching .... </h3>`);
  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=fa155f635119344d33fcb84fb807649b')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let genre = '';
      let production_countries = '';
     for (var i = movie.genres.length - 1; i >= 0; i--) {
          genre +=  movie.genres[i].name+" ";
     };

     for (var i = movie.production_countries.length - 1; i >= 0; i--) {
          production_countries +=  movie.production_countries[i].name+" ";
     };

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="http://image.tmdb.org/t/p/w185//${movie.poster_path}" onerror="this.onerror=null;this.src='poster-not-found.png';" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <hr>
            <ul class="list-group" >
              <li class="list-group-item"><strong style="color:#fff">Genre:</strong> ${genre}.</li>
              <li class="list-group-item"><strong style="color:#fff">Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong style="color:#fff">Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong style="color:#fff">Language:</strong> ${movie.original_language}</li>
              <li class="list-group-item"><strong style="color:#fff">Country:</strong> ${production_countries}</li>
              <li class="list-group-item"><strong style="color:#fff">Time:</strong> ${movie.runtime} min</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
           <p class="lead">${movie.overview}</p>
           <a target="_blank" href="https://www.themoviedb.org/movie/${movie.id}-${movie.title}" class="btn btn-primary">Read More</a>
            <hr>
            
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary pull-right">View IMDB</a>
            <a href="index.html" class="btn btn-success">Go Back To Search</a>
          </div>
        </div>
      `;

      
          $('#movie').html(output);
     

    })
    .catch((err) => {
      console.log(err);
    });
}


