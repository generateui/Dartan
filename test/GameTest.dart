typedef actAndExpect();

class GameTest {
  Territory mainIsland;
  PredictableDice dice;
  List<Function> acts;
  List<Act> bacts;
  void test() {
    Game game = new Game();
    dice = new PredictableDice();
    acts = new List<actAndExpect>();

    game.board = createTestBoard();
    GameServer server = new LocalServer(game);
    ExpectServer expectServer = new ExpectServer(server);

    User spectator = new User(0, "Whooptidoo", "whoop@tidoo.com");
    User user1 = new User(1, "Piet", "piet@example.com");
    User user2 = new User(2, "Henk", "henk@example.com");
    User user3 = new User(3, "Truus", "truus@example.com");
    User leaverUser = new User(4, "SomeLeaver", "leaver@example.com");

    Player player1 = new Player(user1);
    Player player2 = new Player(user2);
    Player player3 = new Player(user3);
    Player leaver = new Player(leaverUser);

    /*
    joinSpectatorInLobby();
    joinPlayer1InLobby();
    joinPlayer2InLobby();
    joinPlayer3InLobby();
    joinAndLeavePlayerInLobby();
    makeNewGame();
    joinPlayer2InGame();
    joinPlayer3InGame();
    joinSpectatorInGame();
    changeGameSettings();
    setPlayersReadyToPlay();
    startGame();
    */
    acts.add(() {
      // Let the observer join
      JoinLobby spectatorJoin = new JoinLobby();
      spectatorJoin.userId = spectator.id;
      server.send(spectatorJoin);

      expectServer.hasUser(spectator);
      expectServer.hasUserAmount(1);
      expectServer.hasAction(spectatorJoin);
      expectServer.hasActionAmount(1);
    });

    acts.forEach( (f) { f(); });
//    for (actAndExpect f in acts) {
//      f();
//    }

    // Join the first 2 players
    JoinLobby join = new JoinLobby();
    join.userId = player1.user.id;
    server.send(join);
    JoinLobby join2 = new JoinLobby();
    join2.user.id = player2.user.id;
    server.send(join2);

    expectServer.hasUser(player1.user);
    expectServer.hasUser(player2.user);
    expectServer.hasUserAmount(3);
    expectServer.hasAction(join);
    expectServer.hasAction(join2);
    expectServer.hasActionAmount(2);

    // Test joining & leaving
    JoinLobby leaverJoin = new JoinLobby();
    leaverJoin.userId = leaver.user.id;
    server.send(leaverJoin);
    LeaveLobby leave = new LeaveLobby();
    leave.userId = leaver.user.id;
    server.send(leave);

    expectServer.hasNotUser(leaverUser);
    expectServer.hasUserAmount(3);
    expectServer.hasAction(leaverJoin);
    expectServer.hasAction(leave);
    expectServer.hasActionAmount(4);

    // Join the last player
    JoinLobby join3 = new JoinLobby();
    join3.userId = player3.user.id;
    server.send(join3);

    expectServer.hasUser(player3.user);
    expectServer.hasUserAmount(4);
    expectServer.hasAction(join3);
    expectServer.hasActionAmount(5);

    // Test a chat message
    SayGame say = new SayGame();
    say.message = "Merp. gotta get another player";
    say.userId = player1.user.id;
    server.send(say);

    expectServer.hasAction(say);
    expectServer.hasActionAmount(6);

    // Open a new game in the lobby
    NewGame newGame = new NewGame();
    newGame.userId = player1.user.id;
    server.send(newGame);

    game = newGame.game;
    ExpectGame expectGame = new ExpectGame(game);

    expectServer.hasGame(newGame.game);
    expectGame.hasUser(player1.user);
    expectGame.hasUserAmount(2);
    expectGame.hasHost(player1.user);

    // Join a player in the new game
    JoinGame joinGame1 = new JoinGame();
    joinGame1.userId = player2.user.id;
    joinGame1.gameId = game.id;
    server.send(joinGame1);

    expectGame.hasUser(player2.user);
    expectGame.hasUserAmount(2);

    // Join another player
    JoinGame joinGame2 = new JoinGame();
    joinGame2.userId = player3.user.id;
    joinGame2.gameId = game.id;
    server.send(joinGame1);

    expectGame.hasUser(player3.user);
    expectGame.hasUserAmount(3);

    // ... And join the observer
    SpectateGame spectateGame = new SpectateGame();
    spectateGame.userId = spectator.id;
    server.send(spectateGame);

    expectGame.hasSpectator(spectator);
    expectGame.hasSpectatorAmount(1);

    MaximumCardsInHandWhenSeven maxCardsInhand = new MaximumCardsInHandWhenSeven();
    maxCardsInhand.maxCards = 10;

    MaximumTradesPerTurn maxTrades = new MaximumTradesPerTurn();
    maxTrades.maxTrades = 4;

    ChangeSettings changeSettings = new ChangeSettings();
    changeSettings.settings = new List<GameSetting>.from([maxCardsInhand, maxTrades]);
    changeSettings.userId = player1.user.id;
    changeSettings.gameId = game.id;
    server.send(changeSettings);

    Expect.isTrue(game.settings.maximumCardsInHandWhenSeven == 10,
        "Expected 10 maxmimum cards in hand, got ${game.settings.maximumCardsInHandWhenSeven.maxCards}");
    Expect.isTrue(game.settings.maximumTradesPerTurn == 4,
        "Expected 4 maximum trades per turn, got ${game.settings.maximumTradesPerTurn.maxTrades}");

    ReadyToStart ready1 = new ReadyToStart();
    ready1.userId = player1.user.id;

    // Start the game
    StartGame start = new StartGame();
    start.userId = player1.user.id;
    server.send(start);
  }
  /** Create a test board */
  Board createTestBoard() {
    // Create a test board
    Board board = new Board();

    // Add sea around 5 rows
    board.addTile(new Sea(new Cell(0, 1))); // First row with sea
    board.addTile(new Sea(new Cell(0, 2)));
    board.addTile(new Sea(new Cell(0, 3)));
    board.addTile(new Sea(new Cell(0, 4)));
    board.addTile(new Sea(new Cell(1, 1))); // Second sea row
    board.addTile(new Sea(new Cell(1, 5)));
    board.addTile(new Sea(new Cell(2, 0))); // Third
    board.addTile(new Sea(new Cell(2, 5)));
    board.addTile(new Sea(new Cell(3, 0))); // Middle (fourth) row
    board.addTile(new Sea(new Cell(3, 6)));
    board.addTile(new Sea(new Cell(4, 0))); // Fifth
    board.addTile(new Sea(new Cell(4, 5)));
    board.addTile(new Sea(new Cell(5, 1))); // Sixth
    board.addTile(new Sea(new Cell(5, 5)));
    board.addTile(new Sea(new Cell(6, 1))); // Last row with sea tiles
    board.addTile(new Sea(new Cell(6, 2)));
    board.addTile(new Sea(new Cell(6, 3)));
    board.addTile(new Sea(new Cell(6, 4)));

    // Get a reference to a territory and add it to the board
    mainIsland = new MainIsland();
    board.territories.add(mainIsland);

    // Add every basic type of tile on a seperate row
    for (int col = 2; col < 5; col++) { // Add a row of Wheat/Field
      Chit chit = new Chit6();
      Field field = new Field(new Cell(1, col));
      field.chit = chit;
      field.territory = mainIsland;
    }
    for (int col = 1; col < 5; col++) { // Add a row of Ore/Mountain
      Chit chit = new Chit5();
      Tile tile = new Mountain(new Cell(2, col));
      tile.chit = chit;
      tile.territory = mainIsland;
    }
    for (int col = 1; col < 6; col++) { // Add a row of Clay/Hill
      Chit chit = new Chit4();
      Tile tile = new Hill(new Cell(3, col));
      tile.chit = chit;
      tile.territory = mainIsland;
    }
    for (int col = 1; col < 5; col++) { // Add a row of Timber/Forest
      Chit chit = new Chit3();
      Tile tile = new Forest(new Cell(4, col));
      tile.chit = chit;
      tile.territory = mainIsland;
    }
    for (int col = 2; col < 5; col++) { // Add a row of Sheep/Pasture
      Chit chit = new Chit2();
      Tile tile = new Pasture(new Cell(5, col));
      tile.chit = chit;
      tile.territory = mainIsland;
    }
    return board;
  }

