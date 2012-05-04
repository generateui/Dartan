/**
  Keeps track of tiles

  Vertice: one of the 6 points on a hexagon
  Edge: one of the six edges of an hexagon
  Cell: row+column coordinate of a tile
  
  Property events:
    -Rows (editor)
    -Columns (editor)
    -TileChanged (editor)
*/
class Board implements Observable {
  int columns = -1;
  int rows = -1;
  HashMap<Cell, Tile> _tilesByCell;
  HashSet<Vertice> _vertices;
  HashSet<Edge> _edges;
  ObservableHelper observable;
  HashSet<Vertice> _forbiddenVertices; // List of forbidden vertices, updated on town add/remove
  
  ListenableList<Territory> territories;
  
  HashSet<Vertice> get vertices() => _vertices;
  HashSet<Edge> get edges() => _edges;
  Set<Tile> get tiles() => _tilesByCell.getValues();
  HashMap<Vertice, List<VerticePiece>> verticePieces; // Keep 'em in a list, multiple pieces per vertice possible
  HashMap<Edge, EdgePiece> edgePieces;
  
  init() {
    _vertices = new HashSet<Vertice>();
    _tilesByCell = new HashMap<Cell, Tile>(); 
    _edges = new HashSet<Edge>();
    _forbiddenVertices = new HashSet<Vertice>();
    observable = new ObservableHelper();
  }
  
  Board([this.columns, this.rows]) {
    init();
    
    if (columns != null && rows != null) {
      if (columns > -1 && rows > -1) {
        from2DMatrix(rows, columns);
      }
    }
  }

  // Observable
  void onSetted(String property, PropertyChanged handler) { 
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {  
    observable.removeListener(property, handler);
  }

  /** Fills this instance with a grid of specified number of rows and columns */
  void from2DMatrix(int totalCols, int totalRows) {
    for (int column = 0; column < totalCols; column++)
      for (int row = 0; row < totalRows; row++) {
        Cell c = new Cell(row, column);
        Tile s = new Sea(c);
        addTile(s);
      }
  }
  
  /** Adds target [Tile] t and its edges + vertices */
  void addTile(Tile t) {
    _tilesByCell[t.cell] = t;
    _addVertices(t.cell);
    _addEdges(t.cell);
  }
  
  void changeTile(Tile newTile) {
    Tile old = _tilesByCell[newTile.cell];
    _tilesByCell[newTile.cell] = newTile;
    observable.fire("changeTile", old, newTile);
  }
  
  void _addEdges(Cell c) {
    _edges.addAll(c.edges);
  }
  
  void _addVertices(Cell c) {
    _vertices.addAll(c.vertices);
  }
  void addRoad(Road road) {
    edgePieces[road.edge] = road;
  }
  void removeRoad(Road road) {
    edgePieces[road.edge] = null;
  }
  /** All spots target player allowed to build his first town on */
  Set<Vertice> firstTownPossibilities() => _vertices.filter((Vertice v) => 
      landBuildable(v) && !_forbiddenVertices.contains(v));
  
  /** All spots target player allowed to build his second town on */
  Set<Vertice> secondTownPossibilities() => firstTownPossibilities();
  
  Set<Vertice> townPossibilities() {
    return null;
  }
  
  bool landBuildable(Vertice vertice) =>
      _tilesByCell[vertice.c1].canBuildOnLand ||
      _tilesByCell[vertice.c2].canBuildOnLand ||
      _tilesByCell[vertice.c3].canBuildOnLand;
  
  bool cellWithinBounds(Cell cell) =>
    cell.row < rows && cell.row > -1 && 
    cell.column < columns && cell.column > -1;
  
  /** False if any cell in the edge falls outside bounds */
  bool edgeWithinBounds(Edge edge) =>
    cellWithinBounds(edge.c1) && cellWithinBounds(edge.c2);

  /** False if any cell in the vertice falls outside bounds */
  bool verticeWithinBounds(Vertice vertice) =>
    cellWithinBounds(vertice.c1) && 
    cellWithinBounds(vertice.c2) && 
    cellWithinBounds(vertice.c3);
  
  /** Returns tile at specified row+column coordinates */
  Tile getAt(int row, int column) {
    if (row < 0 || column < 0 || row >= rows || column >=columns) {
      return null;
    }
    Cell c = new Cell(row, column);
    return _tilesByCell[c];
  }
  void test() {
    new BoardTest().test();
  }
}
