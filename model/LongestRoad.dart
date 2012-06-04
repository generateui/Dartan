interface LongestRoadData extends JsonObject {
  int playerId;
  List edgesOfRoute;
}
/** Represents the 2 points of the longest road */
class LongestRoad implements VictoryPointItem, PlayerPiece, Observable, Jsonable {
  Player /* on */ _player;
  int playerId;
  ObservableHelper observable;
  LongestRoute route;
  int get points() => 2;
  LongestRoad.data(JsonObject json) {
    LongestRoadData data = json;
    playerId = data.playerId;
    // TODO: longest route data edgesOfRoute
  }
  LongestRoad() {
    observable = new ObservableHelper();
  }
  Player get /* on */ player() => _player;
  set /* on */ player(Player p) {
    if (p != _player) {
      Player oldPlayer = _player;
      _player = p;
      observable.fire("player", oldPlayer, p);
    }
  }
  JsonObject get data() {
    LongestRoadData data = new JsonObject();
    data.playerId = playerId;
    return data;
  }
  addToPlayer(Player p) {
    p.victoryPoints.add(this);
  }
  removeFromPlayer(Player p) {
    p.victoryPoints.remove(this);
  }
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Copyable
  LongestRoad copy([JsonObject data]) =>
      data == null ? new LongestRoad() : new LongestRoad.data(data);

}
