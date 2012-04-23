interface GamePhase extends Hashable, Testable {
  void start(Game game);
  void end(Game game);
  bool get isLobby();
  bool get isDetermineFirstPlayer();
  bool get isInitialPlacement();
  bool get isTurns();
  bool get isEnded();
}
class SupportedGamePhases extends ImmutableL<GamePhase> {
  SupportedGamePhases() : super([
    new AbstractGamePhase(), new LobbyPhase(), new DetermineFirstPlayerGamePhase(),
    new EndedGamePhase(), new TurnsGamePhase(), new InitialPlacementGamePhase()]);
}
/** Abstract convenience implementation of a [GamePhase] */
class AbstractGamePhase implements GamePhase {
  int hash;
  int hashCode() {    
    if (hash == null)
      hash = Dartan.generateHashCode(this);
    return hash;
  }
  start(Game game) { }
  end(Game game) { }
  bool get isLobby() => false;
  bool get isDetermineFirstPlayer() => false;
  bool get isInitialPlacement() => false;
  bool get isTurns() => false;
  bool get isEnded() => false;
  test() { }
}
/** Game is in the lobby, waiting for players */
class LobbyPhase extends AbstractGamePhase {
  bool get isLobby() => true;
}
/** Game just started, players rolling dice to determine the first player */
class DetermineFirstPlayerGamePhase extends AbstractGamePhase {
  List<HashMap<Player, DiceRoll>> rolls;
  HashMap<Player, DiceRoll> currentRound;
  bool get isDetermineFirstPlayer() => true;
  DetermineFirstPlayerGamePhase() {
    rolls = new List<HashMap<Player, DiceRoll>>();
    currentRound = new HashMap<Player, DiceRoll>();
    rolls.add(currentRound);
  }
  registerRoll(Game game, Player player, DiceRoll roll) { 
    currentRound[player] = roll;
    if (currentRound.length == game.players.length) {
      //
    }
  }
}
class EndedGamePhase extends AbstractGamePhase {
  bool get isEnded() => true;
}
class TurnsGamePhase extends AbstractGamePhase {
  TurnPhase turnPhase;
  bool get isTurns() => true;
}
class InitialPlacementGamePhase  extends AbstractGamePhase {
  bool get isInitialPlacement() => true;
}
  