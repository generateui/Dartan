part of Dartan;

abstract class LargestArmyData implements JsonObject {
  String type;
  int playerId;
  int knights;
}
class LargestArmy
  implements VictoryPointItem, Observable, PlayerPiece, Testable, Jsonable {

  Player /* on */ _player;
  int playerId;
  int knights;
  ObservableHelper observable;

  int get points => 2;
  int get knightCount => _player == null ? 0 : player.knights.length;

  init() {
    observable = new ObservableHelper();
  }
  LargestArmy() {
    init();
  }
  LargestArmy.fromData(JsonObject json) {
    init();
    var data = json;
    playerId = data.playerId;
    knights = data.knights;
  }

  JsonObject get data {
    var data = new JsonObject();
    data.type = Dartan.name(this);
    data.playerId = player == null ? null : player.id;
    data.knights = knights;
    return data;
  }
  Player get player => _player;
  set player(Player p) {
    if (p != _player) {
      Player oldPlayer = _player;
      _player = p;
      observable.fire("player", oldPlayer, p);
    }
  }
  bool operator ==(other) => true; // TODO: implement
  // PlayerPiece
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
  LargestArmy copy([JsonObject data]) =>
      data == null ? new LargestArmy() : new LargestArmy.fromData(data);

  // Testable
  test() {

  }
}
