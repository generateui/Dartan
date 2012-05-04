class Stock {
  ListenableList<Road> roads;
  ListenableList<Town> towns;
  Stock() {
    roads = new ListenableList<Road>();
    towns = new ListenableList<Town>();
  }
}
