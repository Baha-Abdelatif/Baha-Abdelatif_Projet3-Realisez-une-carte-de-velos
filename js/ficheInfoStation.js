class FicheInfoStation {
  constructor(id, nameStation, address, available_bike_stands, bike_stands, available_bikes){
    this.id = id;
    this.name = nameStation;
    this.address = address;
    this.available_bike_stands = available_bike_stands;
    this.bike_stands = bike_stands;
    this.available_bikes = available_bikes;
  }
  eltCreator(){
    $('#titreStation').text(this.name);
    $('#stationAddress').text("Adresse : "+this.address);
    $('#stationAvailableStands').text(`${this.available_bike_stands}/${this.bike_stands} place(s) disponible(s).`);
    $('#stationAvailableBikes').text(`${this.available_bikes} vélo(s) disponible(s).`);
    $('.stationsToulouse').removeClass('hidden');
    $('#availableStands').css('width', `${((this.available_bike_stands * 100)/this.bike_stands)*2-2}px`);
    $('#availableBikes').css('width', `${((this.available_bikes * 100)/this.bike_stands)*2-2}px`);
  }
}
