class SupportedGames extends ImmutableL<Game> {
  SupportedGames() : super([new Game()]);
}
interface GameData extends JsonObject {
  String type;
  int id;
  int hostUserId;
  String name;
  String startedDateTime;

  BoardData board;

  List spectators;
  List players;
  List bank;
  List actions;
  List queue;
  List developmentCards;
  List turns;

  RobberData robber;
  LongestRoadData longestRoad;
  LargestArmyData largestArmy;
  AllPhasesData phases;
  int currentGamePhaseId;
  int currentTurnPhaseId;
  int currentTurnId;

  GameSettingsData settings;
  GameStatus status;
}
/** Defaults to non-null members if not explicitly initialized on null */
class Game implements Testable, Observable, Hashable, Identifyable, Jsonable {
  ObservableHelper observable;
  static User get serverUser() => new ServerUser();

  Date startedDateTime;

  Player /* on */ playerOnTurn;
  User host;
  Board board;
  String name = "UnnamedGame";
  int id;
  int _hostUserId;

  int developmentCardCount = 0;

  ListenableList<User> spectators;
  ListenableList<User> users;  // users = spectators + (playerX.user ... )
  ListenableList<GameAction> actions;
  ListenableList<Turn> turns;  // Turns start in Turns GamePhase
  ListenableList<Say> chats;
  ListenableList<Action> queue; // Restrict queue actions only (e.g. move robber)
  ListenableList<DevelopmentCard> developmentCards;

  PlayerListMu players;
  ResourceListMu bank;

  Robber robber = null;
  LongestRoad longestRoad = null;
  LargestArmy largestArmy = null;

  AllPhases phases;
  GameSettings _settings;
  GamePhase /* on */ currentGamePhase;
  TurnPhase /* on */ currentTurnPhase;
  GameStatus /* on */ status;
  Turn /* on */ turn = null;  // init to null, non-null when first time in [TurnsGamePhase]

  bool get atClient() => true;  // True when executing at client
  bool get atServer() => false; // True when at Server

  GameSettings get /* on */ settings() => _settings;
  set /* on */ settings(GameSettings s) {
    GameSettings old = _settings;
    _settings = s;
    observable.fire("settings", old, s);
  }

  /** init to default settings */
  _init() {
    observable = new ObservableHelper();
    users = new ListenableList<User>();
    chats = new ListenableList<Say>();

    phases = phases == null ? new AllPhases() : phases;
    status = status == null ? new Playing() : status;
    turns = turns == null ? new ListenableList<Turn>() : turns;
    players = players == null ? new PlayerListMu() : players;
    bank = bank == null ? new ResourceListMu() : bank;
    actions = actions == null ? new ListenableList<GameAction>() : actions;
    queue = queue == null ? new ListenableList<Action>() : queue;
    settings = settings == null ? new GameSettings() : settings;
  }
  Game() { _init(); }
  Game.data(JsonObject json) {
    GameData d = json;
    id = d.id;
    _hostUserId = d.hostUserId;
    spectators = llFrom(d.spectators);
    phases = d.phases == null ? new AllPhases() : new AllPhases.data(d.phases);
    status = new Playing();
    _settings = fromData(d.settings);
//    turns = new ListenableList<Turn>.from(data.turns);
    players = new PlayerListMu.from(listFrom(d.players));
    bank = new ResourceListMu();
    actions = new ListenableList<GameAction>();
    queue = new ListenableList<Action>();

    _init();

    // Ensure all other references are set from given Ids
    for (Player p in players) {      // Users
      if (p.user != null) {
        users.add(p.user);
      }
    }
    users.addAll(spectators);
    if (_hostUserId != null && hasId(_hostUserId, users)) {       // Host
      host = userById(_hostUserId);
    }
    for (Action action in actions) { // Chats
      if (action is Say) {
        Say say = action;
        chats.add(say);
      }
    }

  }

  start() {
    phases.next(this);
    if (settings.withRobber) {
      robber = new Robber();
    }
  }
  prepareDevelopmentCards() {

  }

  bool isSpectator(User user) => hasId(user.id, spectators);
  User userById(int userId) => byId(userId, users);
  Player playerById(int playerId) => byId(playerId, players);
  bool hasPlayerId(int pid) => byId(pid, players) != null;
  bool hasUserId(int uid) => byId(uid, users) != null;

