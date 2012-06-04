class SupportedGames extends ImmutableL<Game> {
  SupportedGames() : super([new Game()]);
}
interface GameData extends JsonObject {
  String startedDateTime;
  int userId;
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

  Robber robber;
  LongestRoad longestRoad;
  LargestArmy largestArmy;
  AllPhasesData phases;
  GameSettings settings;
  int currentGamePhaseId;
  int currentTurnPhaseId;
  GameStatus status;
  List<Turn> turns;
  Turn turn;
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
  ListenableList<Turn> turns;
  Turn /* on */ turn = null;  // init to null, non-null when first time in [TurnsGamePhase]

  bool get atClient() => true;
  bool get atServer() => false;

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
    if (data.users != null) {
      for (JsonObject jsonUser in data.users) {
        users.add(new User.data(jsonUser));
      }
    }
    users = data.users == null ? null : new ListenableList<User>.from(data.users);
    phases = data.phases == null ? null : new AllPhases.data(data.phases);
    status = new Playing();
    turns = new ListenableList<Turn>.from(data.turns);
    players = new PlayerListMu();
    observable = new ObservableHelper();
    bank = new ResourceListMu();
    actions = new ListenableList<GameAction>();
    queue = new ListenableList<Action>();
    _init();
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
    data.actions = Oracle.toDataList(actions);
    data.bank = Oracle.toDataList(bank);
    data.board = board.data;
    data.chats = Oracle.toDataList(chats);
    data.currentGamePhaseId = currentGamePhase.id;
    data.currentTurnPhaseId = currentTurnPhase.id;
    data.developmentCards = Oracle.toDataList(developmentCards);
    return data;
  }
  test() {
    new GameTest().test();
  }

}
