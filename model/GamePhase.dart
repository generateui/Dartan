interface GamePhase extends Hashable, Testable, Jsonable, Identifyable {
  void start(Game game);
  void end(Game game);
  bool get isLobby();
  bool get isDetermineFirstPlayer();
  bool get isInitialPlacement();
  bool get isTurns();
  bool get isEnded();
}
interface GamePhaseData extends JsonObject {
  String type;
  int id;
}
class SupportedGamePhases extends ImmutableL<GamePhase> {
  SupportedGamePhases() : super([
    new AbstractGamePhase(), new LobbyPhase(), new DetermineFirstPlayerGamePhase(),
    new EndedGamePhase(), new TurnsGamePhase(), new InitialPlacementGamePhase(), new AllPhases()]);
}
/** Abstract convenience implementation of a [GamePhase] */
class AbstractGamePhase implements GamePhase {
  int id;
  AbstractGamePhase();
  AbstractGamePhase.data(JsonObject json) {
    GamePhaseData data=json;
    id = data.id;
  }

  start(Game game) { }
  end(Game game) { }
  bool get isLobby() => false;
  bool get isDetermineFirstPlayer() => false;
  bool get isInitialPlacement() => false;
  bool get isTurns() => false;
  bool get isEnded() => false;
  bool equals(other) => other.id==id;

  // Jsonable
  JsonObject get data() {
    GamePhaseData data = new JsonObject();
    data.id=id;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int hashCode() {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  // Copyable
  Dynamic copy([JsonObject data]) => data == null ?
      new AbstractGamePhase() : new AbstractGamePhase.data(data);
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
  LobbyPhase.data(JsonObject json) : super.data(json) {
    LobbyPhaseData data = json;
    /* TODO: set users using IDs from game instance */
    readyUsers = new ListenableList<User>();
  }
  LobbyPhase() : super() {
    readyUsers = new ListenableList<User>();
  }
  unreadyAllExceptHost(User host) {
    readyUsers.filter((User u) => u.id == host.id);
  }
  JsonObject get data() {
    LobbyPhaseData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
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
  DetermineFirstPlayerGamePhase.data(JsonObject json) : super.data(json) {
    DetermineFirstPlayerGamePhaseData data=json;
    id = data.id == null ? null : data.id;
    /* TODO set maps */
  }
  registerRoll(Game game, Player player, DiceRoll roll) {
    currentRound[player] = roll;
    if (currentRound.length == game.players.length) {
      //
    }
  }
  JsonObject get data() {
    DetermineFirstPlayerGamePhaseData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
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
  EndedGamePhase.data(JsonObject json)  : super.data(json) {
    EndedGamePhaseData data = json;
    winnerUserId = data.winnerUserId;
    winnerPlayerId = data.winnerPlayerId;
    _won = data.won;
  }
  JsonObject get data() {
    EndedGamePhaseData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.won = _won;
    data.winnerUserId = winnerUserId;
    data.winnerPlayerId = winnerPlayerId;
    return data;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new EndedGamePhase() : new EndedGamePhase.data(data);
}
interface TurnsGamePhaseData extends JsonObject {
  String type;
  int id;
//  TurnPhaseData turnPhase;
}
class TurnsGamePhase extends AbstractGamePhase {
  TurnsGamePhase();
  TurnsGamePhase.data(JsonObject json)  : super.data(json) {
    TurnsGamePhaseData data = json;
//    turnPhase = new TurnPhase.data(data.turnPhase);
  }
  TurnPhase turnPhase;
  bool get isTurns() => true;
  JsonObject get data() {
    TurnsGamePhaseData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
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
    id = data.id == null ? null :data.id;
    // TODO: make lists
  }
  List<GameAction> firstRound;
  List<GameAction> secondRound;
  bool get isInitialPlacement() => true;
  JsonObject get data() {
    InitialPlacementGamePhaseData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
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

  AllPhases() : super() {
    observable = new ObservableHelper();
    ensureAllPhasesPresent();
    addAllPhasesToList();
  }
  AllPhases.data(JsonObject json) {
    AllPhasesData data = json;
    lobby = data.lobby == null ? null : new LobbyPhase.data(data.lobby);
    determinFirstPlayer = new DetermineFirstPlayerGamePhase.data(data.determinFirstPlayer);
    initialPlacement = new InitialPlacementGamePhase.data(data.initialPlacement);
    turns = new TurnsGamePhase.data(data.turns);
    ended = new EndedGamePhase.data(data.ended);
    ensureAllPhasesPresent();
    addAllPhasesToList();
    if (data.currentId == null) {
      iterator = allPhases.iterator();
      current = iterator.next();
    } else {
      setCurrent(data.currentId);
      addAllPhasesToList();
    }
  }

  ensureAllPhasesPresent() {
    lobby = lobby== null ? new LobbyPhase() : lobby;
    determinFirstPlayer = determinFirstPlayer== null ? new DetermineFirstPlayerGamePhase() : determinFirstPlayer;
    initialPlacement = initialPlacement== null ? new InitialPlacementGamePhase() : initialPlacement;
    turns = turns== null ? new TurnsGamePhase() : turns;
    ended = ended== null ? new EndedGamePhase() : ended;
  }

  addAllPhasesToList() {
    allPhases = new List<GamePhase>();
    allPhases.add(lobby);
    allPhases.add(determinFirstPlayer);
    allPhases.add(initialPlacement);
    allPhases.add(turns);
    allPhases.add(ended);
    iterator = allPhases.iterator();
  }
  setCurrent(int phaseId) {
    iterator = allPhases.iterator();
    bool notFound=true;
    while (notFound && iterator.hasNext()) {
      GamePhase nextPhase = iterator.next();
      if (nextPhase.id == phaseId) {
        notFound=false;
      }
    }
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

    data.lobby = nullOrDataFrom(lobby);
    data.determinFirstPlayer = nullOrDataFrom(determinFirstPlayer);
    data.ended = nullOrDataFrom(ended);
    data.initialPlacement = nullOrDataFrom(initialPlacement);
    data.turns = nullOrDataFrom(turns);

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
