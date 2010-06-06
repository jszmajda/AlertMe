Titanium.include('capalerts.js');

var categoryFilter = "All";
var win = Titanium.UI.currentWindow;

var html = "<html><body bgcolor='#5a5c64'>";
html += "<select id='category_select' style='width: 270px; font-size: 14px; height: 30px;'>";
html += "<option value=\"All\">All</option>";
html += "<option value=\"Geo\">Geo</option>";
html += "<option value=\"Met\">Met</option>";
html += "<option value=\"Safety\">Safety</option>";
html += "<option value=\"Security\">Security</option>";
html += "<option value=\"Rescue\">Rescue</option>";
html += "<option value=\"Fire\">Fire</option>";
html += "<option value=\"Health\">Health</option>";
html += "<option value=\"Env\">Env</option>";
html += "<option value=\"Transport\">Transport</option>";
html += "<option value=\"Infra\">Infra</option>";
html += "<option value=\"CBRNE\">CBRNE</option>";
html += "<option value=\"Other\">Other</option>";
html += "</select>";
html += "<script type='text/javascript'>";
html += "document.getElementById('category_select').onchange = function(){ Titanium.App.fireEvent('set_category_value',{value:this.value}); };";
html += "</script>";
html +="</body></html>";
var selectView = Titanium.UI.createWebView({
  top:    0,
  left:   0,
  height: 50,
  width:  'auto',
  html:   html
});

Titanium.App.addEventListener("set_category_value", function(ev){
  categoryFilter = ev.value;
  getAlerts(tableView, categoryFilter);
});

var data = [{title:'Loading...'}];
var tableView = Titanium.UI.createTableView({
  top:  50,
  left: 0,
  data: data
});

//var rowWebView = Titanium.UI.createWebView({
//  width: 'auto',
//  height: 'auto',
//  html: "<span>Hello World!</span>"
//});
//var row = Titanium.UI.createTableViewRow();

//row.add(rowWebView);
//tableView.add(row);
win.add(selectView);
win.add(tableView);

getAlerts(tableView, categoryFilter);
