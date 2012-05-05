/** Represents the 2 points of the longest road */
class LongestRoad implements VictoryPointItem, PlayerPiece, Observable {
  Player _player;
  ObservableHelper observable;
  LongestRoute route;
  int get points() => 2;
  LongestRoad() {
    observable = new ObservableHelper();
  }
  Player get player() => _player;
  set player(Player p) {
    if (p != _player) {
      Player oldPlayer = _player;
      _player = p;
      observable.fire("player", oldPlayer, p);
    }
  }
  addToPlayer(Player p) {
    p.victoryPoints.add(this);
  }
  removeFromPlayer(Player p) {
    p.victoryPoints.remove(this);
  }
  /** Observable */
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
}
