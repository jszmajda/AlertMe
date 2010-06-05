var api_url = "http://cap-alerts.appspot.com/capquery_fake";

var currentTableView = null;
var currentLat = null;
var currentLon = null;

function wowIHateJSONP(r){
  Ti.API.info(r);
  data = [];
  for(var i=0; i < r.alerts.length; i++){
    var al = r.alerts[i];
    data.push({title: al.info[0].headline});
  }
  tableView.setData(data);
}
function getAlerts(lat, lon, tableView){
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
  xhr.open('GET', api_url + '?output=json&callback=wowIHateJSONP');
  //xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.send(jsonData);
  xhr.send();
}
