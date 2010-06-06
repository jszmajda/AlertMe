// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var mainWindow = Titanium.UI.createWindow({
  url: 'javascripts/current_alerts.js',
  barColor: '#333',
  title: 'AlertMe'
});


mainWindow.open();
