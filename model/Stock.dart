interface StockData extends JsonObject{
  List<RoadData> roads;
  List<TownData> towns;
  List<CityData> cities;
  List<JsonObject> tokens;
}
/** What the player owns as pieces, but not yet is into play */
class Stock {
  ListenableList<Road> roads;
  ListenableList<Town> towns;
  ListenableList<City> cities;
  ListenableList<Piece> tokens;

  Stock.data(JsonObject json) {
    StockData data = json;
    for (RoadData road in data.roads) {
      Road r = new Road.data(road);
      roads.add(r);
    }
    for (CityData city in data.cities) {
      City c = new City.data(city);
      cities.add(c);
    }
  }
  Stock() {
    roads = new ListenableList<Road>();
    towns = new ListenableList<Town>();
    cities = new ListenableList<City>();
    tokens = new ListenableList<Piece>();
  }
  JsonObject get data() {
    StockData data = new JsonObject();
    data.cities = Oracle.toDataList(cities);
    data.towns = Oracle.toDataList(towns);
    data.roads = Oracle.toDataList(roads);
    return data;
  }
}
