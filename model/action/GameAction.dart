/** Any action performed in a game */
interface GameAction extends Action {
  int gameId;
  int playerId;

  Player player;
  TurnPhase turnPhase;
  GamePhase gamePhase;

  // In order of execution:
  void prepare(Game game); // ensure all instance references have been acquired from id's
  void performServer(ServerGame serverGame); // prepare this
  void perform(Game game); // Mutate the game instance

  bool isValid(); // true when provided data makes sense
  bool allowedTurnPhase(TurnPhase turnPhase);
  bool allowedGamePhase(GamePhase gamePhase);
}
/** Generalized interface for data needed on all actions */
interface GameActionData extends JsonObject {
  String type;
  int id;
  int userId;
  int gameId;
  int playerId;
}
class SupportedGameActions extends ImmutableL<GameAction> {
  SupportedGameActions() : super([
    new AbstractGameAction(),
    new RollDice(),
    new StartGame(),

    // Trading
    new TradeBank(),
    new Trade(),
    new TradeOffer(),
    new RejectOffer(),
    new CounterOffer(),
    new AcceptOffer()
  ]);
}
/** Abstract conveniece implementation for a GameAction */
class AbstractGameAction implements GameAction {
  int id;
  int userId;
  int playerId;
  int gameId;
  User _user;
  Player _player;
  Date  performedTime;
  GamePhase gamePhase;
  TurnPhase turnPhase;

  AbstractGameAction();
  AbstractGameAction.data(JsonObject json) {
    GameActionData data = json;
    id = data.id;
    userId = data.userId;
    playerId = data.playerId;
    gameId = data.gameId;
  }

  bool get isServer() => this is ServerAction;
  bool get inGame() => false;
  bool get isGame() => true;
  bool get isLobby() => this is LobbyAction;
  bool get isTrade() => false;
  bool get mutatesGame() => false;

  bool allowedTurnPhase(TurnPhase tp) => false;
  bool allowedGamePhase(GamePhase gp) => false;

  User get user() => _user;
  set user(User u) {
    if (u != null) {

    }
    _user = u;
    userId = u.id;
  }

  Player get player() => _player;
  set player(Player p) {
    _player = p;
    playerId = p.id;
    user = p.user;
  }

  bool isValid() {
    Expect.isNotNull(id);
    Expect.isNotNull(player);
    Expect.isNotNull(playerId);
    Expect.isNotNull(user);
    Expect.isNotNull(userId);
    Expect.isNotNull(gamePhase);
    Expect.isNotNull(turnPhase);
    return true;
  }
  prepare(Game game) {
    user = game.userById(userId);
    player = game.playerById(playerId);
    gamePhase = game.currentGamePhase;
    if (gamePhase.isTurns) {
      turnPhase = game.phases.turns.turnPhase;
    }
  }
  perform(Game game) { }
  performServer(ServerGame serverGame) { }

  String toText() => "[${id}, ${Dartan.name(this)}, ${user.name}]";
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  // Copyable
  Dynamic copy([JsonObject data]) => new AbstractGameAction();
  // Jsonable
  JsonObject get data() {
    GameActionData data = new JsonObject();
    data.type = Dartan.name(this);
    data.id = id;
    data.playerId = playerId;
    data.userId = userId;
    data.gameId = gameId;
    return data;
  }
  bool equals(other) => other.id == id;

  // Testable
  test() {}
}
interface StartGameData extends GameActionData {
  GameData newGame;
}
/** A player starts the game */
class StartGame extends AbstractGameAction {
  Game newGame;
  bool allowedGamePhase(GamePhase gp) => gp.isLobby; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => false;

  StartGame();
  StartGame.data(JsonObject json) : super.data(json) {
    StartGameData data=json;
    newGame = data.newGame == null ? null :new Game.data(data.newGame);
  }
  perform(Game game) {
    game.start();
    super.perform(game);
  }
  performServer(ServerGame serverGame) {
    serverGame.prepareDevelopmentCards();
    serverGame.game.startedDateTime = new Date.now();
    serverGame.game.board.make(serverGame.random);
  }
  // Jsonable
  JsonObject get data() {
    StartGameData data = super.data;
    data.newGame = nullOrDataFrom(newGame);
    return data;
  }
  // Copyable
  StartGame copy([JsonObject data]) =>
      data == null ? new StartGame() : new StartGame.data(data);

  String toText() => "${user.name} started game ${newGame.name}";
}
interface RollDiceData extends GameActionData {
  DiceRollData rolledDice;
}
/** Roll the dice in various phases of the game */
class RollDice extends AbstractGameAction {
  DiceRoll rolledDice; // Diceroll, generated at the server

  bool allowedGamePhase(GamePhase gp) => gp.isDetermineFirstPlayer || gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isBeforeDiceRoll;

  RollDice();
  RollDice.data(JsonObject json) : super.data(json) {
    RollDiceData data = json;
    rolledDice = data.rolledDice == null ? null : new DiceRoll.data(data.rolledDice);
  }
  JsonObject get data() {
    RollDiceData data = super.data;
    data.rolledDice = nullOrDataFrom(rolledDice);
    return data;
  }

  perform(Game game) {
    if (game.currentGamePhase.isDetermineFirstPlayer) {
      game.phases.determinFirstPlayer.registerRoll(game, player, rolledDice);
    }
    if (game.currentGamePhase.isTurns) {
      if (rolledDice.total() == 7) {
        // queue robber/robbing
      } else {
        // distribute resources
      }
    }
  }
  performServer(ServerGame serverGame) {
    super.performServer(serverGame);
    rolledDice = serverGame.dice.roll();
  }
  // Copyable
  RollDice copy([JsonObject data]) =>
      data == null ? new RollDice() : new RollDice.data(data);
}