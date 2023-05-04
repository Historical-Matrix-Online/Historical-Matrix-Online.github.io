/* Formatting function for row details - modify as you need */
function format(d) {
  // `d` is the original data object for the row
  return (
  	'<div class="row childrow">' +
    'Source reference: '+ d.source_reference + ' ' + d.source_reference_page +
    '</div>' + 
    '<div class="row childrow bg-light">' +
    '<div class="col-sm-4">' + 
    'Event start: '+ d.event_start +
    '</div>' + 
    '<div class="col-sm-4">' + 
    'Event end: '+ d.event_end +
    '</div>' + 
    '<div class="col-sm-4">' + 
    'Season: '+ d.season +
    '</div>' + 
    '</div>' + 
  	'<div class="row childrow">' +
    'Publication status: '+ d.publication_status +
    '</div>' + 
    '<div class="row childrow bg-light">' +
    'Trade: '+ d.trade_from + ' -' + d.trade_to +
    '</div>' + 
    '<div class="row">'+
    '<div class="col-sm-6">' +
   	'Author name: '+ d.author_name + 
    '<br>' +
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
    'Source environment: '+ d.source_environment + 
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
      {
        data: 'season',
        title: 'Season'
      },
      {
        data: 'author_name',
        title: 'Author name'
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
      {
        target: 9,
        visible: false,
      },
      {
        target: 10,
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
      'copy', 'csv', 'excel', 'pdf', 
      {
                extend: 'print',
                text: 'Print all',
                exportOptions: {
                    modifier: {
                        selected: null
                    }
                }
            },
            {
                extend: 'print',
                text: 'Print selected'
            }
        ],
        select: true
      
  });
  
  
  

  
  
  
  ///////////// ROW SELECTION
  $(document).ready(function () {
    var table = $('#example').DataTable();
 
    $('#example tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });
 
    $('#button').click(function () {
        alert(table.rows('.selected').data().length + ' row(s) selected');
    });
});

  /////////////CHECKBOXES

  $('input:checkbox').on('change', function() {
    //filter keywords
    var checkbox_keywords = $('input:checkbox[name="key"]:checked').map(function() {
      return this.value;
    }).get().join('|');
    
    table.column(3).search(checkbox_keywords, true, false, false).draw(false);

   //filter source genre
   var checkbox_genre = $('input:checkbox[name="genre"]:checked').map(function() {
     return this.value;
   }).get().join('|');
   
   table.column(8).search(checkbox_genre, true, false, false).draw(false);
   
   //filter publication status
   var checkbox_publication = $('input:checkbox[name="pub"]:checked').map(function() {
     return this.value;
   }).get().join('|');
   
   table.column(7).search(checkbox_publication, true, false, false).draw(false);

   //filter contemporaneity
   var checkbox_contemporaneity = $('input:checkbox[name="contemp"]:checked').map(function() {
     return this.value;
   }).get().join('|');
   
   table.column(5).search(checkbox_contemporaneity, true, false, false).draw(false);
   
   //filter season
   var checkbox_season = $('input:checkbox[name="season"]:checked').map(function() {
     return this.value;
   }).get().join('|');
   
   table.column(9).search(checkbox_season, true, false, false).draw(false);




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





 ///////////////////////////////////// CHARTS
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
      type: 'pie',
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
  var container3 = $('<div/>').insertBefore("chart_author_name");

  var chart3 = Highcharts.chart(container3[0], {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Author name count',
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
      type: 'pie',
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
  
   ////////////////////// CHART5-PART1

  // Create the chart with initial data
  var container5 = $('<div/>').insertBefore("chart_season");

  var chart5 = Highcharts.chart(container5[0], {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Season count',
    },
    series: [{
      data: chartData3(table),
    }, ],
  });

  // On each draw, update the data in the chart
  table.on('draw', function() {
    chart5.series[0].setData(chartData5(table));
  });
  
     ////////////////////// CHART6-PART1

  // Create the chart with initial data
  var container6 = $('<div/>').insertBefore("chart_keywords");

  var chart6 = Highcharts.chart(container6[0], {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Keywords count',
    },
    series: [{
      data: chartData3(table),
    }, ],
  });

  // On each draw, update the data in the chart
  table.on('draw', function() {
    chart6.series[0].setData(chartData6(table));
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
    .column(8, {
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
    .column(10, {
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
    .column(7, {
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

////////////////////// CHART5-PART2

function chartData5(table) {
  var counts = {
"spring": 0,
"summer": 0,
"autumn": 0,
"winter": 0,
"not specified": 0
};

// Count the number of entries for each position
table
    .column(9, { search: 'applied' })
    .data()
    .each(function (val) {
        if (val.includes("spring")) {
            counts["spring"] += 1;
        } 
        if (val.includes("summer")) {
            counts["summer"] += 1;
        }
        if (val.includes("autumn")) {
            counts["autumn"] += 1;
        }
        if (val.includes("winter")) {
            counts["winter"] += 1;
        }
        if (val.includes("not specified")) {
            counts["not specified"] += 1;
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

////////////////////// CHART6-PART2

function chartData6(table) {
 var counts = {
"mild": 0,
"cold": 0,
"hot": 0,

"hail": 0,
"thunder": 0,
"storm": 0,
"wind": 0,

"moisture": 0,
"rain": 0,
"flood": 0,
"drought": 0,
"frost": 0,
"snow": 0,
"ice (in general)": 0,
"frozen river / lake / sea": 0,

"earthquake": 0,
"earth fissure": 0,
"tsunami": 0,
"vulcanic eruption": 0,

"comet / meteor / shooting star": 0,
"planet conjunction": 0,
"mock sun": 0,
"lunar or solar eclipse (not defined)": 0,
"solar eclipse": 0,
"lunar eclipse": 0,
"anomaly of the moon": 0,
"red sky": 0,
"blue sky": 0,
"dark sky / cloudy": 0,
"sunny": 0,
"air pollution": 0,
"miracle / omen": 0,
"bloody rain": 0,
"bloody snow": 0,

"disease (in general)": 0,
"zoonotic disease not defined & symptoms not stated": 0,
"zoonotic disease with description of symptoms": 0,
"human disease not defined & symptoms not stated": 0,
"human disease with description of symptoms": 0,

"great fertility": 0,
"insects": 0,
"crop failure (in general)": 0,
"grain damage": 0,
"bean damage": 0,
"rice damage": 0,
"herb damage": 0,
"vegetables damage": 0,
"tree damage (in general)": 0,
"fruit damage": 0,
"vinery damage": 0,
"olive tree damage": 0,
"fig tree damage": 0,
"pine tree damage": 0,
"vine blossom": 0,
"cherry blossom": 0,
"plum blossom": 0,

"trade activity (in general)": 0,
"grain export": 0,
"grain import": 0,
"price gauging": 0,
"price mentioned (in general)": 0,
"price increase": 0,
"price decrease": 0,
"infrastructure damage": 0,

"fire without specific location": 0,
"fire with specific location": 0,

"famine": 0,
"cannibalism": 0,
"food riot": 0,
"robbery": 0,
"piratry": 0,
"alcohol ban": 0,
"luxury ban": 0,
"alm": 0,
"offering": 0,
"supplication": 0,

"mortality (in general)": 0,
"zoonotic mortality without numeric data": 0,
"zoonotic mortality with numeric data": 0,
"human mortality without numeric data": 0,
"human mortality with numeric data": 0
};

// Count the number of entries for each position
table
    .column(3, { search: 'applied' })
    .data()
    .each(function (val) {
        if (val.includes("mild")) {
            counts["mild"] += 1;
        } 
        if (val.includes("cold")) {
            counts["cold"] += 1;
        }
        if (val.includes("hot")) {
            counts["hot"] += 1;
        }
        
        if (val.includes("hail")) {
            counts["hail"] += 1;
        }
        if (val.includes("thunder")) {
            counts["thunder"] += 1;
        }
        if (val.includes("storm")) {
            counts["storm"] += 1;
        }
        if (val.includes("wind")) {
            counts["wind"] += 1;
        }
        
        if (val.includes("moisture")) {
            counts["moisture"] += 1;
        }
        if (val.includes("rain")) {
            counts["rain"] += 1;
        }
        if (val.includes("flood")) {
            counts["flood"] += 1;
        }
        if (val.includes("drought")) {
            counts["drought"] += 1;
        }
        if (val.includes("frost")) {
            counts["frost"] += 1;
        }
        if (val.includes("snow")) {
            counts["snow"] += 1;
        }
        if (val.includes("ice (in general)")) {
            counts["ice (in general)"] += 1;
        }
        if (val.includes("frozen river / lake / sea")) {
            counts["frozen river / lake / sea"] += 1;
        }
        
        if (val.includes("earthquake")) {
            counts["earthquake"] += 1;
        }
        if (val.includes("earth fissure")) {
            counts["earth fissure"] += 1;
        }
        if (val.includes("tsunami")) {
            counts["tsunami"] += 1;
        }
        if (val.includes("vulcanic eruption")) {
            counts["vulcanic eruption"] += 1;
        }
        
        if (val.includes("comet / meteor / shooting star")) {
            counts["comet / meteor / shooting star"] += 1;
        }
        if (val.includes("planet conjunction")) {
            counts["planet conjunction"] += 1;
        }
        if (val.includes("mock sun")) {
            counts["mock sun"] += 1;
        }
        if (val.includes("lunar or solar eclipse (not defined)")) {
            counts["lunar or solar eclipse (not defined)"] += 1;
        }
        if (val.includes("solar eclipse")) {
            counts["solar eclipse"] += 1;
        }
        if (val.includes("lunar eclipse")) {
            counts["lunar eclipse"] += 1;
        }
        if (val.includes("anomaly of the moon")) {
            counts["anomaly of the moon"] += 1;
        }
        if (val.includes("red sky")) {
            counts["red sky"] += 1;
        }
        if (val.includes("blue sky")) {
            counts["blue sky"] += 1;
        }
        if (val.includes("dark sky / cloudy")) {
            counts["dark sky / cloudy"] += 1;
        }
        if (val.includes("sunny")) {
            counts["sunny"] += 1;
        }
        if (val.includes("air pollution")) {
            counts["air pollution"] += 1;
        }
        if (val.includes("miracle / omen")) {
            counts["miracle / omen"] += 1;
        }
        if (val.includes("air pollution")) {
            counts["air pollution"] += 1;
        }
        if (val.includes("apocalyptic flood")) {
            counts["apocalyptic flood"] += 1;
        }
        if (val.includes("bloody rain")) {
            counts["bloody rain"] += 1;
        }
        if (val.includes("bloody snow")) {
            counts["bloody snow"] += 1;
        }
        
        
        if (val.includes("disease (in general)")) {
            counts["disease (in general)"] += 1;
        }
        if (val.includes("zoonotic disease not defined & symptoms not stated")) {
            counts["zoonotic disease not defined & symptoms not stated"] += 1;
        }
        if (val.includes("zoonotic disease with description of symptoms")) {
            counts["zoonotic disease with description of symptoms"] += 1;
        }
        if (val.includes("human disease not defined & symptoms not stated")) {
            counts["human disease not defined & symptoms not stated"] += 1;
        }
        if (val.includes("human disease with description of symptoms")) {
            counts["human disease with description of symptoms"] += 1;
        }
        
        if (val.includes("great fertility")) {
            counts["great fertility"] += 1;
        }
        if (val.includes("insects")) {
            counts["insects"] += 1;
        }
        if (val.includes("crop failure (in general)")) {
            counts["crop failure (in general)"] += 1;
        }
        if (val.includes("grain damage")) {
            counts["grain damage"] += 1;
        }
        if (val.includes("bean damage")) {
            counts["bean damage"] += 1;
        }
        if (val.includes("rice damage")) {
            counts["rice damage"] += 1;
        }
        if (val.includes("herb damage")) {
            counts["herb damage"] += 1;
        }
        if (val.includes("vegetables damage")) {
            counts["vegetables damage"] += 1;
        }
        if (val.includes("tree damage (in general)")) {
            counts["tree damage (in general)"] += 1;
        }
        if (val.includes("fruit damage")) {
            counts["fruit damage"] += 1;
        }
        if (val.includes("vinery damage")) {
            counts["vinery damage"] += 1;
        }
        if (val.includes("olive tree damage")) {
            counts["olive tree damage"] += 1;
        }
        if (val.includes("fig tree damage")) {
            counts["fig tree damage"] += 1;
        }
        if (val.includes("pine tree damage")) {
            counts["pine tree damage"] += 1;
        }
        if (val.includes("vine blossom")) {
            counts["vine blossom"] += 1;
        }
        if (val.includes("cherry blossom")) {
            counts["cherry blossom"] += 1;
        }
        if (val.includes("plum blossom")) {
            counts["plum blossom"] += 1;
        }
        
        if (val.includes("trade activity (in general)")) {
            counts["trade activity (in general)"] += 1;
        }
        if (val.includes("grain export")) {
            counts["grain import"] += 1;
        }
        if (val.includes("price gauging")) {
            counts["price gauging"] += 1;
        }
        if (val.includes("price mentioned (in general)")) {
            counts["price mentioned (in general)"] += 1;
        }
        if (val.includes("price increase")) {
            counts["price increase"] += 1;
        }
        if (val.includes("price decrease")) {
            counts["price decrease"] += 1;
        }
        if (val.includes("famine")) {
            counts["famine"] += 1;
        }
        if (val.includes("cannibalism")) {
            counts["cannibalism"] += 1;
        }
        if (val.includes("food riot")) {
            counts["food riot"] += 1;
        }
        if (val.includes("robbery")) {
            counts["robbery"] += 1;
        }
        if (val.includes("piratry")) {
            counts["piratry"] += 1;
        }
        if (val.includes("alcohol ban")) {
            counts["alcohol ban"] += 1;
        }
        if (val.includes("luxury ban")) {
            counts["luxury ban"] += 1;
        }
        if (val.includes("alm")) {
            counts["alm"] += 1;
        }
        if (val.includes("offering")) {
            counts["offering"] += 1;
        }
        if (val.includes("supplication")) {
            counts["supplication"] += 1;
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



