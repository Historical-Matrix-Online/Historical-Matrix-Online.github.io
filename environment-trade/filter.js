/* Formatting function for row details - modify as you need */
function format(d) {
  // `d` is the original data object for the row
  return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Author name:</td>' +
        '<td>' +
        d.extn +
        '</td>' +
        '<td>lived from:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>lived until:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>lived in:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Source name</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>Written from:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>Written until:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>Written in:</td>' +
        '<td>' +
        d.name +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Source reference:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>Translation:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>Translation reference:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '<td>12:</td>' +
        '<td>' +
        d.event_start +
        '</td>' +
        '</tr>' +
        '</table>'
    );
}


$(document).ready(function () {
      
    
    // Create DataTable
    var table = $('#example').DataTable({
        "ajax": 'https://raw.githubusercontent.com/Historical-Matrix-Online/Historical-Matrix-Online.github.io/main/testdata/testdata_historical2.txt',
    order: [
      [1, 'asc']
    ],
    columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { data: 'event_start' },
            { data: 'source_state' },
            { data: 'keywords' },
            { data: 'source_quote' },
            { data: 'contemporaneity' },
        ],
    dom: 'iBrtp',
    paging: true,
    ordering: true,
    info: true,
    "language": {
      "info": "Showing _TOTAL_ from _MAX_ entries",
      "infoFiltered": "",
      "infoEmpty": ""
    },
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
    });
    
    /////////////CHECKBOXES

$('input:checkbox').on('change', function () {
   //build a filter string with an or(|) condition
   var keywords = $('input:checkbox[name="key"]:checked').map(function() {
     return this.value;
   }).get().join('|');


   //now filter in column 2, with no regex, no smart filtering, not case sensitive
   table.column(3).search(keywords, true, false, false).draw(false);

 });
    
    
    ///////////////////////CHILD ROW
    
     // Add event listener for opening and closing details
  $('#example tbody').on('click', 'td.dt-control', function() {
    var tr = $(this).closest('tr');
    var row = table.row(tr);

    if (row.child.isShown()) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    } else {
      // Open this row
      row.child(format(row.data())).show();
      tr.addClass('shown');
    }
  });
  
  oTable = $('#example').DataTable();
  $('#custom_searchbox').keyup(function() {
    oTable.search($(this).val()).draw();
  })
    
    ////////////////////// CHART
 
    // Create the chart with initial data
    var container = $('<div/>').insertBefore(table.table().container());
 
    var chart = Highcharts.chart(container[0], {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Phenomena count',
        },
        series: [
            {
                data: chartData(table),
            },
        ],
    });
 
    // On each draw, update the data in the chart
    table.on('draw', function () {
        chart.series[0].setData(chartData(table));
    });
});
 
function chartData(table) {
    var counts = {};
 
    // Count the number of entries for each position
    table
        .column(3, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            } else {
                counts[val] = 1;
            }
        });
 
    // And map it to the format highcharts uses
    return $.map(counts, function (val, key) {
        return {
            name: key,
            y: val,
        };
    });  
    
}
