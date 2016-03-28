$(document).ready(function () {

  $.get("/data/agencies/https.json", function(data) {
    renderTable(data.data);
  });

  var percentBar = function(field) {
    return function(data, type, row) {
      if (type == "sort")
        return null;
      return Utils.progressBar(Utils.percent(
        row.https[field], row.https.eligible
      ));
    };
  }

  var renderTable = function(data) {
    $("table").DataTable({
      responsive: true,
      initComplete: Utils.searchLinks,

      data: data,

      columns: [
        {data: "name"},
        {
          data: "https.eligible",
          render: Utils.filterAgency("accessibility")
        },
        {data: "https.uses"},
        {data: "https.enforces"},
        {data: "https.hsts"},
        {data: "https.grade"},
        {data: "https.uses"}
      ],

      // order by number of domains
      order: [[1, "desc"]],

      columnDefs: [
        {
          targets: 0,
          cellType: "td",
          createdCell: function (td) {
            td.scope = "row";
          }
        }
      ],

      "oLanguage": {
        "sSearch": "Suche:",
        "sLengthMenu": "Zeige _MENU_ Einträge",
        "sInfo": "Zeige _START_ - _END_ von _TOTAL_ Einträgen",
        "sInfoFiltered": "(von insgesamt _MAX_ Einträgen)",
        "oPaginate": {
          "sPrevious": "<<",
          "sNext": ">>"
        }
      },

      dom: 'Lftrip'

    });
  };

});
