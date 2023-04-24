/* Formatting function for row details - modify as you need */
function format(d) {
  // `d` is the original data object for the row
  return (
        '<table cellpadding="5" cellspacing="0" border="0" style="width:100%">' +
        '<tr>' +
        '<td>Author name:</td>' +
        '<td>' +
        d.author_name +
        '</td>' +
        '<td>Lived from:</td>' +
        '<td>' +
        d.author_lived_from +
        '</td>' +
        '<td>Lived until:</td>' +
        '<td>' +
        d.author_lived_until +
        '</td>' +
        '<td>Lived in:</td>' +
        '<td>' +
        d.author_lived_in +
        '</td>' +
        '</tr>' +
        
        '<tr>' +
        '<td>Source name:</td>' +
        '<td>' +
        d.source_name +
        '</td>' +
        '<td>Written from:</td>' +
        '<td>' +
        d.source_written_from +
        '</td>' +
        '<td>Written until:</td>' +
        '<td>' +
        d.source_written_until +
        '</td>' +
        '<td>Written in:</td>' +
        '<td>' +
        d.source_written_in +
        '</td>' +
        '</tr>' +
        
        '<tr>' +
        '<td>Source reference:</td>' +
        '<td>' +
        d.source_reference + ', p. ' + d.source_reference_page + 
        '</td>' +
        '<td>Translation:</td>' +
        '<td>' +
        d.translation +
        '</td>' +
        '<td>Translation reference:</td>' +
        '<td>' +
        d.translation_reference + ', p. ' + d.translation_reference_page + 
        '</td>' +
        '<td>Publication status:</td>' +
        '<td>' +
        d.publication_status +
        '</td>' +
        '</tr>' +
        
        '<tr>' +
        '<td>Source genre:</td>' +
        '<td>' +
        d.source_genre + 
        '</td>' +
        '<td>Context from:</td>' +
        '<td>' +
        d.source_context_from +
        '</td>' +
        '<td>Context until:</td>' +
        '<td>' +
        d.source_context_until +
        '</td>' +
        '<td>////</td>' +
        '<td>' +
        d.undefined +
        '</td>' +
        '</tr>' +
        
        '<tr>' +
        '<td>Further links:</td>' +
        '<td>' +
        d.further_links + 
        '</td>' +
        '<td>Notes:</td>' +
        '<td>' +
        d.notes +
        '</td>' +
        '<td>Trade from</td>' +
        '<td>' +
        d.trade_from +
        '</td>' +
        '<td>////</td>' +
        '<td>' +
        d.trade_to +
        '</td>' +
        '</tr>' +
        
        '</table>'
    );
}




$(document).ready(function () {
      
    
    // Create DataTable
    var table = $('#example').DataTable({
        "ajax": 'https://raw.githubusercontent.com/Historical-Matrix-Online/Historical-Matrix-Online.github.io/main/environment-trade/data/merged.json',
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
            { data: 'event_start', title: 'Event start' },
            { data: 'source_state', title: 'Source state' },
            { data: 'keywords', title: 'Keywords' },
            { data: 'source_quote', title: 'Source quote' },
            { data: 'contemporaneity', title: 'Contemporaneity' },
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
