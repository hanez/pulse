$(function(){

  $('#menu-btn, .overlay, .sliding-panel-close').on('click touchstart',function (e) {
    $('#menu-content, .overlay').toggleClass('is-visible');

    if($('#menu-content').hasClass('is-visible')) {
      $('#menu-content a').attr('tabindex', '0');
    }
    else {
      $('#menu-content a').attr('tabindex', '-1');
    }

    e.preventDefault();
  });

  // if a datatable is searched, sync it to the URL hash
  $('table').on('search.dt', function(e, settings) {
    var query = $("input[type=search]").val();
    if (query)
      location.hash = QueryString.stringify({q: query});
    // TODO: Disabled because this callback runs on table init,
    // and zeroes out the location hash. Should be addressed.
    // else
    //   location.hash = '';
  });

  $('table').on('draw.dt', function() {
    // set max width on dataTable
    $(this).css('width', '100%');

    // add label for attribute for search
    $('.dataTables_filter label').attr('for', 'datatables-search');
    $('#DataTables_Table_0_filter').find('input[type="search"]').attr('id', 'datatables-search');
  });

});
