interface GamePhase extends Hashable, Testable {
  void start(Game game);
  GamePhase next(); 
  bool get isLobby();
  bool get isDetermineFirstPlayer();
  bool get isInitialPlacement();
  bool get isPlayTurns();
  bool get isEnded();
}
class SupportedGamePhases extends ImmutableL<GamePhase> {
  SupportedGamePhases() : super([new AbstractGamePhase(), new LobbyPhase(), new DetermineFirstPlayerPhase()]);
}
/** Abstract conveience implementation of a [GamePhase] */
class AbstractGamePhase implements GamePhase {
  int hash;
  int hashCode() {
    if (hash == null)
      hash = Dartan.generateHashCode(this);
    return hash;
  }
  start(Game game) { }
  GamePhase next() => null;
  bool get isLobby() => false;
  bool get isDetermineFirstPlayer() => false;
  bool get isInitialPlacement() => false;
  bool get isPlayTurns() => false;
  bool get isEnded() => false;
  test() { }
}
/** Game is in the lobby, waiting for players */
class LobbyPhase extends AbstractGamePhase {
  bool get isLobby() => true;
}
/** Game just started, players rolling dice to determine the first player */
class DetermineFirstPlayerPhase extends AbstractGamePhase {
  bool get isDetermineFirstPlayer() => true;
}
  