window.onload = () => {
  const checkAmenity = {};
  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        checkAmenity[this.dataset.id] = this.dataset.name;
        $('div.amenities h4').text(Object.values(checkAmenity).sort().join(', '));
      } else {
        delete checkAmenity[this.dataset.id];
        $('div.amenities h4').text(Object.values(checkAmenity).sort().join(', '));
      }
    });
};
