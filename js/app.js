$().ready(function(){

  var api = 'https://api.doughnuts.ga/doughnuts';

  // Appends to #doughnuts <ul> a new <li> elem
  function append_elem(elem) {
    var flavor = '<b>Flavor:</b> ' + elem.flavor;
    var style  = '<b>Style:</b> '  + elem.style;
    $('#doughnuts').append('<li>' + flavor + ' | ' + style + '</li>');
  }

  // As soon as the DOM is loaded, make an AJAX REQUEST!
  $.get(api)
    // When we get the data, execute this
    .done(function(doughnuts) {
      // Iterate through all our doughnuts
      doughnuts.forEach(function (doughnut) {
        // For each donut, append the information
        append_elem(doughnut);
      })
    })

    // Bind a new event to the form submission
    $('#new-doughnut').on('submit', function (e) {
      e.preventDefault();

      $.ajax(api,
        {
          method: 'POST',
          data: {
            flavor: $('#doughnut-flavor').val(),
            style:  $('#doughnut-style').val(),
          }
        })
        .done(function(doughnut) {
          append_elem(doughnut);
        })
        .error(function(err) {
          console.log("OHH NOOO!!!");
          console.log(err);
        })
    })

})