  Player playerByUser(User u) {
    List<Player> r = players.filter((p) => p.user.id == u.id);
    if (!r.isEmpty()) {
      return r[0];
    } else {
      return null;
    }
  }

  nextTurn() {
    if (currentGamePhase.isTurns) {
      Player oldPlayer = playerOnTurn;
      Turn oldTurn = turn;
      playerOnTurn = players.next(oldPlayer);
      Turn newTurn = new Turn(turns.length+1, playerOnTurn);
      observable.fire("turn", oldTurn, turn);
      observable.fire("playerOnTurn", oldPlayer, playerOnTurn);
    }
  }
  void performAction(GameAction action) {
    action.perform(this);
    actions.add(action);
  }
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  // Copyable
  Game copy([JsonObject data]) => data == null ?
      new Game() : new Game.data(data);
  // Jsonable
  JsonObject get data() {
    GameData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.name = name;
    data.hostUserId = host == null ? null : host.id;
    data.spectators = nullOrDataListFrom(spectators);
    data.settings = nullOrDataFrom(_settings);
    //data.startedDateTime = startedDateTime; DATETIME/conversion

    data.actions =  nullOrDataListFrom(actions);
    data.bank = nullOrDataListFrom(bank);
    data.turns = nullOrDataListFrom(turns);
    data.players = nullOrDataListFrom(players);
    data.queue = nullOrDataListFrom(queue);
    data.developmentCards = nullOrDataListFrom(developmentCards);
//
//    //data.status = status == null ? null : status.data;
//    data.board = nullOrDataFrom(board);
    data.phases = nullOrDataFrom(phases);
//    data.currentGamePhaseId = currentGamePhase == null ? null : currentGamePhase.id;
//    data.currentTurnPhaseId = currentTurnPhase == null ? null : currentTurnPhase.id;
//    data.robber = nullOrDataFrom(robber);
//    data.longestRoad = nullOrDataFrom(longestRoad);
//    data.largestArmy = nullOrDataFrom(largestArmy);
    return data;
  }
  bool equals(other) => other.id==id;
  test() {
    JsonObject jso;
    jso = new JsonObject.fromMap({
      "type": "Game",
      "id": 1,
      "hostUserId": 1,
      "name": "yeygame",
      "currentGamePhaseId": 1,
      "currentTurnPhaseId": null,
      "currentTurnId": null,
      "spectators": [
        { "id": 2, "type": "User", "name": "kijker" }
      ],
      "players": [
        { "id": 1, "userId": 1, "type": "Player", "user": {
          "id": 1, "type": "User", "name": "Henkie" }
        }
      ],
      "actions": [
        {"type": "Say", "isLobby": true, "userId": 1, "id": 1 }
      ],
      "developmentCards": [
        { "id": "1", "type": "Kinght", "playerId": 1 },
        { "id": "2", "type": "VictoryPoint", "bonusName": "Market", "playerId": 1 }
      ],
      "turns": [],
      "phases": {
        "type": "AllGamePhases",
        "currentId": 1, // DetermineFirstPlayer
        "lobbyPhase": { "id": 10, "type": "LobbyPhase" },
        "determinFirstPlayer": { "id": 11, "type": "DetermineFirstPlayerGamePhase" },
        "initialPlacement": { "id": 12, "type": "InitialPlacementGamePhase" },
        "turns": { "id": 13, "type": "TurnsGamePhase" },
        "ended": { "id": 14, "type": "EndedGamePhase" }
      },
      "robber": { "id": 20, "cell": { "row": 0, "column": 0, "type": "Cell" } },
      "longestRoad": { "id": 21, "edgesOfRoute": [] },
      "largestArmy": { "id": 22, "playerId": 1, "knights": [] }
    });

//    Game fromPlainJson = new Jsonable.data(jso);
    Game check = new Game();
    User u = new User(1, "Hendrik", "");
    Player p = new Player(u);
    check.users.add(u);
    check.players.add(p);
    check.name = "yeygame";
    check.id = 1;
//    Expect.isTrue(check.equals(fromPlainJson), "Equal game instances");
    new GameTest().test();
  }

}
class StandardGame extends Game {

}