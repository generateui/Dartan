class SupportedGames extends ImmutableL<Game> {
  SupportedGames() : super([new Game()]);
}
interface GameData extends JsonObject {
  String type;
  String startedDateTime;
  int hostUserId;
  BoardData board;
  String name;
  int id;

  List users;
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
  ListenableList<Turn> turns;
  ListenableList<SayGame> chats;
  ListenableList<Action> queue;
  ListenableList<DevelopmentCard> developmentCards;

  PlayerListMu players;
  ResourceListMu bank;
  Robber robber;
  LongestRoad longestRoad;
  LargestArmy largestArmy;

  AllPhases phases;
  GameSettings settings;
  GamePhase /* on */ currentGamePhase;
  TurnPhase /* on */ currentTurnPhase;
  GameStatus /* on */ status;
  Turn /* on */ turn = null;  // init to null, non-null when first time in [TurnsGamePhase]

  bool get atClient() => true;  // True when executing at client
  bool get atServer() => false; // True when at Server

  _init() { // init to default settings
    observable = new ObservableHelper();
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
    users = llFrom(data.users);
//    phases = data.phases == null ? null : new AllPhases.data(data.phases);
    status = new Playing();
    turns = new ListenableList<Turn>.from(data.turns);
    players = new PlayerListMu();
    observable = new ObservableHelper();
    bank = new ResourceListMu();
    actions = new ListenableList<GameAction>();
    queue = new ListenableList<Action>();
    _init();
  }

  afterSerialization() {
    // Tiles should get Territory from Id
    for (Tile t in board.tiles) {
      if (t.territoryId != null) {
        t.territory = byId(t.territoryId, board.territories);
      }
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

  User userById(int userId) => byId(userId, users);
  Player playerById(int playerId) => byId(playerId, players);

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
  Game copy([JsonObject data]) => data == null ? new Game() : new Game.data(data);
  // Jsonable
  JsonObject get data() {
    GameData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.name = name;
    //data.startedDateTime = startedDateTime; DATETIME/conversion

    data.actions =  nullOrDataListFrom(actions);
    data.chats = nullOrDataListFrom(chats);
    data.bank = nullOrDataListFrom(bank);
    data.users = nullOrDataListFrom(users);
    data.turns = nullOrDataListFrom(turns);
    data.players = nullOrDataListFrom(players);
    data.queue = nullOrDataListFrom(queue);
    data.developmentCards = nullOrDataListFrom(developmentCards);

    //data.status = status == null ? null : status.data;
    data.board = nullOrDataFrom(board);
    data.phases = nullOrDataFrom(phases);
    data.currentGamePhaseId = currentGamePhase == null ? null : currentGamePhase.id;
    data.currentTurnPhaseId = currentTurnPhase == null ? null : currentTurnPhase.id;
    data.robber = nullOrDataFrom(robber);
    data.longestRoad = nullOrDataFrom(longestRoad);
    data.largestArmy = nullOrDataFrom(largestArmy);
    return data;
  }
  bool equals(other) => other.id==id;
  test() {
    new GameTest().test();
  }

}
