part of Dartan;

abstract class LongestRoadData extends JsonObject {
  String type;
  int playerId;
  List edgesOfRoute;
}
/** Represents the 2 points of the longest road */
class LongestRoad implements VictoryPointItem, PlayerPiece, Observable, Jsonable, Testable {
  Player /* on */ _player;
  int playerId;
  ObservableHelper observable;
  LongestRoute route;
  int get points => 2;

  LongestRoad() {
    observable = new ObservableHelper();
  }
  LongestRoad.fromData(JsonObject json) {
    observable = new ObservableHelper();
    var data = json;
    playerId = data.playerId;
    // TODO: longest route data edgesOfRoute
  }
  Player get /* on */ player => _player;
  set /* on */ player(Player p) {
    if (p != _player) {
      Player oldPlayer = _player;
      _player = p;
      observable.fire("player", oldPlayer, p);
    }
  }
  JsonObject get data {
    var data = new JsonObject();
    data.type = nameOf(this);
    data.playerId = playerId;
    // TODO: longest route data
    return data;
  }
  addToPlayer(Player p) {
    p.victoryPoints.add(this);
  }
  removeFromPlayer(Player p) {
    p.victoryPoints.remove(this);
  }
  bool operator ==(other) => true; // TODO: implement
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Copyable
  LongestRoad copy([JsonObject data]) =>
      data == null ? new LongestRoad() : new LongestRoad.fromData(data);

  // Testable
  void test() {}
}
