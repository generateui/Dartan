/** Takes a game, a list of acts (action with expectations after performing)
and runs through all the acts consecutively. This can also be used for scripted
game testing while watching. */
class GameTester {
  bool automated = true;
  int delayInMilliseconds = 250;
  bool optimistic = true;
  Iterator it;
  List<Function> acts;
  int tested = 0;
  ScriptedGameTest _sgt;
  int timeHandle = 0;

  GameTester.manual(ScriptedGameTest sgt) {
    automated = false;
    _sgt = sgt;
    it = _sgt.acts.iterator();
    timeHandle = window.setTimeout(executeNext, delayInMilliseconds);
  }
  GameTester.auto(ScriptedGameTest sgt) {
    automated = true;
    _sgt = sgt;
    it = _sgt.acts.iterator();
    delayInMilliseconds = 0;
    executeNext();
  }
  executeNext() {
    if (it.hasNext()) {
      Function f = it.next();
      try {
        f();
        print("OK: Performed act #${tested.toString()}.");
        timeHandle = window.setTimeout(executeNext, delayInMilliseconds);
      } catch(Exception ex) {
        if (!optimistic) {
          window.clearTimeout(timeHandle); //just schedule next
        }
        print("Fail: test #${tested.toString()}: ${ex.toString()}");
      }
      tested++;
    } else {
      window.clearTimeout(timeHandle);
      print("That went better then expected: all ${tested} passed");
    }
  }
}

/** This should be seperated to client/game, client/lobby and
server/game & server/lobby. Preferably to a splitscreen view,
where visually monitoring the server state and client state is possible */
interface ScriptedGameTest {
  List<Function> get acts();
  Game game;
  Lobby clientLobby;
}

/** Scripted play of a game where states after performing actions is
    checked against a set of expectations.

    This script tests both the state at the server and that of the client.

    Let one player win using all commands
    -trading
    -build town, build city, development point, LA, LR
    -move robber, rob player
    -play RB, Mono, Invention, 3 knights
    -loose cards
    -win game
*/
class GameTest implements ScriptedGameTest {
  // Actual script. Placed on top of class (before var declr) for better readflow.
  performScript() {
    joinSpectatorInLobby();
    joinPlayer12InLobby();
    joinAndLeavePlayerInLobby();
    joinPlayer3InLobby();
    chatSomething();
    chatABitMore();
    openNewGame();
    joinNewGame();
    joinAnotherPlayer();
    joinSpectator();
    changeSettings();

    /* TODO
    setPlayersReadyToPlay();
    changeGameSettings();
    againSetPlayersReadyToPlay();
    startGame();
    rollDice x3
    switch player
    place town-road x4
    place town-road x4 backwards

    // Actual gameplay
    build towns, cities
    buy devs
    build roads
    trade
    play devs
    get road
    loose road to circular road
    get road back
    get army
    loose army
    get army back
    get 19+ resources
    roll 7
    get port, trade bank


    rollDice

    */
  }


  List<Function> acts;

  /// Direct references to ingame objects
  Territory mainIsland;
  PredictableDice dice;
  Game game;
  Lobby clientLobby;

  GameClient gameClient;
  LocalServer server;
  Game gameAtServer;
  Game gameAtClient;

  User user1, user2, user3;
  User spectator;
  User leaverUser;

  Player player1, player2, player3;
  Player leaver;

  /// Testing object references
  int currentActionId = 0;

  ExpectServer expectServer;
  ExpectGame expectClientGame;
  ExpectGame expectServerGame;
  ExpectLobby expectClientLobby;
  ExpectLobby expectServerLobby;

