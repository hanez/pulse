$(document).ready(function () {

  var report_url = $('script[data-agency-report-url]').attr('data-agency-report-url');
  $.get(report_url, function(data) {
    renderTable(data.data);
  });

  var percentBar = function(field) {
    return function(data, type, row) {
      percent = Utils.percent(
        row.https[field], row.https.eligible
      );

      if (type == "sort")
        return percent;
      return Utils.progressBar(percent);
    };
  }

  var renderTable = function(data) {
    var table = $("table").DataTable({
      responsive: true,
      initComplete: Utils.searchLinks,

      data: data,

      columns: [
        {data: "name"},
        {
          data: "https.eligible",
          render: Utils.filterAgency("https")
        },
        {data: "https.uses"},
        {data: "https.enforces"},
        {data: "https.hsts"},
        //{data: "https.grade"}
      ],

      // order by number of domains
      order: [[1, "desc"]],

      columnDefs: [
        {
          targets: 0,
          cellType: "th",
          createdCell: function (td) {
            td.scope = "row";
          },
          width: "40%"
        },
        {
          targets: 1,
          width: "55px"
        },
        {
          render: percentBar("uses"),
          targets: 2,
        },
        {
          render: percentBar("enforces"),
          targets: 3,
        },
        {
          render: percentBar("hsts"),
          targets: 4,
        },
        /*{
          render: percentBar("grade"),
          targets: 5,
        }*/
      ],

      pageLength: 25,

      language: {
        search: "Suche:",
        lengthMenu: "Zeige _MENU_ Einträge",
        emptyTable: "Keine Daten in dieser Tabelle verfügbar",
        info: "Zeige _START_ - _END_ von _TOTAL_ Einträgen",
        infoEmpty: "Zeige 0 - 0 von 0 Einträgen",
        infoFiltered: "(von insgesamt _MAX_ Einträgen)",
        paginate: {
          previous: "<<",
          next: ">>"
        }
      },

      dom: 'Lftrip'

    });

    Utils.updatePagination();
    table.on("draw.dt",function(){
      Utils.updatePagination();
    });
  };

});