  /** Have an environment where every second, a command is played, so the user
  an experience a test game as if he is spectating a game */
  void runGame() {
    /*
    Create a server
    Create a game
    Join 3 players
    Chat
    Start game
    Determine first player (host)
    Setup 6 towns
    Roll predictable dices

    Let one player win using all commands
    -trading
    -build town, build city, development point, LA, LR
    -move robber, rob player
    -play RB, Mono, Invention, 3 knights
    -loose cards
    -win game
    */
  }

}
class ExpectGame {
  Game game;
  ExpectGame(this.game);

  hasUser(User user) {
    Expect.isNotNull(byId(user.id, game.users),
      "Expected ${user.name} in the game");
  }
  hasUserAmount(int amount) {
    int actualAmount = game.users.length;
    Expect.isTrue(actualAmount == amount,
        "Expected game to have ${amount} users, but instead got ${actualAmount}");
  }
  hasHost(User host) {
    Expect.isNotNull(host);
    Expect.isNotNull(game.host, "Host of game is null, expected instance");
    Expect.isTrue(game.host == host,
        "Expected ${host.name} to be the host instead ${game.host.name} found as host");
  }
  hasSpectator(User spectator) {
    Expect.isNotNull(byId(spectator.id, game.spectators),
      "Expected game to have spectator ${spectator.name}.");
  }
  hasSpectatorAmount(int amount) {
    int actualAmount = game.spectators.length;
    Expect.isTrue(amount == actualAmount,
        "Expected ${amount} #spectators, got #${actualAmount}.");
  }
}
class ExpectServer {
  GameServer server;
  ExpectServer(this.server);

  hasUser(User user) {
    Expect.isNotNull(byId(user.id, server.lobby.users),
      "Expected ${user.name} in the lobby");
  }
  hasNotUser(User user) {
    Expect.isNull(byId(user.id, server.lobby.users),
      "Not expected ${user.name} in the lobby");
  }
  hasUserAmount(int amount) {
    int actualAmount = server.lobby.users.length;
    Expect.isTrue(actualAmount == amount,
        "Expected ${amount} #users, got ${actualAmount}");
  }
  hasAction(Action action) {
    Expect.isNotNull(byId(action.id, server.lobby.actions),
      "Expected ${action.toString()} to be in the log of actions");
  }
  hasActionAmount(int amount) {
    int actualAmount = server.lobby.actions.length;
    Expect.isTrue(actualAmount == amount,
        "Expected ${amount} #users, ${actualAmount} present");
  }
  hasGame(Game game) {
    Expect.isNotNull(byId(game.id, server.lobby.games),
      "Expected ${game.toString()} to be in the lobby");
  }
}