  GameTest() {
    /// Game references
    game = new Game();
    dice = new PredictableDice();
    acts = new List<Function>();

    game.board = createTestBoard();
    server = new LocalServer(game);
    gameClient = new GameClient();

    spectator = new User(0, "Whooptidoo", "whoop@tidoo.com");
    user1 = new User(1, "Piet", "piet@example.com");
    user2 = new User(2, "Henk", "henk@example.com");
    user3 = new User(3, "Truus", "truus@example.com");
    leaverUser = new User(4, "SomeLeaver", "leaver@example.com");

    player1 = new Player(user1);
    player2 = new Player(user2);
    player3 = new Player(user3);
    leaver = new Player(leaverUser);

    server.user = spectator;
    gameClient.server = server;
    gameClient.user = spectator;
    server.gameClient = gameClient;
    clientLobby = server.lobby;

    /// Test object references
    expectServer = new ExpectServer(server);
    expectClientLobby = new ExpectLobby(gameClient.lobby);
    expectServerLobby = new ExpectLobby(server.lobby);

    performScript();
  }
  joinSpectatorInLobby() { acts.add(() {   // Compact DSL syntax!
      JoinLobby spectatorJoin = new JoinLobby();
      spectatorJoin.user = spectator;
      gameClient.send(spectatorJoin);

      spectatorJoin.id = nextId();
      expectClientLobby.hasUser(spectator);
      expectClientLobby.hasUserAmount(1);
      expectClientLobby.actionIsPlayed(1, spectatorJoin);

      expectServerLobby.hasUser(spectator);
      expectServerLobby.hasUserAmount(1);
      expectServerLobby.actionIsPlayed(1, spectatorJoin);
  });}
  joinPlayer12InLobby() {  acts.add(() {
      JoinLobby join = new JoinLobby();
      join.user = player1.user;
      gameClient.send(join);
      JoinLobby join2 = new JoinLobby();
      join2.user = player2.user;
      gameClient.send(join2);

      join.id = nextId();
      join2.id = nextId();

      expectClientLobby.hasUser(player1.user);
      expectClientLobby.hasUser(player2.user);
      expectClientLobby.hasUserAmount(3);
      expectClientLobby.actionsArePlayed(currentActionId, [join, join2]);

      expectServerLobby.hasUser(player1.user);
      expectServerLobby.hasUser(player2.user);
      expectServerLobby.hasUserAmount(3);
      expectServerLobby.actionsArePlayed(currentActionId, [join, join2]);
  });}
  joinAndLeavePlayerInLobby() {  acts.add(() {
      JoinLobby leaverJoin = new JoinLobby();
      leaverJoin.user = leaver.user;
      gameClient.send(leaverJoin);

      LeaveLobby leave = new LeaveLobby();
      leave.user = leaver.user;
      gameClient.send(leave);

      leaverJoin.id = nextId();


      leave.id = nextId();;
      //expectLobby.hasNotUser(leaverUser);
      expectServer.hasNotUser(leaverUser);
      expectServer.hasUserAmount(3);
      expectServer.hasAction(leaverJoin);
      expectServer.hasAction(leave);
      expectServer.hasActionAmount(currentActionId);
  });}
  joinPlayer3InLobby() {  acts.add(() {
      JoinLobby join3 = new JoinLobby();
      join3.user = player3.user;
      gameClient.send(join3);

      join3.id = nextId();

      expectServer.hasUser(player3.user);
      expectServer.hasUserAmount(4);
      expectServer.hasAction(join3);
      expectServer.hasActionAmount(6);
    });
  }
  chatSomething() {
    acts.add(() {
      Say say = new Say.lobby();
      say.message = "Merp. gotta get another player";
      say.user = player1.user;
      gameClient.send(say);

      say.id = nextId();

      expectServer.hasAction(say);
      expectServer.hasActionAmount(7);
    });
  }
  chatABitMore() { acts.add(() {
    Say say = new Say.lobby();
    say.message = "Loei. Moei, koei!";
    say.user = player2.user;
    gameClient.send(say);

    Say say2 = new Say.lobby();
    say.message = "Gowaboei...";
    say.user = player2.user;
    gameClient.send(say);

    Say say3 = new Say.lobby();
    say.message = "Complatoei?";
    say.user = player3.user;
    gameClient.send(say);

    say.id = nextId();
    say2.id = nextId();
    say3.id = nextId();

    expectServer.hasActions([say, say2, say3]);
    expectServer.hasActionAmount(10);
  });}
  openNewGame() { acts.add(() {
    NewGame newGame = new NewGame();
    newGame.user = player1.user;
    Game ng = new Game();
    ng.name = "Lol";
    ng.board = createTestBoard();
    newGame.game = ng;
    gameClient.send(newGame);

    game = newGame.game;
    ExpectGame expectGame = new ExpectGame(game);

    newGame.id = nextId();

    gameAtClient = gameClient.lobby.games[0];
    gameAtServer = server.lobby.games[0];

    expectClientGame = new ExpectGame(gameAtClient);
    expectServerGame = new ExpectGame(gameAtServer);

    Expect.isFalse(gameAtServer.id == null,
        "Expected gama at server to have an id");
    Expect.isTrue(gameAtClient.id == gameAtServer.id,
        "Expected both games having equal id");

    expectServerGame.hasUser(user1);
    expectServerGame.hasHost(user1);
    expectServerLobby.actionIsPlayed(11, newGame);

    expectClientGame.hasUser(user1);
    expectClientGame.hasHost(user1);
    expectClientLobby.actionIsPlayed(11, newGame);

    Expect.isFalse(gameClient.lobby.games.isEmpty(), "empty list of games in client-lobby");
    Expect.isFalse(server.lobby.games.isEmpty(), "empty list of games in server-lobby");
    Expect.isFalse(server.lobby.games[0] == null);
  }); }
  joinNewGame() { acts.add(() {
    JoinGame joinGame1 = new JoinGame();
    joinGame1.user = player2.user;
    joinGame1.game = gameAtClient;
    print(gameAtClient.id);
    gameClient.send(joinGame1);

    joinGame1.id = nextId();

    expectClientGame.hasUser(player2.user);
    expectClientGame.hasUserAmount(2);
    expectServerGame.hasUser(player2.user);
    expectServerGame.hasUserAmount(2);
    expectServer.hasAction(joinGame1);
    expectServer.hasActionAmount(12);
  }); }
  joinAnotherPlayer() { acts.add(() {
    JoinGame joinGame2 = new JoinGame();
    joinGame2.user = user3;
    joinGame2.game = gameAtClient;
    gameClient.send(joinGame2);

    joinGame2.id = nextId();

    expectClientGame.hasUser(player3.user);
    expectClientGame.hasUserAmount(3);
    expectServerGame.hasUser(player3.user);
    expectServerGame.hasUserAmount(3);

    expectServerLobby.actionIsPlayed(13, joinGame2);
    expectClientLobby.actionIsPlayed(13, joinGame2);
  });}
  joinSpectator() { acts.add(() {
    SpectateGame spectateGame = new SpectateGame();
    spectateGame.user = spectator;
    spectateGame.game = gameAtClient;
    gameClient.send(spectateGame);

    spectateGame.id = nextId();

    expectClientGame.hasUser(spectator);
    expectClientGame.hasUserAmount(4);
    expectServerGame.hasUser(spectator);
    expectServerGame.hasUserAmount(4);

    expectServerLobby.actionIsPlayed(14, spectateGame);
    expectClientLobby.actionIsPlayed(14, spectateGame);
  }); }
  changeSettings() { acts.add(() {
    var changeSettingz = new ChangeSettings();
    changeSettingz.game = gameAtClient;
    changeSettingz.user = user1;
    var newSettings = new GameSettings();
    newSettings.maxCardsOn7 = 10;
    newSettings.maxTradesInTurn = 2;
    newSettings.withRobber = true;
    newSettings.playerAmount = 3;
    changeSettingz.settings = newSettings;
    gameClient.send(changeSettingz);

    changeSettingz.id = nextId();

    Expect.isTrue(gameAtClient.settings.equals(newSettings),
      "Expectsed equal settings");
    Expect.isTrue(gameAtServer.settings.equals(newSettings),
      "Expected equal settings");
  }); }
/*  CP template:



    TODO:

    // Join another player


    // ... And join the observer


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
    */

