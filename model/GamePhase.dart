interface GamePhase extends Hashable, Testable, Jsonable, Identifyable {
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
  int id;
  int hashCode() {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  start(Game game) { }
  end(Game game) { }
  bool get isLobby() => false;
  bool get isDetermineFirstPlayer() => false;
  bool get isInitialPlacement() => false;
  bool get isTurns() => false;
  bool get isEnded() => false;
  JsonObject get data() { throw new NotImplementedException(); }
  Dynamic copy([JsonObject data]) { throw new NotImplementedException(); }
  test() { }
}
interface LobbyPhaseData extends JsonObject {
  String type;
  int id;
  List readyUsers;
}
/** Game is in the lobby, waiting for players */
class LobbyPhase extends AbstractGamePhase {
  bool get isLobby() => true;
  ListenableList<User> readyUsers;
  LobbyPhase.data(JsonObject json) {
    LobbyPhaseData data = json;
    id = data.id;
    /* TODO: set users using IDs from game instance */
  }
  LobbyPhase() : super() {
    readyUsers = new ListenableList<User>();
  }
  unreadyAllExceptHost(User host) {
    readyUsers.filter((User u) => u.id == host.id);
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new LobbyPhase() : new LobbyPhase.data(data);
}
interface DetermineFirstPlayerGamePhaseData extends JsonObject {
  String type;
  int id;
  Map rolls;
  Map currentRound;
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
  DetermineFirstPlayerGamePhase.data(JsonObject json) {
    DetermineFirstPlayerGamePhaseData data=json;
    id = data.id;
    /* TODO set maps */
  }
  registerRoll(Game game, Player player, DiceRoll roll) {
    currentRound[player] = roll;
    if (currentRound.length == game.players.length) {
      //
    }
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new DetermineFirstPlayerGamePhase() : new DetermineFirstPlayerGamePhase.data(data);
}
interface EndedGamePhaseData extends JsonObject {
  String type;
  int id;
  int winnerUserId;
  int winnerPlayerId;
  bool won;
}
class EndedGamePhase extends AbstractGamePhase {
  int winnerUserId;
  int winnerPlayerId;
  bool _won = false;
  bool get hasWinner() => _won;
  bool get isEnded() => true;

  EndedGamePhase();
  EndedGamePhase.data(JsonObject json) {
    EndedGamePhaseData data = json;
    id = data.id;
    winnerUserId = data.winnerUserId;
    winnerPlayerId = data.winnerPlayerId;
    _won = data.won;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new EndedGamePhase() : new EndedGamePhase.data(data);
}
interface TurnsGamePhaseData extends JsonObject {
  String type;
  int id;
  TurnPhaseData turnPhase;
}
class TurnsGamePhase extends AbstractGamePhase {
  TurnsGamePhase();
  TurnsGamePhase.data(JsonObject json) {
    TurnsGamePhaseData data = json;
    id = data.id;
    turnPhase = new TurnPhase.data(data.turnPhase);
  }
  TurnPhase turnPhase;
  bool get isTurns() => true;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new TurnsGamePhase() : new TurnsGamePhase.data(data);
}
interface InitialPlacementGamePhaseData extends JsonObject {
  String type;
  int id;
  List firstRound;
  List secondRound;
}
class InitialPlacementGamePhase  extends AbstractGamePhase {
  InitialPlacementGamePhase();
  InitialPlacementGamePhase.data(JsonObject json) {
    InitialPlacementGamePhaseData data = json;
    id = data.id;
    // TODO: make lists
  }
  List<GameAction> firstRound;
  List<GameAction> secondRound;
  bool get isInitialPlacement() => true;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new InitialPlacementGamePhase() : new InitialPlacementGamePhase.data(data);
}
interface AllPhasesData extends JsonObject {
  String type;
  LobbyPhaseData lobby;
  InitialPlacementGamePhaseData initialPlacement;
  TurnsGamePhaseData turns;
  EndedGamePhaseData ended;
  DetermineFirstPlayerGamePhaseData determinFirstPlayer;
  int currentId;
}
class AllPhases extends AbstractGamePhase {
  LobbyPhase lobby;
  DetermineFirstPlayerGamePhase determinFirstPlayer;
  InitialPlacementGamePhase initialPlacement;
  TurnsGamePhase turns;
  EndedGamePhase ended;

  GamePhase current;
  List<GamePhase> allPhases;
  Iterator<GamePhase> iterator;
  ObservableHelper observable;

  AllPhases.data(JsonObject json) {
    AllPhasesData data = json;
    lobby = new LobbyPhase.data(data.lobby);
    determinFirstPlayer = new DetermineFirstPlayerGamePhase.data(data.determinFirstPlayer);
    initialPlacement = new InitialPlacementGamePhase.data(data.initialPlacement);
    turns = new TurnsGamePhase.data(data.turns);
    ended = new EndedGamePhase.data(data.ended);
  }
  AllPhases() : super() {
    observable = new ObservableHelper();
    allPhases = new List<GamePhase>();
    allPhases.add(lobby);
    allPhases.add(determinFirstPlayer);
    allPhases.add(initialPlacement);
    allPhases.add(turns);
    allPhases.add(ended);
    iterator = allPhases.iterator();
  }

  next(Game game) {
    if (iterator.hasNext()) {
      GamePhase oldPhase = current;
      current.end(game);
      current = iterator.next();
      current.start(game);
      observable.fire("current", oldPhase, current);
    }
  }
  JsonObject get data() {
    AllPhasesData data = new JsonObject();
    data.type = Dartan.name(this);
    data.lobby = lobby.data;
    data.determinFirstPlayer = determinFirstPlayer.data;
    data.ended = ended.data;
    data.initialPlacement = initialPlacement.data;
    data.turns = turns.data;
    data.currentId = current == null ? null : current.id;
    return data;
  }

  bool get isLobby() => current.isLobby;
  bool get isDetermineFirstPlayer() => current.isDetermineFirstPlayer;
  bool get isInitialPlacement() => current.isInitialPlacement;
  bool get isTurns() => current.isTurns;
  bool get isEnded() => current.isEnded;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new AllPhases() : new AllPhases.data(data);

}
