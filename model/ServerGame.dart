/** A wrapped game instance with additional info like a 
developmentcard stack, dice, basically anything that needs 
randomization */
class ServerGame {
  Game game;
  List<DevelopmentCard> developmentCards;
  Random random;
  Dice dice;
  _init() {
    random = new ClientRandom();
    dice = new RandomDice(random);
    developmentCards = new List<DevelopmentCard>();
  }
  ServerGame(this.game) {
    _init();
  }
  void perform(GameAction action) {
    prepare(action);
    action.performServer(this); // prepare the action
    action.performedTime = new Date.now();
    game.performAction(action); // performing an action is done by the game instance itself
  }
  void prepare(Action action) {
    // Set appropriate user
    if (action.isServer) {
      action.user = Game.serverUser;
    } else {
      action.user = game.users.filter((User u) => u.id == action.userId).iterator().next();
    }
    // Set appropriate player if this action is performed in a game
    //if (action.isGame) {
      //action.player = game.players.filter((Player p) => p.id == action.playerId).iterator().next();
    //}
  }
  sendError(User user) {
    
  }
  void prepareDevelopmentCards() {
    
  }
}