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
class Board implements Observable, Hashable {
  int columns = -1;
  int rows = -1;
  String name;
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

  ListenableList<Tile> tilesBag;
  ListenableList<Chit> chitsBag;
  ListenableList<Port> portsBag;
  make(Random random) {

  }
  setStartingState() {

  }

  init() {
    _vertices = new HashSet<Vertice>();
    _tilesByCell = new HashMap<Cell, Tile>();
    _edges = new HashSet<Edge>();
    _forbiddenVertices = new HashSet<Vertice>();
    observable = new ObservableHelper();
    territories = new ListenableList<Territory>();

    tilesBag = new ListenableList<Tile>();
    chitsBag = new ListenableList<Chit>();
    portsBag = new ListenableList<Port>();
  }

  Board([this.columns, this.rows]) {
    init();

    if (columns != null && rows != null) {
      name = "Unnamed ${columns}x${rows}";
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

  /** Rerplace with newtile is cell occupied, or adds newTile if cell is free */
  void changeTile(Tile newTile) {
    Cell oldCell = newTile.cell;
    if (!_tilesByCell.containsKey(oldCell)) {
      addTile(newTile);
    } else {
      Tile old = _tilesByCell[newTile.cell];
      _tilesByCell[newTile.cell] = newTile;
      observable.fire("changeTile", old, newTile);
    }
  }

  bool noRedChitsAround(Tile tile) {
    for (Cell c in tile.cell.cells) {
      Tile withChit = _tilesByCell[c];
      if (withChit != null && withChit.hasChit && withChit.chit.isRed) {
        return false;
      }
    }
    return true;
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
  int hashCode() {
    return name.hashCode();
  }
  void test() {
    new BoardTest().test();
  }
}
/** Standard 4p board */
class Standard4p extends Board {
  Territory mainIsland;
  List<List<int>> randomFields = const [const[2, 3, 4], const[1, 2, 3, 4], const[1, 2, 3, 4, 5], const[1, 2, 3, 4], const[2, 3, 4]];

  Standard4p() : super() {
    mainIsland = new MainIsland();
    this.territories.add(mainIsland);
    name = "Standard 4player";

    makeRaandomFields();
    makeSeaSurrounding();
    makeRandomPorts();
  }

  addPortAt(int row, int col, int direction) {
    Cell first = new Cell(row, col);
    Tile st = _tilesByCell[first];
    st.port = new RandomPort(first, direction);
  }

  makeRandomPorts() {
    addPortAt(0,1,EdgePosition.Deg120180);
    addPortAt(0,3,EdgePosition.Deg120180);
    addPortAt(2,0,EdgePosition.Deg60120);
    addPortAt(3,6,EdgePosition.Deg240300);
    addPortAt(4,0,EdgePosition.Deg060);
    addPortAt(5,5,EdgePosition.Deg3000);
    addPortAt(1,5,EdgePosition.Deg180240);
    addPortAt(6,1,EdgePosition.Deg060);
    addPortAt(6,3,EdgePosition.Deg3000);
  }

  makeSeaSurrounding() {
    // Add sea around 5 rows
    this.addTile(new Sea(new Cell(0, 1))); // First row with sea
    this.addTile(new Sea(new Cell(0, 2)));
    this.addTile(new Sea(new Cell(0, 3)));
    this.addTile(new Sea(new Cell(0, 4)));
    this.addTile(new Sea(new Cell(1, 1))); // Second sea row
    this.addTile(new Sea(new Cell(1, 5)));
    this.addTile(new Sea(new Cell(2, 0))); // Third
    this.addTile(new Sea(new Cell(2, 5)));
    this.addTile(new Sea(new Cell(3, 0))); // Middle (fourth) row
    this.addTile(new Sea(new Cell(3, 6)));
    this.addTile(new Sea(new Cell(4, 0))); // Fifth
    this.addTile(new Sea(new Cell(4, 5)));
    this.addTile(new Sea(new Cell(5, 1))); // Sixth
    this.addTile(new Sea(new Cell(5, 5)));
    this.addTile(new Sea(new Cell(6, 1))); // Last row with sea tiles
    this.addTile(new Sea(new Cell(6, 2)));
    this.addTile(new Sea(new Cell(6, 3)));
    this.addTile(new Sea(new Cell(6, 4)));
  }
  setStartingState() {
    makeRaandomFields();
    makeRandomPorts();
  }
  newPortsBag() {
    portsBag.clear();
    portsBag.addAll([
      new TwoToOnePort(new Wheat()),
      new TwoToOnePort(new Timber()),
      new TwoToOnePort(new Clay()),
      new TwoToOnePort(new Sheep()),
      new TwoToOnePort(new Ore())
    ]);
    portsBag.addAll(copiesOf(new ThreeToOnePort(), 4));
  }
  newChitsBag() {
    chitsBag.clear();
    chitsBag.addAll([
      new Chit2(),
      new Chit3(), new Chit3(),
      new Chit4(), new Chit4(),
      new Chit5(), new Chit5(),
      new Chit6(), new Chit6(),
      new Chit8(), new Chit8(),
      new Chit9(), new Chit9(),
      new Chit10(), new Chit10(),
      new Chit11(), new Chit11(),
      new Chit12()]);
  }
  newTileBag() {
    List<Tile> newTiles = new List();
    newTiles.addAll(copiesOf(new Field(), 4));
    newTiles.addAll(copiesOf(new Mountain(), 3));
    newTiles.addAll(copiesOf(new Pasture(), 4));
    newTiles.addAll(copiesOf(new Forest(), 4));
    newTiles.addAll(copiesOf(new Hill(), 3));
    newTiles.add(new Desert());
    tilesBag.clear();
    tilesBag.addAll(newTiles);
  }
  makeRaandomFields() {
    for (int r = 0; r < randomFields.length; r++) {
      for (int c = 0; c < randomFields[r].length; c++) {
        int row = r + 1; // offset for first row of sea
        int col = randomFields[r][c];
        RandomTile tile = new RandomTile(new Cell(row, col));
        tile.chit = new RandomChit();
        tile.territory = mainIsland;
        this.changeTile(tile);
      }
    }
  }
  make(Random random) {
    replaceRandomTiles(random);
    placeChits(random);
    placePorts(random);
  }
  placePorts(Random random) {
    makeRandomPorts();
    newPortsBag();
    List<Tile> tilesWithRandomPort = tiles.filter((Tile t) => t.hasPort && t.port is RandomPort);
    for (Tile t in tilesWithRandomPort) {
      int intPick = random.intFromZero(portsBag.length-1);
      Port newPort = portsBag[intPick];
      newPort.setCellAndDirection(t.port.seaCell, t.port.edgeDirection);
      t.port = newPort;
      portsBag.removeRange(intPick, 1);
    }
  }

  placeChits(Random random) {
    newChitsBag();
    List<Tile> randomChitTiles = new List<Tile>();
        for (Tile t in tiles) {
          if (t.hasChit && t.chit is RandomChit) {
            randomChitTiles.add(t);
          }
        }

    List<Chit> hotChits = chitsBag.filter((Chit c) => c.isRed);
    List<Tile> tilesWithHotChit = new List<Tile>();

    // First place 4 red chits
    while (hotChits.length > 0) {
      int intPick = random.intFromZero(hotChits.length - 1);
      Chit t = hotChits[intPick];

      int intTilePick = random.intFromZero(randomChitTiles.length - 1);
      Tile tilePick = randomChitTiles[intTilePick];
      if (noRedChitsAround(tilePick)) {
        tilePick.chit = t;
        hotChits.removeRange(intPick, 1);
        randomChitTiles.removeRange(intTilePick, 1);
      }
    }

    chitsBag = new List.from(chitsBag.filter((Chit c) => not(c.isRed)));
    print("jeuj");
    for (Tile t in randomChitTiles) {
      int intChitPick = random.intFromZero(chitsBag.length-1);
      t.chit = chitsBag[intChitPick];
      chitsBag.removeRange(intChitPick, 1);
    }
  }
  bool not(bool b) => !b;

  replaceRandomTiles(Random random) {
    makeRaandomFields();
    newTileBag();
    List<RandomTile> rts = new List<RandomTile>(); // randomtiles to replace
    for (Tile t in tiles)
      if (t is RandomTile)
        rts.add(t);

    for (RandomTile rt in rts) {
      int intPick = random.intFromZero(tilesBag.length-1);
      Tile tilePick = tilesBag[intPick];
      tilePick.cell = rt.cell;
      tilePick.chit = rt.chit;
      tilesBag.removeRange(intPick, 1);
      this.changeTile(tilePick);
    }
    print("jeuuj");
  }
}
