const mymap = L.map('mapid').setView([43.603887, 1.437677], 15);
let tileStreets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiYmFoYS1hYmRlbGF0aWYiLCJhIjoiY2p0OGVib2p0MDBkZDQ0bW5lNHh6aTdtMSJ9.XYEAsEUsYpmH-2H-85NnqQ'
});
tileStreets.addTo(mymap);
