window.onload = () => {
  const checkAmenity = {};
  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        checkAmenity[this.dataset.id] = this.dataset.name;
        $('div.amenities h4').text(Object.values(checkAmenity).join(', '));
      } else {
        delete checkAmenity[this.dataset.id];
        $('div.amenities h4').text(Object.values(checkAmenity).join(', '));
      }
    });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status) {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
};