  int nextId() => currentActionId++;

  test() {
    GameTester gt = new GameTester.auto(this);
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
    Expect.isTrue(game.host.equals(host),
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
class ExpectLobby {
  Lobby lobby;
  ExpectLobby(this.lobby);

  actionIsPlayed(int withThisId, Action action) {
    hasAction(action);
    hasActionAmount(withThisId);
  }

  actionsArePlayed(int totalActionsPlayed, List<Action> actions) {
    for (Action action in actions) {
      hasAction(action);
    }
    hasActionAmount(totalActionsPlayed);
  }
  hasUser(User user) {
    Expect.isNotNull(byId(user.id, lobby.users),
      "Expected ${user.name} in the lobby");
  }
  hasNotUser(User user) {
    Expect.isNull(byId(user.id, lobby.users),
      "Not expected ${user.name} in the lobby");
  }
  hasUserAmount(int amount) {
    int actualAmount = lobby.users.length;
    Expect.isTrue(actualAmount == amount,
        "Expected ${amount} #users, got ${actualAmount}");
  }
  hasGame(Game game) {
    Expect.isNotNull(byId(game.id, lobby.games),
      "Expected ${game.toString()} to be in the lobby");
  }
  hasActions(List<Action> actions) {
    for (Action action in actions) {
      hasAction(action);
    }
  }
  hasActionAmount(int amount) {
    int actualAmount = lobby.actions.length;
    Expect.isTrue(actualAmount == amount,
        "Expected ${amount} #actions, ${actualAmount} present");
  }
  hasAction(Action action) {
    Expect.isNotNull(byId(action.id, lobby.actions),
      "Expected ${action.toString()} to be in the log of actions for the lobby");
  }
}
class ExpectServer {
  Server server;
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
  hasActions(List<Action> actions) {
    for (Action action in actions) {
      hasAction(action);
    }
  }
  hasAction(Action action) {
    Expect.isNotNull(byId(action.id, server.lobby.actions),
      "Expected ${action.toString()} to be in the log of actions");
  }
  hasActionAmount(int amount) {
    int actualAmount = server.lobby.actions.length;
    Expect.isTrue(actualAmount == amount,
        "Expected ${amount} #actions, ${actualAmount} present");
  }
  hasGame(Game game) {
    Expect.isNotNull(byId(game.id, server.lobby.games),
      "Expected ${game.toString()} to be in the lobby");
  }
}
