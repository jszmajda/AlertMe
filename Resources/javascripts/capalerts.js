var api_url = "http://cap-alerts.appspot.com/capquery_fake";

var currentTableView = null;
var currentLat = null;
var currentLon = null;

function wowIHateJSONP(r){
  data = [];
  for(var i=0; i < r.alerts.length; i++){
    var al = r.alerts[i];
    if(categoryFilter == "All" || al.info[0].category[0] == categoryFilter){
      var row = Ti.UI.createTableViewRow({width:310, height: 'auto'});
      var viewBase = Ti.UI.createView({backgroundColor: '#000', width: 310, height: 'auto', top:0, left:0});
      for(var x = 0; x < al.info[0].category.length; x++){
        var icon = Ti.UI.createImageView({url: '../images/' + al.info[0].category[x].toLowerCase() + '.png', top: (x * 40), left: 0, width: 40, height: 60 });
        viewBase.add(icon);
      }
      var lbl = Ti.UI.createLabel({text: al.info[0].headline, width: 310 - 45, height: 'auto', left: 45});
      viewBase.add(lbl);
      row.add(viewBase);

      data.push(row);
    } else {
      data.push({title: 'not pushing '+al.info[0].category[0]+" due to categoryFilter "+ categoryFilter});
    }
  }
  tableView.setData(data);
}

function getPhoto()
{
// shamelessly stolen from the KitchenSink example camera_file.js

Titanium.Media.showCamera({

	success:function(event)
	{
		var cropRect = event.cropRect;
		var image = event.media;
		
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'camera_photo.png');
		f.write(image);
		//win.backgroundImage = f.nativePath;
        Titanium.API.info('Saving photo to: ' +Titanium.Filesystem.applicationDataDirectory + 'camera_photo.png');
        return Titanium.Filesystem.applicationDataDirectory + 'camera_photo.png';
	},
	cancel:function()
	{
        return null;
	},
	error:function(error)
	{
		// create alert
		var a = Titanium.UI.createAlertDialog({title:'Camera'});

		// set message
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Device does not have video recording capabilities');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}

		// show alert
		a.show();
        return null;
	},
	allowImageEditing:true
});


}

function getLocation()
{

// shamelessly stolen from the KitchenSink example geolocation.js

if (Titanium.Geolocation.locationServicesEnabled==false)
{
	Titanium.UI.createAlertDialog({title:'Alert Me', message:'Your device has geo turned off - turn it on.'}).show();
}
else
{

	//
	//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
	//
	// Titanium.Geolocation.ACCURACY_BEST
	// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
	// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
	// Titanium.Geolocation.ACCURACY_KILOMETER
	// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
	//
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;



	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (e.error)
		{
			Titanium.API.info( 'error: ' + JSON.stringify(e.error));
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

		//currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;
		currentLon = longitude;
        currentLat = latitude;
		Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	});
}
	//


}

function sendPhoto()
{
  getLocation();
  
  var lat = currentLat;
  var lon = currentLon;
  
    var file_location = getPhoto();
    if (file_location)
    {
        // TODO: need to add CAP ID field into the EXIF metadata for the photo
        // TODO: need to upload the photo from file_location to flickr or picasa or facebook, looks like Titanium has Facebook support built in.
    }

}

function getAlerts(tableView){
  // TODO: Get latitude and longitude from phone 
  getLocation();
  
  var lat = currentLat;
  var lon = currentLon;

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
  xhr.open('GET', url);
  //xhr.setRequestHeader('Content-Type', 'application/json');
  //xhr.setRequestHeader('Accept', 'application/json');
  //xhr.send(jsonData);
  xhr.send();
}
