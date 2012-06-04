/** Any action performed in a game */
interface GameAction extends Action {
  Player player;
  int playerId;
  TurnPhase turnPhase;
  GamePhase gamePhase;
  void prepare(Game game); // ensure all instance references have been acquired from id's
  void performServer(ServerGame serverGame); // prepare this
  void perform(Game game); // Mutate the game instance
  bool isValid();
  allowedTurnPhase(TurnPhase turnPhase);
  allowedGamePhase(GamePhase gamePhase);
}
class SupportedGameActions extends ImmutableL<GameAction> {
  SupportedGameActions() : super([new AbstractGameAction(), new RollDice(), new StartGame()]);
}
interface GameActionData extends JsonObject {
  String type;
  int id;
  int userId;
  int gameId;
  int playerId;
}
/** Abstract conveniece implementation for a GameAction */
class AbstractGameAction implements GameAction {
  int id;
  int gameId;
  User user;
  Player player;
  int playerId;
  int userId;
  Date  performedTime;
  GamePhase gamePhase;
  TurnPhase turnPhase;
  AbstractGameAction();

  bool get isServer() => this is ServerAction;
  bool get inGame() => false;
  bool get isGame() => true;
  bool get isLobby() => this is LobbyAction;
  bool get isTrade() => this is TradeAction;
  bool get mutatesGame() => false;

  bool allowedTurnPhase(TurnPhase tp) => false;
  bool allowedGamePhase(GamePhase gp) => false;
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
  initByData(JsonObject json) {
    GameActionData data = json;
    id = data.id;
    playerId = data.playerId;
    gameId = data.gameId;
    userId = data.userId;
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

  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  Dynamic copy([JsonObject data]) => new AbstractGameAction();
  toText() => "[${id}, ${Dartan.name(this)}, ${user.name}]";
  JsonObject get data() {
    RollDiceData data = new JsonObject();
    data.type = Dartan.name(this);
    data.id = id;
    data.playerId = playerId;
    data.userId = userId;
    return data;
  }

  test() {}
}
interface SayGameData extends GameActionData{
  String message;
}
class SayGame extends AbstractGameAction {
  String message;
  SayGame();
  SayGame.data(JsonObject json) {
    initByData(json);
    SayGameData data = json;
    message = data.message;
  }
  perform(Game game) {
    game.chats.add(this); // just add it to the chat history of the game
  }
  bool allowedGamePhase(GamePhase gp) => true; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => true;
  String toText() => "${user.name}: ${message}";
  // Jsonable
  JsonObject get data() {
    SayGameData data = super.data;
    data.message = message;
    return data;
  }
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
  StartGame.data(JsonObject json) {
    initByData(json);
    StartGameData data=json;
    newGame = new Game.data(data.newGame);
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
    data.newGame = newGame.data;
    return data;
  }
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
  RollDice.data(JsonObject json) {
    RollDiceData data = json;
    id = data.id;
    userId = data.userId;
    playerId = data.playerId;
    rolledDice = new DiceRoll.data(data.rolledDice);
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
  // Jsonable
  JsonObject get data() {
    RollDiceData data = super.data;
    data.rolledDice = rolledDice.data;
    return data;
  }
  // Copyable
  RollDice copy([JsonObject data]) =>
      data == null ? new RollDice() : new RollDice.data(data);
}