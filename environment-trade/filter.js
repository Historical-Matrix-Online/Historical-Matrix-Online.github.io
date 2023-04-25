/* Formatting function for row details - modify as you need */
function format(d) {
  // `d` is the original data object for the row
  return (
  	'<div class="row childrow">' +
    'Source reference: '+ d.source_reference + ' p.' + d.source_reference_page +
    '<br>' +
    'Publication status: '+ d.publication_status +
    '</div>' + 
    '<div class="row childrow bg-light">' +
    'Trade: '+ d.trade_from + ' -' + d.trade_to +
    '</div>' + 
    '<div class="row">'+
    '<div class="col-sm-6">' +
   	'Author name: '+ d.author_name + 
    '<br>' +
    'Author occupation: '+ d.author_occupation + 
    '<br>' +
    'Author lifespan: '+ d.author_lived_from + '-' + d.author_lived_until +
    '<br>' +
    '<br>' +
    'Author lived in: '+ d.author_lived_in +
    '</div>' +
    '<div class="col-sm-6">' + 
    'Source name: '+ d.source_name + 
    '<br>' +
    'Source genre: '+ d.source_genre + 
    '<br>' +
    'Source context: '+ d.source_context_from + '-' + d.source_context_until +
    '<br>' +
    'Source written: '+ d.source_written_from + '-' + d.source_written_until +
    '<br>' +
    'Source written in: '+ d.author_lived_in +
    '</div>' + 
    '</div>' + 
    '<div class="row childrow bg-light">' +
    'Translation: '+ d.translation + 
    '<br>' +
    'Translation reference: '+ d.translation_reference + d.translation_reference_page +
    '</div>' + 
    '<div class="row childrow">' +
    'Further links: '+ d.further_links +
    '<br>' +
    'Notes: '+ d.notes +
    '</div>'
  );
}




$(document).ready(function() {


  // Create DataTable
  var table = $('#example').DataTable({
    "ajax": 'https://raw.githubusercontent.com/Historical-Matrix-Online/Historical-Matrix-Online.github.io/main/environment-trade/data/merged.json',
    order: [
      [1, 'asc']
    ],
    columns: [{
        className: 'dt-control',
        orderable: false,
        data: null,
        defaultContent: '',
      },
      {
        data: 'event_start',
        title: 'Event start'
      },
      {
        data: 'source_state',
        title: 'Source state'
      },
      {
        data: 'keywords',
        title: 'Keywords'
      },
      {
        data: 'source_quote',
        title: 'Source quote'
      },
      {
        data: 'contemporaneity',
        title: 'Contemporaneity'
      },
      {
        data: 'source_name',
        title: 'Source name'
      },
      {
        data: 'publication_status',
        title: 'Publication status'
      },
      {
        data: 'source_genre',
        title: 'Source genre'
      },
    ],
    columnDefs: [{
        target: 6,
        visible: false,
      },
      {
        target: 7,
        visible: false,
      },
      {
        target: 8,
        visible: false,
      },
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

  $('input:checkbox').on('change', function() {
    //build a filter string with an or(|) condition
    var keywords = $('input:checkbox[name="key"]:checked').map(function() {
      return this.value;
    }).get().join('|');


    //now filter in column 2, with no regex, no smart filtering, not case sensitive
    table.column(8).search(keywords, true, false, false).draw(false);

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

  ////////////////////// CHART1-PART1

  // Create the chart with initial data
  var container1 = $('<div/>').insertBefore("chart_source_name");

  var chart1 = Highcharts.chart(container1[0], {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Source name count',
    },
    series: [{
      data: chartData1(table),
    }, ],
  });

  // On each draw, update the data in the chart
  table.on('draw', function() {
    chart1.series[0].setData(chartData1(table));
  });

  ////////////////////// CHART2-PART1

  // Create the chart with initial data
  var container2 = $('<div/>').insertBefore("chart_source_genre");

  var chart2 = Highcharts.chart(container2[0], {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Source genre count',
    },
    series: [{
      data: chartData2(table),
    }, ],
  });

  // On each draw, update the data in the chart
  table.on('draw', function() {
    chart2.series[0].setData(chartData2(table));
  });
  
    ////////////////////// CHART3-PART1

  // Create the chart with initial data
  var container3 = $('<div/>').insertBefore("chart_source_author");

  var chart3 = Highcharts.chart(container3[0], {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Source author count',
    },
    series: [{
      data: chartData3(table),
    }, ],
  });

  // On each draw, update the data in the chart
  table.on('draw', function() {
    chart3.series[0].setData(chartData3(table));
  });
  
   ////////////////////// CHART4-PART1

  // Create the chart with initial data
  var container4 = $('<div/>').insertBefore("chart_publication_status");

  var chart4 = Highcharts.chart(container4[0], {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Publication status count',
    },
    series: [{
      data: chartData4(table),
    }, ],
  });

  // On each draw, update the data in the chart
  table.on('draw', function() {
    chart4.series[0].setData(chartData4(table));
  });

////CHART-END

});

////////////////////// CHART1-PART2

function chartData1(table) {
  var counts = {};

  // Count the number of entries for each position
  table
    .column(6, {
      search: 'applied'
    })
    .data()
    .each(function(val) {
      if (counts[val]) {
        counts[val] += 1;
      } else {
        counts[val] = 1;
      }
    });

  // And map it to the format highcharts uses
  return $.map(counts, function(val, key) {
    return {
      name: key,
      y: val,
    };
  });
}


////////////////////// CHART2-PART2

function chartData2(table) {
  var counts = {};

  // Count the number of entries for each position
  table
    .column(6, {
      search: 'applied'
    })
    .data()
    .each(function(val) {
      if (counts[val]) {
        counts[val] += 1;
      } else {
        counts[val] = 1;
      }
    });

  // And map it to the format highcharts uses
  return $.map(counts, function(val, key) {
    return {
      name: key,
      y: val,
    };
  });
}

////////////////////// CHART3-PART2

function chartData3(table) {
  var counts = {};

  // Count the number of entries for each position
  table
    .column(6, {
      search: 'applied'
    })
    .data()
    .each(function(val) {
      if (counts[val]) {
        counts[val] += 1;
      } else {
        counts[val] = 1;
      }
    });

  // And map it to the format highcharts uses
  return $.map(counts, function(val, key) {
    return {
      name: key,
      y: val,
    };
  });
}

////////////////////// CHART4-PART2

function chartData4(table) {
  var counts = {};

  // Count the number of entries for each position
  table
    .column(6, {
      search: 'applied'
    })
    .data()
    .each(function(val) {
      if (counts[val]) {
        counts[val] += 1;
      } else {
        counts[val] = 1;
      }
    });

  // And map it to the format highcharts uses
  return $.map(counts, function(val, key) {
    return {
      name: key,
      y: val,
    };
  });
}
