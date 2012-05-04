class Stock {
  ListenableList<Road> roads;
  ListenableList<Town> towns;
  ListenableList<City> cities;
  Stock() {
    roads = new ListenableList<Road>();
    towns = new ListenableList<Town>();
    cities = new ListenableList<City>();
  }
}
