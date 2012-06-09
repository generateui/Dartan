/** Renders a board onto a SVG surface */
class SvgBoard implements BoardVisual {
  Element element;
  SVGElement svg;

  Board2D board2d;
  Board _board;
  BoardState _boardState;
  SVGGElement vertices, edges, tiles; // G element to group them

  // Basically map all elements
  // Should e.g. towns/cities in seperate lists or generic list?
  HashMap<Piece, Visual> _elementsByPiece;
  HashMap<Vertice, VerticeVisual> _elementsByVertice;
  HashMap<Edge, EdgeVisual> _elementsByEdge;
  HashMap<Tile, TileVisual> _elementsByTile;

  addPiece(Piece piece) {
    _elementsByPiece = new HashMap<Piece, Visual>();
  }

  ObservableHelper observable;
  Visual _currentVisual;
  PortPickerVisual portPicker;

  Board /* on */ get board() => _board;
  set /* on */ board(Board b) {
    Board old = _board;
    clear();
    _board = b;
    if (board != null) {
      createElements();
      board.onSetted("changeTile", tileChanged);
    }
    observable.fire("board", old, _board);
  }
  clear() {
    _elementsByEdge.getValues().forEach((e) => e.svg.remove());
    _elementsByVertice.getValues().forEach((e) => e.svg.remove());
    _elementsByTile.getValues().forEach((e) => e.remove());
    _elementsByEdge.clear();
    _elementsByTile.clear();
    _elementsByVertice.clear();
    tiles.elements.clear();
    edges.elements.clear();
    vertices.elements.clear();

    if (_board != null) {
      _board.offSetted("changeTile", tileChanged);
    }
  }

  Visual get currentVisual() => _currentVisual;
  void set /* on */ currentVisual(Visual v) {
    Visual old = _currentVisual;
    _currentVisual = v;
    observable.fire("currentVisual", old, v);
  }

  BoardState get boardState() => _boardState;
  set /* on */ boardState(BoardState bs) {
    if (_boardState != null)
      _boardState.end();
    BoardState old = _boardState;
    bs.boardVisual = this;
    _boardState = bs;
    _boardState.start();
    observable.fire("boardState", old, bs);
  }

  showAllEdges() {
    edges.style.setProperty("display", "block");
    }
  hideAllEdges() {
    edges.style.display = "none";
    edges.style.setProperty("display", "none");
  }
  showAllVertices() { vertices.style.setProperty("display", "block"); }
  hideAllVertices() { vertices.style.setProperty("display", "none"); }
  showVertices(Collection<Vertice> verticesToShow){}
  showEdges(Collection<Edge> edgesToShow) {}

  SvgBoard() {
    svg = new SVGElement.tag("svg");
    element = svg;
    _elementsByEdge = new HashMap<Edge, EdgeVisual>();
    _elementsByTile = new HashMap<Tile, TileVisual>();
    _elementsByVertice = new HashMap<Vertice, VerticeVisual>();
    observable = new ObservableHelper();
    boardState = new SelectOnHover();
    boardState.boardVisual = this;

    board2d = new Board2D(new Hexagon2D(35.0));

    portPicker = new PortPickerVisual(board2d);
    portPicker.hide();

    tiles = new SVGElement.tag("g");
    vertices = new SVGElement.tag("g");
    edges = new SVGElement.tag("g");

    svg.elements.add(tiles);
    svg.elements.add(edges);
    svg.elements.add(vertices);
    svg.elements.add(portPicker.toSvg());
  }
  createElements() {
    for (Tile t in board.tiles) {
      TileVisual visual = new TileVisual.svg(board2d, t);
      _elementsByTile[t] = visual;
      tiles.elements.add(visual.svg);
      _addEventHandlers(visual);
    }
    for (Vertice v in board.vertices) {
      VerticeVisual visual = new VerticeVisual.svg(board2d, v);
      _elementsByVertice[v] = visual;
      vertices.elements.add(visual.svg);
      _addEventHandlers(visual);
    }
    for (Edge e in board.edges) {
      EdgeVisual visual = new EdgeVisual.svg(board2d, e);
      _elementsByEdge[e] = visual;
      edges.elements.add(visual.svg);
      _addEventHandlers(visual);
    }
  }

  tileChanged(Tile old, Tile newTile) {
    if (_elementsByTile.containsKey(old)) {
      _elementsByTile[old].remove();
    }
    TileVisual visual = new TileVisual.svg(board2d, newTile);
    tiles.elements.add(visual.toSvg());
    _elementsByTile[newTile] = visual;
    _addEventHandlers(visual);
  }
  _addEventHandlers(Visual v) {
    v.svg.on.click.add((Event e) {
      _boardState.click(v);
    });
    v.svg.on.mouseOver.add((Event e) {
      _boardState.mouseOver(v);
    });
    v.svg.on.mouseOut.add((Event e) {
      _boardState.mouseOut(v);
    });
  }
  show() {
    svg.style.display = "block";
  }
  hide() {
    svg.style.display = "none";
  }
  select() {} // render as user selected
  deSelect() {} // toggle off user selected
  draw(CanvasRenderingContext ctx) {} // Delegated drawing function
  // Observable implementation
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
}