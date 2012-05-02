class GameTest {
  Territory mainIsland;
  PredictableDice dice;
  void test() {
    Game game = new Game();
    dice = new PredictableDice();
    
    game.board = createTestBoard();
    GameServer server = new LocalServer(game);
    
    User observer = new User(0, "Whooptidoo", "whoop@tidoo.com");
    User user1 = new User(1, "Piet", "piet@example.com");
    User user2 = new User(2, "Henk", "henk@example.com");
    User user3 = new User(3, "Truus", "truus@example.com");
    User leaverUser = new User(4, "SomeLeaver", "leaver@example.com");
    Player player1 = new Player(user1);
    Player player2 = new Player(user2);
    Player player3 = new Player(user3);
    Player leaver = new Player(leaverUser);
    
    // Let the observer join
    JoinLobby observerJoin = new JoinLobby();
    observerJoin.userId = observer.id;
    server.send(observerJoin);
    
    // Join the first 2 players
    JoinLobby join = new JoinLobby();
    join.userId = player1.user.id;
    server.send(join);
    JoinLobby join2 = new JoinLobby();
    join2.user.id = player2.user.id;
    server.send(join2);

    // Test joining & leaving
    JoinLobby leaverJoin = new JoinLobby();
    leaverJoin.userId = leaver.user.id;
    server.send(leaverJoin);
    LeaveLobby leave = new LeaveLobby();
    leave.userId = leaver.user.id;
    server.send(leave);
    
    // Join the last player
    JoinLobby join3 = new JoinLobby();
    join3.userId = player3.user.id;
    server.send(join3);
    
    // Test a chat message
    SayGame say = new SayGame();
    say.message = "Merp. gotta get another player";
    say.userId = player1.user.id;
    server.send(say);
    
    // Start the game
    StartGame start = new StartGame();
    start.userId = player1.user.id;
    server.send(start);
    
  }
  /** Create a test board */
  Board createTestBoard() {
    // Create a test board 
    Board board = new Board();
    
    // Standard Board
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
  
}