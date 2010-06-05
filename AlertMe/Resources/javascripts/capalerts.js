var api_url = "http://cap-alerts.appspot.com/capquery_fake";

function getAlerts(lat, lon, tableView){
  var xhr = Titanium.Network.createHTTPClient();

  xhr.onload = function() {
    Ti.API.info(this.status);
    if(this.status == 200) {
      Ti.API.info('Response ' + this.responseText);

      var r = JSON.parse(this.responseText);
      Ti.API.info(r);
      data = [];
      for(var i=0; i < r.alerts.length; i++){
        var al = r.alerts[i];
        data.push({title: al.info[0].headline});
      }
      tableView.setData(data);
    }
  };
  xhr.open('GET', api_url + '?output=json');
  //xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.send(jsonData);
  xhr.send();
}
