var api_url = "http://cap-alerts.appspot.com/capquery_fake";

var currentTableView = null;
var currentLat = null;
var currentLon = null;

function wowIHateJSONP(r){
  Ti.API.info(r);
  data = [];
  for(var i=0; i < r.alerts.length; i++){
    var al = r.alerts[i];
    var row = Ti.UI.createTableViewRow({width:310, height: 'auto'});
    var viewBase = Ti.UI.createView({backgroundColor: '#000', width: 310, height: 'auto', top:0, left:0});
    for(var x = 0; x < al.info[0].category.length; x++){
      var icon = Ti.UI.createImageView({url: '../images/' + al.info[0].category[0].toLowerCase() + '.png', top: (x * 40), left: 0, width: 40, height: 60 });
      viewBase.add(icon);
    }
    var lbl = Ti.UI.createLabel({text: al.info[0].headline, width: 310 - 45, height: 'auto', left: 45});
    viewBase.add(lbl);
    row.add(viewBase);
    //data.push({title: al.info[0].headline});
    data.push(row);
  }
  tableView.setData(data);
}
function getAlerts(tableView, categoryFilter){
  // TODO: Get latitude and longitude from phone
  var lat = 0;
  var lon = 0;

  var xhr = Titanium.Network.createHTTPClient();

  xhr.onload = function() {
    Ti.API.info(this.status);
    if(this.status == 200) {
      Ti.API.info('Response ' + this.responseText);

      currentTableView = tableView;
      currentLat = lat;
      currentLon = lon;
      eval(this.responseText);
      //var r = JSON.parse(this.responseText);
    }
  };
  var url = api_url + '?output=json&callback=wowIHateJSONP';
  if(categoryFilter != "All"){
    url += '&info.category='+categoryFilter;
  }
  xhr.open('GET', url);
  //xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.send(jsonData);
  xhr.send();
}
