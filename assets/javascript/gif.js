//My arrays for the beginning of my cars listed
var cars = ['porsche', 'lamborghini', 'aston martin', 'ferrari'];

//The functions begins

$(document).ready(function () {

  //I append my first cars listed
  renderButtons();

  //calling AJAX functions
  $(document).on('click', '.car_button', displayCarGif);
  $(document).on('click', '.gif_container', showGifHideImage);

  //appending the buttons to the document
  function renderButtons() {

    //Deletes any previous button that are the same
    $('#car_buttons').empty();

    //loops thru my list of cars
    for (var i = 0; i < cars.length; i++) {

      //then it creats a button already listed
      var carButton = $('<button>');
      carButton.addClass('car_button');//class added
      carButton.attr('data-name', cars[i]);//added a data attr
      carButton.text(cars[i]);//providing the first button text
      $('#car_buttons').append(carButton);//adding the button to the html
    }
  }

  //adding new cars from the user
  $('#add_car').on('click', function () {

    //grabbing the input from the textbox
    var newcar = $('#car_input').val().trim().toLowerCase();


    //validating user Input
    var isUnigue = true;
    for (var i = 0; i < cars.length; i++) {
      if (cars[i] == newcar) {
        isUnique = false;
      }
    }

    //append new button if the input is isUnique
    if (newcar == '') {
      alert('Sorry. No empty buttons allowed!');
    } else if (isUnigue) {

      //add the new car to the original listed
      cars.push(newcar);


      // adding the new buttons to the document
      renderButtons();
    } else {
      alert('You already have a ' + newcar + 'button!');
    }


    //Remove the default features of the submit button
    return false;
  });

  //collect gifs from the giphy and it will display to the DOM when you submit
  function displayCarGif() {

    //Deletesold gifs
    $('#car_images').empty();

    //Collect car name from the data attr from the button,replacing any spaces
    var car = $(this).attr('data-name').replace(/ /g, '+');

    //creating the url
    var key = 'NdhUEVbkbMw5RozldOGbb1uFHtCtTZMt'; //my key
    var limit = '5'; //my limit api key
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + car + '&limit=' + limit + '&api_key=' + key;

    //creates ajax call for the specific car button that is clicked
    $.ajax({ url: queryURL, method: 'GET' }).done(function (response) {

      //loop through the json output to collect each car
      for (var i = 0; i < response.data.length; i++) {

        //collect the car gif URLs
        var stillURL = response.data[i].images.fixed_height_still.url;//for the sill car_images
        var movingURL = response.data[i].images.fixed_height.url;//dif while movingURL

        //collects the cars rating
        var cRating = response.data[i].rating;

        //correcting fot the empty rating
        if (cRating == '') {
          cRating = 'none';
        }

        //creates a div to place the gif in replace
        var GifDiv = $('<div>');
        GifDiv.addClass('gif_container'); //added the class
        GifDiv.attr('data-name', 'unclicked');//adding data to the attr unclicked

        //appending ratings to current gifs
        var GifRating = $('<h1>');
        GifRating.text('Rating: ' + cRating);
        GifDiv.append(GifRating);

        //appending the still images
        var GifImages = $('<img>');
        GifImages.addClass('still_gif'); // added the class for the still gifs
        GifImages.attr('src', stillURL);
        GifDiv.append(GifImages);

        //appending the moving  givs
        var Gifs = $('<img>');
        Gifs.addClass('moving_gif'); //added a class for the animation
        Gifs.attr('src', movingURL);
        Gifs.hide(); //hide the moving gif
        GifDiv.append(Gifs);

        //append current div to the DOM
        $('#car_images').append(GifDiv);
      }
    });

  }

  //Displaying the moving gifs and hiding the still images
  function showGifHideImage() {

    //this will determine when the gif are unclicked
    var clickTest = $(this).attr('data-name');

    //gif are not clicked yet hide the still iamages and display the moving done
    if (clickTest == 'unclicked') {
      var gifChildren = $(this).children();

      //hide the still images
      $(gifChildren[1]).hide();

      //displaying the moving iamages
      $(gifChildren[2]).show();

      $(this).attr('data-name', 'clicked');

    }

  //gif was already clicked hide the moving image &show the still images
    else {

      var gifChildren = $(this).children();

      //hide the moving iamages
      $(gifChildren[2]).hide();

      //display the still iamage
      $(gifChildren[1]).show();

      //change daata name to unclicked
      $(this).attr('data-name', 'unclicked');

    }

  }

});
