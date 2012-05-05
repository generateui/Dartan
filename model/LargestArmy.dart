class LargestArmy implements VictoryPointItem, Observable, PlayerPiece, Testable {
  Player /* on */ _player;
  ObservableHelper observable;
  int get points() => 2;
  int get knightCount() => _player == null ? 0 : player.knights.length;
  LargestArmy() {
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
  // PlayerPiece
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
  // Testable
  test() {
    
  }
}
