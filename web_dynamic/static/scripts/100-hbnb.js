window.onload = () => {
  const checkAmenity = {};
  const checkState = {};
  const checkCity = {};
  $('.amenities input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        checkAmenity[this.dataset.id] = this.dataset.name;
        $('div.amenities h4').text(Object.values(checkAmenity).join(', '));
      } else {
        delete checkAmenity[this.dataset.id];
        $('div.amenities h4').text(Object.values(checkAmenity).join(', '));
      }
    }
  );
  $('.check_state').change(
    function () {
      if ($(this).is(':checked')) {
        checkState[this.dataset.id] = this.dataset.name;
        $('div.locations h4').text(Object.values(checkState).join(', '));
      } else {
        delete checkState[this.dataset.id];
        $('div.locations h4').text(Object.values(checkState).join(', '));
      }
    });
  $('.check_city').change(
    function () {
      if ($(this).is(':checked')) {
        checkCity[this.dataset.id] = this.dataset.name;
        $('div.locations h4').text(Object.values(checkCity).join(', '));
      } else {
        delete checkCity[this.dataset.id];
        $('div.locations h4').text(Object.values(checkCity).join(', '));
      }
    });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status) {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  requestPlaces(checkAmenity);
  $('button').on('click', () => {
    requestPlace(checkState, checkCity, checkAmenity);
  });
};

function showPlaces (data) {
  $('section.places').empty();
  data.forEach(place => {
    const item = $('<article></article>');

    const titleBox = $('<div class="title_box"></div>');
    titleBox.append('<h2>' + place.name + '</h2>');
    titleBox.append('<div class="price_by_night">' + place.price_by_night + '</div>');

    const information = $('<div class="information"></div>');
    information.append('<div class="max_guest">' + place.max_guest + ' Guests</div>');
    information.append('<div class="number_rooms">' + place.number_rooms + ' Bedrooms</div>');
    information.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathrooms</div');

    const user = $('<div class="user"></div>');
    user.append('<b>Owner</b>');
    const description = $('<div class="description"></div>');
    description.append(place.description);

    item.append(titleBox, information, user, description);
    $('section.places').append(item);
  });
}

function requestPlaces (dataFilters) {
  const listAmenities = {};
  listAmenities.amenities = Object.keys(dataFilters);
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify(listAmenities),
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    success: (data) => {
      showPlaces(data);
    }
  });
}

function requestPlace (checkState, checkCity, checkAmenity) {
  const listCheckAll = {};
  listCheckAll.amenities = Object.keys(checkAmenity);
  listCheckAll.states = Object.keys(checkState);
  listCheckAll.cities = Object.keys(checkCity);

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify(listCheckAll),
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    success: (data) => {
      showPlaces(data);
    }
  });
}
