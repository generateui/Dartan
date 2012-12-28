part of Dartan;

abstract class StockData extends JsonObject{
  String type;
  List<RoadData> roads;
  List<TownData> towns;
  List<CityData> cities;
  List<JsonObject> tokens;
}
/** What the player owns as pieces, but not yet is into play */
class Stock implements Jsonable, Testable {
  ListenableList<Road> roads;
  ListenableList<Town> towns;
  ListenableList<City> cities;
  ListenableList<Piece> tokens;

  init() {
    roads = roads == null ? new ListenableList<Road>() : roads;
    towns = towns == null ? new ListenableList<Town>() : towns;
    cities = cities == null ? new ListenableList<City>() : cities;
    tokens = tokens == null ? new ListenableList<Piece>() : tokens;
  }

  Stock.fromData(JsonObject json) {
    var data = json;
    roads = llFrom(data.roads);
    towns = llFrom(data.towns);
    cities = llFrom(data.cities);
    init();
  }
  Stock() {
    init();
  }
  bool operator ==(other) => true; // TODO: implement
  JsonObject get data {
    var data = new JsonObject();
    data.type = nameOf(this);
    data.cities = Oracle.toDataList(cities);
    data.towns = Oracle.toDataList(towns);
    data.roads = Oracle.toDataList(roads);
    return data;
  }
  Stock copy([JsonObject data]) => data==null ?
      new Stock() : new Stock.fromData(data);
      
  // Testable
  void test() {}
}
