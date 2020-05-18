window.onload = () => {
  let checkAmenity = {}
  $('input:checkbox').change(
    function(){
        if ($(this).is(':checked')) {
          checkAmenity[this.dataset.id] = this.dataset.name;
          $('div.amenities h4').text(Object.values(checkAmenity).join(', '));
        } else {
          delete checkAmenity[this.dataset.id];
          $('div.amenities h4').text(Object.values(checkAmenity).join(', '));
        }
    });
  $.get('http://localhost:5001/api/v1/status/', function (data) {
      if (data.status) {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  requestPlaces(checkAmenity);

  $('button').on('click', () => {
    requestPlaces(checkAmenity);
  });
};

function showPlaces(data) {
  data.forEach(place => {
    let item = $('<article></article>');

    let titleBox = $('<div class="title_box"></div>');
    titleBox.append('<h2>' + place.name + '</h2>');
    titleBox.append('<div class="price_by_night">' + place.price_by_night + '</div>');

    let information = $('<div class="information"></div>');
    information.append('<div class="max_guest">'+ place.max_guest + ' Guests</div>');
    information.append('<div class="number_rooms">'+ place.number_rooms + ' Bedrooms</div>');
    information.append('<div class="number_bathrooms">'+ place.number_bathrooms + ' Bathrooms</div');

    let user = $('<div class="user"></div>');
    user.append('<b>Owner</b>');
    let description = $('<div class="description"></div>');
    description.append(place.description);

    item.append(titleBox, information, user, description);
    $('section.places').append(item);
});
};
function requestPlaces(dataFilters=checkAmenity) {
  let listAmenities = {};
  listAmenities['amenities'] = Object.keys(dataFilters);
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify(listAmenities),
    headers: {
      "Content-Type": 'application/json'
    },
    dataType: 'json',
    success: (data) => {
      showPlaces(data);
    }
  });
};
