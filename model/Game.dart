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

  List users;
  List spectators;
  List players;
  List bank;
  List actions;
  List chats;
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

  GameSettings settings;
  GameStatus status;
}
class Game implements Testable, Observable, Hashable, Identifyable, Jsonable {
  ObservableHelper observable;
  static User get serverUser() => new ServerUser();

  Date startedDateTime;

  Player /* on */ playerOnTurn;
  User host;
  Board board;
  String name = "UnnamedGame";
  int id;

  int developmentCardCount = 0;

  ListenableList<User> spectators;
  ListenableList<User> users;
  ListenableList<GameAction> actions;
  ListenableList<Turn> turns;  // Turns start in Turns GamePhase
  ListenableList<Say> chats;
  ListenableList<Action> queue; // Restrict queue actions only (e.g. move robber)
  ListenableList<DevelopmentCard> developmentCards;

  PlayerListMu players;
  ResourceListMu bank;

  Robber robber;
  LongestRoad longestRoad;
  LargestArmy largestArmy;

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

  _init() { // init to default settings
    observable = new ObservableHelper();
    chats = new ListenableList<Say>();
    users = users == null ?  new ListenableList<User>() : users;
    phases = phases == null ? new AllPhases() : phases;
    status = status == null ? new Playing() : status;
    turns = turns == null ? new ListenableList<Turn>() : turns;
    players = players == null ? new PlayerListMu() : players;
    bank = bank == null ? new ResourceListMu() : bank;
    actions = actions == null ? new ListenableList<GameAction>() : actions;
    queue = queue == null ? new ListenableList<Action>() : queue;
  }
  Game() { _init(); }
  Game.data(JsonObject json) {
    GameData data = json;
    id = data.id;
    users = llFrom(data.users);
    host = data.hostUserId != null && hasId(data.hostUserId, users) ?
        byId(data.hostUserId, users) : null;
    spectators = llFrom(data.spectators);
    //if (data.hostUserId != null) {_setHost(data.hostUserId); }
    phases = data.phases == null ? new AllPhases() : new AllPhases.data(data.phases);
    status = new Playing();
//    turns = new ListenableList<Turn>.from(data.turns);
    players = new PlayerListMu();
    bank = new ResourceListMu();
    actions = new ListenableList<GameAction>();
    queue = new ListenableList<Action>();
    _init();
  }
  _setHost(int hostId) {
    if (hostId != null && hasUserId(hostId)) {
      host = userById(hostId);
    }
  }

  afterSerialization() {
    // Tiles should get Territory from Id
    for (Tile t in board.tiles.filter((Tile tt) => tt.territoryId != null)) {
      Territory terr = byId(t.territoryId, board.territories);
      if (terr == null) {
        print("nonexisting territory referenced");
        continue;
      }
      if (!t.canHaveTerritory) {
        print("territoryId found, but tile cannot have a territory. Tile: ${t.data.toString()}");
        continue;
      }

      t.territory = terr;
    }
    // Player should get User from userId
    for (Player player in players) {
      User u = byId(player.userId, users);
      player.user = u;
    }
  }

  start() {
    phases.next(this);
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
    //data.startedDateTime = startedDateTime; DATETIME/conversion

//    data.actions =  nullOrDataListFrom(actions);
//    data.chats = nullOrDataListFrom(chats);
//    data.bank = nullOrDataListFrom(bank);
    data.users = nullOrDataListFrom(users);
//    data.turns = nullOrDataListFrom(turns);
//    data.players = nullOrDataListFrom(players);
//    data.queue = nullOrDataListFrom(queue);
//    data.developmentCards = nullOrDataListFrom(developmentCards);
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
      "users": [
        { "id": 1, "type": "User", "name": "Hendrik" }
      ],
      "spectators": [
        { "id": 2, "type": "User", "name": "kijker" }
      ],
      "players": [
        { "id": 1, "userId": 1, "type": "Player" }
      ],
      "actions": [
        {"type": "Say", "isLobby": true, "userId": 1, "id": 1 }
      ],
      "chats": [
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

    Game fromPlainJson = new Jsonable.data(jso);
    Game check = new Game();
    User u = new User(1, "Hendrik", "");
    Player p = new Player(u);
    check.users.add(u);
    check.players.add(p);
    check.name = "yeygame";
    check.id = 1;
    Expect.isTrue(check.equals(fromPlainJson), "Equal game instances");
    new GameTest().test();
  }

}
class StandardGame extends Game {

}