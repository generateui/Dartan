/** A wrapped game instance with additional info like a
developmentcard stack, dice, basically anything that needs
randomization */
class ServerGame implements IdProvider {
  Game game; // Wrapped game
  Random random; // Abstracted randomization generator
  Dice dice;
  List<DevelopmentCard> developmentCards; // Development cards in randomized order
  IdProvider pieceIdentifier;
  //IdProvider pieceIdentifier;
  int _consecutiveId = 100;
  List<User> users;

  ServerGame(this.game) {
    random = new ClientRandom();
    dice = new RandomDice(random);
    users = new List<User>();
    developmentCards = new List<DevelopmentCard>();
  }

  performServer(GameAction action) {
    action.performServer(this);
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
    }
    action.prepare(game);
    // Set appropriate player if this action is performed in a game
    //if (action.isGame) {
      //action.player = game.players.filter((Player p) => p.id == action.playerId).iterator().next();
    //}
  }
  identifyAllPieces() {
    for (Tile tile in game.board.tiles) {
      pieceIdentifier.identify(tile);
      if (tile.hasPort) {
        pieceIdentifier.identify(tile.port);
      }
      if (tile.hasChit) {
        pieceIdentifier.identify(tile.port);
      }
      if (tile.hasTerritory) {

      }
    }
  }
  prepareDevelopmentCards() {

  }
  identify(Identifyable withId) {
    withId.id = _consecutiveId++;
  }
}