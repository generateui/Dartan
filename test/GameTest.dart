class GameTest {
  void test() {
    
    Game game = new Game();
    
    
    /** Create a test board */
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
    board.addTile(new Sea(new Cell(3, 0))); // Middle row
    board.addTile(new Sea(new Cell(3, 6)));
    board.addTile(new Sea(new Cell(4, 0))); // Fifth
    board.addTile(new Sea(new Cell(4, 5)));
    board.addTile(new Sea(new Cell(5, 1))); // Sixth
    board.addTile(new Sea(new Cell(5, 5)));
    board.addTile(new Sea(new Cell(6, 1))); // Last row with sea tiles
    board.addTile(new Sea(new Cell(6, 2)));
    board.addTile(new Sea(new Cell(6, 3)));
    board.addTile(new Sea(new Cell(6, 4)));
    
    MainIsland mainIsland = new MainIsland();
    board.territories.add(mainIsland);
    
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
    Player player1 = new Player();
    Player player2 = new Player();
    Player player3 = new Player();
    
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
