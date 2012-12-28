part of Dartan;

abstract class GamePhase implements Hashable, Testable, Jsonable, Identifyable {
  void start(Game game);
  void end(Game game);
  bool get isLobby;
  bool get isDetermineFirstPlayer;
  bool get isInitialPlacement;
  bool get isTurns;
  bool get isEnded;
}
abstract class GamePhaseData extends JsonObject {
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
  AbstractGamePhase.fromData(JsonObject json) {
    var data=json;
    id = data.id;
  }

  start(Game game) { }
  end(Game game) { }
  bool get isLobby => false;
  bool get isDetermineFirstPlayer => false;
  bool get isInitialPlacement => false;
  bool get isTurns => false;
  bool get isEnded => false;
  bool operator ==(other) => other.id==id;

  // Jsonable
  JsonObject get data {
    var data = new JsonObject();
    data.id=id;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int get hashCode {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  // Copyable
  dynamic copy([JsonObject data]) => data == null ?
      new AbstractGamePhase() : new AbstractGamePhase.fromData(data);
  test() { }
}
abstract class LobbyPhaseData extends JsonObject {
  String type;
  int id;
  List readyUsers;
}
/** Game is in the lobby, waiting for players */
class LobbyPhase extends AbstractGamePhase {
  bool get isLobby => true;
  ListenableList<User> readyUsers;
  LobbyPhase.fromData(JsonObject json) : super.fromData(json) {
    var data = json;
    /* TODO: set users using IDs from game instance */
    readyUsers = new ListenableList<User>();
  }
  LobbyPhase() : super() {
    readyUsers = new ListenableList<User>();
  }
  unreadyAllExceptHost(User host) {
    for (User u in
        readyUsers.filter((User uu) => uu != host)) {
      readyUsers.remove(u);
    }
  }
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new LobbyPhase() : new LobbyPhase.fromData(data);
}
abstract class DetermineFirstPlayerGamePhaseData extends JsonObject {
  String type;
  int id;
  Map rolls;
  Map currentRound;
}
/** Game just started, players rolling dice to determine the first player */
class DetermineFirstPlayerGamePhase extends AbstractGamePhase {
  List<HashMap<Player, DiceRoll>> rolls;
  HashMap<Player, DiceRoll> currentRound;
  bool get isDetermineFirstPlayer => true;
  DetermineFirstPlayerGamePhase() {
    rolls = new List<HashMap<Player, DiceRoll>>();
    currentRound = new HashMap<Player, DiceRoll>();
    rolls.add(currentRound);
  }
  DetermineFirstPlayerGamePhase.fromData(JsonObject json) : super.fromData(json) {
    var data=json;
    id = data.id == null ? null : data.id;
    /* TODO set maps */
  }
  registerRoll(Game game, Player player, DiceRoll roll) {
    currentRound[player] = roll;
    if (currentRound.length == game.players.length) {
      //
    }
  }
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new DetermineFirstPlayerGamePhase() : new DetermineFirstPlayerGamePhase.fromData(data);
}
abstract class EndedGamePhaseData extends JsonObject {
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
  bool get hasWinner => _won;
  bool get isEnded => true;

  EndedGamePhase();
  EndedGamePhase.fromData(JsonObject json)  : super.fromData(json) {
    var data = json;
    winnerUserId = data.winnerUserId;
    winnerPlayerId = data.winnerPlayerId;
    _won = data.won;
  }
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.won = _won;
    data.winnerUserId = winnerUserId;
    data.winnerPlayerId = winnerPlayerId;
    return data;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new EndedGamePhase() : new EndedGamePhase.fromData(data);
}
abstract class TurnsGamePhaseData extends JsonObject {
  String type;
  int id;
//  TurnPhaseData turnPhase;
}
class TurnsGamePhase extends AbstractGamePhase {
  TurnsGamePhase();
  TurnsGamePhase.fromData(JsonObject json)  : super.fromData(json) {
    var data = json;
//    turnPhase = new TurnPhase.data(data.turnPhase);
  }
  TurnPhase turnPhase;
  bool get isTurns => true;
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new TurnsGamePhase() : new TurnsGamePhase.fromData(data);
}
abstract class InitialPlacementGamePhaseData extends JsonObject {
  String type;
  int id;
  List firstRound;
  List secondRound;
}
class InitialPlacementGamePhase  extends AbstractGamePhase {
  InitialPlacementGamePhase();
  InitialPlacementGamePhase.fromData(JsonObject json) {
    var data = json;
    id = data.id == null ? null :data.id;
    // TODO: make lists
  }
  List<GameAction> firstRound;
  List<GameAction> secondRound;
  bool get isInitialPlacement => true;
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new InitialPlacementGamePhase() : new InitialPlacementGamePhase.fromData(data);
}
abstract class AllPhasesData extends JsonObject {
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
  AllPhases.fromData(JsonObject json) {
    observable = new ObservableHelper();
    var data = json;
    lobby = data.lobby == null ? null : new LobbyPhase.fromData(data.lobby);
    determinFirstPlayer = new DetermineFirstPlayerGamePhase.fromData(data.determinFirstPlayer);
    initialPlacement = new InitialPlacementGamePhase.fromData(data.initialPlacement);
    turns = new TurnsGamePhase.fromData(data.turns);
    ended = new EndedGamePhase.fromData(data.ended);
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
    while (notFound && iterator.hasNext) {
      GamePhase nextPhase = iterator.next();
      if (nextPhase.id == phaseId) {
        notFound=false;
      }
    }
  }

  next(Game game) {
    if (iterator.hasNext) {
      GamePhase oldPhase = current;
      current.end(game);
      current = iterator.next();
      current.start(game);
      observable.fire("current", oldPhase, current);
    }
  }
  JsonObject get data {
    var data = new JsonObject();
    data.type = Dartan.name(this);

    data.lobby = nullOrDataFrom(lobby);
    data.determinFirstPlayer = nullOrDataFrom(determinFirstPlayer);
    data.ended = nullOrDataFrom(ended);
    data.initialPlacement = nullOrDataFrom(initialPlacement);
    data.turns = nullOrDataFrom(turns);

    data.currentId = current == null ? null : current.id;
    return data;
  }

  bool get isLobby => current.isLobby;
  bool get isDetermineFirstPlayer => current.isDetermineFirstPlayer;
  bool get isInitialPlacement => current.isInitialPlacement;
  bool get isTurns => current.isTurns;
  bool get isEnded => current.isEnded;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new AllPhases() : new AllPhases.fromData(data);

}
