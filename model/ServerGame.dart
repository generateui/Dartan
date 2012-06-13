/** A wrapped game instance with additional info like a
developmentcard stack, dice, basically anything that needs
randomization or stuff the client should not know about */
class ServerGame implements IdProvider {
  Game game; // Wrapped game
  Random random; // Abstracted randomization generator
  Dice dice;
  List<DevelopmentCard> developmentCards; // Development cards in randomized order
  IdProvider pieceIdentifier;  // Gives Ids to Game Actions
  IdProvider actionIdentifier;
  int _consecutiveId = 100;
  List<User> users;

  ServerGame(this.game) {
    pieceIdentifier = new IdProviderImpl.increment();
    actionIdentifier = new IdProviderImpl.increment();
    random = new ClientRandom();
    dice = new RandomDice(random);
    users = new List<User>();
    developmentCards = new List<DevelopmentCard>();
  }

  void perform(GameAction action) {
    action.prepare(game);
    action.performServer(this);
    game.performAction(action); // performing an action is done by the game instance itself
    action.performedTime = new Date.now();
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
    for (DevelopmentCard dc in game.settings.developmentCards) {
      DevelopmentCard copy = dc.copy(); // copy next from settings
      pieceIdentifier.identify(copy);   // give it an id
      developmentCards.add(copy);       // add it to this instance
      var dummy = new DummyDevelopmentCard();  // create/add dummy to the game
      game.developmentCards.add(dummy);
    }
  }
  identify(Identifyable withId) {
    withId.id = _consecutiveId++;
  }
}