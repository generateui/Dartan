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
    
    board.addTile(new Field(new Cell(1, 2))); // Add a row of wheat
    board.addTile(new Field(new Cell(1, 3))); 
    board.addTile(new Field(new Cell(1, 4)));
    board.addTile(new Mountain(new Cell(2, 1))); // Add a row of Ore/mountian
    board.addTile(new Mountain(new Cell(2, 2))); 
    board.addTile(new Mountain(new Cell(2, 3)));
    board.addTile(new Mountain(new Cell(2, 4)));
    board.addTile(new Hill(new Cell(3, 1))); // Add a row of Brick
    board.addTile(new Hill(new Cell(3, 2))); 
    board.addTile(new Hill(new Cell(3, 3)));
    board.addTile(new Hill(new Cell(3, 4)));
    board.addTile(new Hill(new Cell(3, 5)));
    board.addTile(new Forest(new Cell(4, 1))); // Add a row of Timber
    board.addTile(new Forest(new Cell(4, 2))); 
    board.addTile(new Forest(new Cell(4, 3)));
    board.addTile(new Forest(new Cell(4, 4)));
    board.addTile(new Pasture(new Cell(5, 2))); // Add a row of Sheep
    board.addTile(new Pasture(new Cell(5, 3))); 
    board.addTile(new Pasture(new Cell(5, 4)));

    Player player = new Player();
    
  }
}
