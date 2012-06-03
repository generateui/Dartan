/** A wrapped game instance with additional info like a
developmentcard stack, dice, basically anything that needs
randomization */
class ServerGame {
  Game game; // Wrapped game
  List<DevelopmentCard> developmentCards; // Development cards in randomized order
  Random random; // Abstracted randomization generator
  Dice dice;
  List<User> users;
  _init() {
    random = new ClientRandom();
    dice = new RandomDice(random);
    users = new List<User>();
    developmentCards = new List<DevelopmentCard>();
  }
  ServerGame(this.game) {
    _init();
  }
  void perform(GameAction action) {
    action.performServer(this); // prepare the action
    action.performedTime = new Date.now();
    game.performAction(action); // performing an action is done by the game instance itself
  }
  void prepare(GameAction action) {
    // Set appropriate user
    if (action.isServer) {
      action.user = Game.serverUser;
    } else {
      action.user = byId(action.userId, users);
    }
    action.prepare(game);
    // Set appropriate player if this action is performed in a game
    //if (action.isGame) {
      //action.player = game.players.filter((Player p) => p.id == action.playerId).iterator().next();
    //}
  }
  void broadcast(Action action) {

  }
  void toUser(Action a, User u) {

  }
  void login(User user) {
    users.add(user);
  }
  sendError(User user) {

  }
  void prepareDevelopmentCards() {

  }
}