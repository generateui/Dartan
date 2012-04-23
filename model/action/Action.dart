interface Action extends Hashable, Copyable, Identifyable, Testable {
  bool get isFromServer();
  bool get inGame(); // True if the action belongs to a game
  User user;
  int userId;
  Player player;
  int playerId;
  Date performedTime;
  TurnPhase turnPhase;
  GamePhase gamePhase;
  void prepare(Game game); // ensure all instances have been acquired from id's
  void perform(Game game);
  void performServer(ServerGame serverGame);
  bool valid(Game game);
  allowedTurnPhase(TurnPhase turnPhase);
  allowedGamePhase(GamePhase gamePhase);
  toText();
}
class SupportedActions extends ImmutableL {
  SupportedActions() : super([new AbstractAction(), new Say(), new StartGame(), new RollDice()]);
}
class AbstractAction implements Action {
  int id;
  User user;
  Player player;
  int playerId;
  int userId;
  Date  performedTime;
  GamePhase gamePhase;
  TurnPhase turnPhase;
  bool get isFromServer() => false;
  bool get inGame() => false;
  bool valid(Game game) => false;
  bool allowedTurnPhase(TurnPhase tp) => false;
  bool allowedGamePhase(GamePhase gp) => false;
  AbstractAction();
  prepare(Game game) { }
  perform(Game game) { }
  performServer(ServerGame serverGame) { }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  Action copy() => new AbstractAction();
  toText() => "[${id}, ${Dartan.name(this)}, ${user.name}]";
  test() {}
}
class Say extends AbstractAction {
  String message;
  perform(Game game) {
    game.chats.add(this); // just add it to the chat history of the game
  } 
  bool get inGame() => true;
  bool allowedGamePhase(GamePhase gp) => true; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => true;
}
class StartGame extends AbstractAction {
  bool allowedGamePhase(GamePhase gp) => gp.isLobby; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => false;
  bool get inGame() => true;
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
class RollDice extends AbstractAction {
  DiceRoll rolledDice;
  bool allowedGamePhase(GamePhase gp) => gp.isDetermineFirstPlayer; // chatting is always allowed
  bool allowedTurnPhase(TurnPhase tp) => tp.isBeforeDiceRoll;
  perform(Game game) {
    if (game.currentGamePhase.isDetermineFirstPlayer) {
      DetermineFirstPlayerGamePhase dfp = game.currentGamePhase;
      dfp.registerRoll(game, player, rolledDice);
    }
  }
  performServer(ServerGame serverGame) {
    int first = serverGame.random.intFromOne(6);
    int second = serverGame.random.intFromOne(6);
    rolledDice = new DiceRoll(first, second);
  }
}