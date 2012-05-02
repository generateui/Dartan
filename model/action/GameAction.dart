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
/** Abstract conveniece implementation for a GameAction */
class AbstractGameAction implements GameAction {
  int id;
  User user;
  Player player;
  int playerId;
  int userId;
  Date  performedTime;
  GamePhase gamePhase;
  TurnPhase turnPhase;
  AbstractGameAction();
  bool get isFromServer() => false;
  bool get inGame() => false;
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
  bool allowedTurnPhase(TurnPhase tp) => false;
  bool allowedGamePhase(GamePhase gp) => false;
  bool get isServer() => this is ServerAction;
  bool get isGame() => true;
  bool get isLobby() => this is LobbyAction;
  bool get isTrade() => this is TradeAction;
  prepare(Game game) { 
    gamePhase = game.currentGamePhase;
  }
  perform(Game game) { }
  performServer(ServerGame serverGame) { }
  /** grabs user and player by userId and sets it */
  findUserAndPlayer(Game game) {
    user = game.userById(userId);
    player = game.playerById(playerId);
  }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  Action copy() => new AbstractGameAction();
  toText() => "[${id}, ${Dartan.name(this)}, ${user.name}]";
  test() {}
}
class SayGame extends AbstractAction {
  String message;
  perform(Game game) {
    game.chats.add(this); // just add it to the chat history of the game
  } 
  bool allowedGamePhase(GamePhase gp) => true; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => true;
  String toText() => "${user.name}: ${message}";
}
/** A player starts the game */
class StartGame extends AbstractGameAction {
  bool allowedGamePhase(GamePhase gp) => gp.isLobby; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => false;
  perform(Game game) {
    game.start();
    game.prepareDevelopmentCards();
    super.perform(game);
  }
  performServer(ServerGame serverGame) {
    serverGame.prepareDevelopmentCards();
    serverGame.game.startedDateTime = new Date.now();
  }
}
/** Roll the dice in various phases of the game */
class RollDice extends AbstractGameAction {
  DiceRoll rolledDice; // Diceroll, generated at the server
  bool allowedGamePhase(GamePhase gp) => gp.isDetermineFirstPlayer || gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isBeforeDiceRoll;
  prepare(Game game) {
    findUserAndPlayer(game);
  }
  perform(Game game) {
    if (game.currentGamePhase.isDetermineFirstPlayer) {
      DetermineFirstPlayerGamePhase dfp = game.currentGamePhase;
      dfp.registerRoll(game, player, rolledDice);
    }
    if (game.currentGamePhase.isTurns) {
      // produce and distribute resources
    }
  }
  performServer(ServerGame serverGame) {
    rolledDice = serverGame.dice.roll();
  }
}