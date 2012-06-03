/** HTML widget has a root element */
interface AsElement {
  Element element;
}
interface Svg {
  SVGElement get svg();
}
interface Canvas {
  draw(CanvasRenderingContext ctx); // Delegated drawing function
}
/** Anything that needs to be drawn onto a surface, like a tile, chit et cetera */
interface Visual extends Svg, Canvas{
  show(); // render it
  hide(); // don't render it
  select(); // render as user selected
  deSelect(); // toggle off user selected
}

/** Draw a board on a canvas */
interface BoardVisual extends Observable, AsElement, Visual {
  showAllEdges();
  hideAllEdges();
  showAllVertices();
  hideAllVertices();
  showVertices(Collection<Vertice> vertices); // Only show target vertices subset
  showEdges(Collection<Edge> edges); // Only show target edges subset
  Board2D get board2d();
  Board board;
  BoardState get boardState();
  PortPickerVisual get portPicker();

  set boardState(BoardState s);

  Visual get currentVisual();
  set /* on */ currentVisual(Visual v);
}

/** 2D helper functions class for [BoardVisual] implementors */
class Hexagon2D {
  double _sideLength = 50.0;
  double _h;
  double _halfWidth;
  double _height;
  double _width;
  double _edgeWidthFactor = 0.8;  // times the sideLength
  double _edgeHeightFactor = 0.2;
  double _strokeWidth = 2.0;

  double get bottomHeight() => _h;
  double get halfHeight() => _height / 2;
  double get halfWidth() => _halfWidth;
  double get height() => _height;
  double get partialHeight() => _sideLength + _h;
  double get width()=> _width;
  double get sideLength() => _sideLength;
  double get edgeWidthFactor() => _edgeWidthFactor;
  double get edgeHeightFactor() => _edgeHeightFactor;
  double get strokeWidth() => _strokeWidth;
  double get halfStrokeWidth() => _strokeWidth /2;
  double _degreesToRadians(double degrees) => degrees * Math.PI / 180;

  Hexagon2D(this._sideLength) { calculateHexSizes(); }

  /** Calculates all hexagon properties based on the sideLength */
  void calculateHexSizes() {
    // TODO: come up with descriptive name for "h". BottomHeight is... suboptimal.
    _h = Math.sin(_degreesToRadians(30.0)) * _sideLength;
    _halfWidth = Math.cos(_degreesToRadians(30.0)) * _sideLength;
    _height = _sideLength + (2 * _h);
    _width = 2 * _halfWidth;
  }
}

/** 2D helper functions for drawing a board */
class Board2D {
  Hexagon2D hex2d;
  Board2D(this.hex2d);
  double margin = 10.0;

  /** 2D coordinate of target Cell c */
  Point2D xyCell(Cell c) {
    double x = (c.column * (hex2d.width + hex2d.strokeWidth)) + margin;
    double y = (c.row * (hex2d.partialHeight + hex2d.halfStrokeWidth)) + margin;
    if (c.row % 2 == 0) {
      x += hex2d.halfWidth;  // Alternate half the width of an hex
    } else {
      x-=hex2d.halfStrokeWidth;
    }
    return new Point2D(x, y);
  }

  /** 2D coordinate of center of a [Cell] */
  Point2D xyCellCenter(Cell cell) {
    Point2D xy = xyCell(cell);
    double x = xy.x;
    double y = xy.y;
    x += hex2d.halfStrokeWidth + hex2d.halfWidth;
    y += hex2d.halfStrokeWidth + hex2d.halfHeight;
    return new Point2D(x,y);
  }

  /** 2D coordinate of the topleftmost cell (c1) of vertice v */
  Point2D xyVertice(Vertice v) {
    Point2D point = xyCell(v.c1);  // x,y coordinate of the topmost HexLocation
    // Point is immutable, so cache the values
    double x = point.x;
    double y = point.y;
    assert (v != null);
    if (v.type == VerticeType.UpperRow1) {
      x += hex2d.halfWidth;
      y += hex2d.height;
    } else {
      x += hex2d.width;
      y += hex2d.partialHeight;
    }
    return new Point2D(x,y);
  }

  /** 2D coordinate of target [Edge] e, based on topleftmost [Cell] c. */
  Point2D xyEdge(Edge e, double rectWidth, double rectHeight) {
    // Because the position of an edge is measured by the topleftmost cell,
    // we only need to calculate 3 out of 6 edge positions.
    double halfRectHeight = rectHeight/2;
    double xMargin = (hex2d.sideLength - rectWidth) / 2;
    double d = Math.sqrt( (xMargin*xMargin) + (halfRectHeight*halfRectHeight));
    double p = ((1.0 - hex2d.edgeWidthFactor)/2) * hex2d.sideLength;
    // TODO: need better math.
    double x = xyCell(e.c1).x;
    double y = xyCell(e.c1).y;
    if (e.direction == EdgeDirection.SlopeDown) { // FAIL
      x += d;
      y += hex2d.partialHeight;
    }  else if (e.direction == EdgeDirection.SlopeUp) { // FAIL
      x += hex2d.halfWidth + d;
      y += hex2d.height - Math.sqrt(((d*d)-(p*p)));
    }  else if (e.direction == EdgeDirection.Vertical) {  // OK
      x += hex2d.width + halfRectHeight;
      y += hex2d.bottomHeight + xMargin;
    }
    return new Point2D(x, y);
  }
}

/** Abstract convenience implementation of a visual */
class AbstractVisual implements Visual {
  bool isSelected = false;
  bool isHidden = false;
  bool isSvg = false;
  bool isCanvas = false;
  SVGElement svg;
  Board2D board2d;

  AbstractVisual.svg(this.board2d) { isSvg = true; }
  AbstractVisual.canvas(this.board2d) { isCanvas = true; }
  SVGElement toSvg() => svg;

  show() {
    isHidden = false;
    if (isSvg)
      svg.style.setProperty("display", "block");
  }
  hide() {
    isHidden = true;
    if (isSvg)
      svg.style.setProperty("display", "none");
  }
  void draw(CanvasRenderingContext ctx) {
    if (!isHidden) {
      // draw...
    }
  }
  select() {
    isSelected = true;
    if (isSvg)
      svg.attributes["stroke"] = "yellow";
  }
  deSelect() {
    isSelected = false;
    if (isSvg)
      svg.attributes["stroke"] = "black";
  }
}

/** Vertice selection box on a canvas */
class VerticeVisual extends AbstractVisual {
  SVGCircleElement c;
  Vertice vertice;
  VerticeVisual.svg(Board2D board2d, this.vertice) : super.svg(board2d) {
    c = new SVGElement.tag("circle");
    isSvg = true;

    Point2D xy = board2d.xyVertice(vertice);
    c.attributes = {
      "cx":xy.x,
      "cy":xy.y,
      "r":board2d.hex2d._sideLength * 0.2,
      "fill":"orange"
    };
    svg=c;
  }
}
/** Draws a Chit using common SVG elements */
class ChitVisual extends AbstractVisual {
  SVGGElement group;
  SVGCircleElement circle;
  SVGGElement chanceGroup;
  Chit _chit;
  Cell _cell;
  SVGTextElement text;
  double radius;

  setChit(Chit chit, Cell c) {
    _cell=c;
    _chit=chit;
    updateChit();
  }

  ChitVisual.svg(Board2D b): super.svg(b) {
    group = new SVGElement.tag("g");
    chanceGroup = new SVGElement.tag("g");
    circle = new SVGElement.tag("circle");
    group.elements.add(circle);
    group.elements.add(chanceGroup);
    svg=group;
  }
  updateChit() {
    if (_chit == null) {
      group.style.display = "none";
    } else {
      group.style.display = "block";
      updateCircle();
      updateNumber();
    }
  }

  updateCircle() {
    Point2D point = board2d.xyCellCenter(_cell);
    String stroke = _chit.isRed ? "red" : "black";
    radius = board2d.hex2d.sideLength / 3.0;
    num strokeWidth = 3 + (isSelected ? 1.5 : 0.0);
    circle.attributes = {
      "cx": point.x,
      "cy": point.y,
      "r" : radius,
      "fill" : "lightyellow",
      "stroke": stroke,
      "stroke-width": "${strokeWidth}px"
    };
  }
  updateNumber() {
    if (text !=null) {
      text.remove();
    }
    String strText = _chit is RandomChit ? "R" : _chit.number;

    text = new SVGElement.svg("<text>$strText</text>");
    int size = 0;
    String fontWeight;
    if (_chit is RandomChit) {
      size = 12;
      fontWeight = "normal";
    } else {
      fontWeight = _chit.chance == 5 || _chit.chance ==  4 ? "bold" : "normal";
      size = 7 + _chit.chance;
    }

    Point2D point = board2d.xyCellCenter(_cell);

    String fontSize = size.toString();
    text.style.fontWeight = fontWeight;
    text.style.fontSize = "${fontSize}px";
    text.attributes["stroke"] = _chit.isRed ? "red" : "black";

    group.elements.add(text);

    // Center after BBox calc
    num w = text.getBBox().width;
    num h = text.getBBox().height;
    text.attributes["x"] = (point.x - (w/2.0)).toString();
    text.attributes["y"] = (point.y + (h/4.0)).toString();
  }
}
class PortVisual extends AbstractVisual {
  SVGPolygonElement portElement;
  Port _port;
  set port(Port p) {
    _port = p;
    updatePort();
  }
  PortVisual.svg(Board2D board2d) : super.svg(board2d) {
    portElement = new SVGElement.tag("polygon");
    svg = portElement;
  }
  void updatePort() {
    if (portElement == null && _port !=null)
      createPort();
    if (_port == null) {
      portElement.style.setProperty("display", "none");
    } else {
      portElement.style.setProperty("display", "block");
      portElement.attributes["fill"] = _port.color;
    }
  }

  void createPort() {
    Point2D center = board2d.xyCellCenter(port.seaCell);
    List<Vertice> vertices = port.seaCell.fromDirection(port.edgeDirection);
    Point2D p1 = board2d.xyVertice(vertices[0]);
    Point2D p2 = board2d.xyVertice(vertices[1]);
    portElement.attributes =  {
      "points": "${center.x}, ${center.y} ${p1.x}, ${p1.y} ${p2.x}, ${p2.y} ${center.x}, ${center.y}",
      "fill": _port.color
    };
  }
}
class TownVisual extends AbstractVisual {
  TownVisual.svg(Board2D board2d): super.svg(board2d);
}
/** Tile on a canvas */
class TileVisual extends AbstractVisual {
  SVGPathElement p;
  SVGGElement group;
  Tile tile;
  ChitVisual chit;
  PortVisual port;

  TileVisual.svg(Board2D board2d, this.tile) : super.svg(board2d) {
    group = new SVGElement.tag("g");

    createTileVisual();

    chit = new ChitVisual.svg(board2d);
    group.elements.add(chit.svg);
    tile.onSetted("chit", (Chit old, Chit newChit) {
      chit.setChit(tile.chit, tile.cell);
    });
    if (tile.hasChit) {
      chit.setChit(tile.chit, tile.cell);
    }

    port = new PortVisual.svg(board2d);
    group.elements.add(port.svg);
    tile.onSetted("port", (Port old, Port newPort) {
      port.port = newPort;
    });
    if (tile.hasPort) {
      port.port = tile.port;
    }

    svg = group;
  }
  createTileVisual() {
    p = new SVGElement.tag("polygon");
    Point2D xy = board2d.xyCell(tile.cell);
    p.attributes = {
       "fill": tile.color,
       "stroke":  "black",
       "stroke-width":  "2",
       "transform": "translate(${xy.x}, ${xy.y})",
       "points": """
         ${board2d.hex2d.width}, ${board2d.hex2d.bottomHeight}
         ${board2d.hex2d.width}, ${board2d.hex2d.partialHeight}
         ${board2d.hex2d.halfWidth}, ${board2d.hex2d.height}
         0, ${board2d.hex2d.partialHeight}
         0, ${board2d.hex2d.bottomHeight}
         ${board2d.hex2d.halfWidth}, 0
       """
     };
    group.elements.add(p);
  }
}

/** Edge on a canvas */
class EdgeVisual extends AbstractVisual {
  SVGRectElement r;
  Edge edge;

  EdgeVisual.svg(Board2D board2d, Edge edge) : super.svg(board2d) {
    r = new SVGElement.tag("rect");
    double rectw = board2d.hex2d.sideLength * 0.8; // ensure proportion to hexagon size
    double recth = board2d.hex2d.sideLength * 0.2;
    Point2D pos = board2d.xyEdge(edge, rectw, recth);
    double xc = pos.x + (rectw/2);
    double yc = pos.y + (recth/2);
    String rotate;
    if (edge.direction == EdgeDirection.Vertical) {
      rotate = "rotate(90  ${pos.x} ${pos.y})";
    } else if (edge.direction == EdgeDirection.SlopeDown) {
      rotate  = "rotate(30 ${pos.x} ${pos.y})";
    } else if (edge.direction == EdgeDirection.SlopeUp) {
      rotate = "rotate(-30  ${pos.x} ${pos.y})";
    }

    r.attributes = {
      "width": rectw,
      "height": recth,
      "fill": "yellow",
      "x": pos.x,
      "y": pos.y,
      "transform": "${rotate}"
    };
    svg=r;
  }
}

class PortPickerVisual extends AbstractVisual {
  List<SVGPolygonElement> polygons;
  SVGGElement group;
  int selectedTriangle = 0;
  Tile selectedTile;
  PortPickerVisual(Board2D board2d) : super.svg(board2d) {
    group  = new SVGElement.tag("g");
    for (int i=0; i < 6; i++) {
      Cell c = new Cell(0, 0);
      Point2D center = board2d.xyCellCenter(c);
      int j = i == 5 ? 0 : i+1;
      Point2D v1 = board2d.xyVertice(c.vertices[i]);
      Point2D v2 = board2d.xyVertice(c.vertices[j]);
      SVGPolygonElement p = new SVGElement.tag("polygon");
      p.attributes = {
        "fill": "purple",
        "stroke": 2,
        "points": "${center.x}, ${center.y} ${v1.x}, ${v1.y} ${v2.x}, ${v2.y} ${center.x}, ${center.y}"
      };
      p.on.click.add((Event e) {
        group.click();
      });
      p.on.mouseOver.add((Event e) {
        selectedTriangle = i;
      });
      p.on.mouseOut.add((Event e) {

      });
      group.elements.add(p);
    }
    svg = group;
  }
  setPosition(Tile tile) {
    selectedTile = tile;
    Point2D point = board2d.xyCell(tile.cell);
    double x = point.x;
    double y = point.y;
    Cell c = new Cell(0, 0);
    Point2D c1 = board2d.xyCell(c);
    x-=c1.x;
    y-=c1.y;
    group.attributes["transform"]= "translate(${x} ${y})";
  }
}

/** Renders a board onto a SVG surface */
class SvgBoard implements BoardVisual {
  Element element;
  Board2D board2d;
  Board _board;
  BoardState _boardState;
  SVGElement svg;
  SVGGElement vertices, edges, tiles; // G element to group them
  HashMap<Vertice, SVGElement> _elementsByVertice;
  HashMap<Edge, SVGElement> _elementsByEdge;
  HashMap<Tile, SVGElement> _elementsByTile;
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
    _elementsByEdge.getValues().forEach((Element e) => e.remove());
    _elementsByVertice.getValues().forEach((Element e) => e.remove());
    _elementsByTile.getValues().forEach((Element e) => e.remove());
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
    _elementsByEdge = new HashMap<Edge, SVGElement>();
    _elementsByTile = new HashMap<Tile, SVGElement>();
    _elementsByVertice = new HashMap<Vertice, SVGElement>();
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
      _elementsByTile[t] = visual.toSvg();
      tiles.elements.add(visual.toSvg());
      _addEventHandlers(visual);
    }
    for (Vertice v in board.vertices) {
      VerticeVisual visual = new VerticeVisual.svg(board2d, v);
      _elementsByVertice[v] = visual.toSvg();
      vertices.elements.add(visual.toSvg());
      _addEventHandlers(visual);
    }
    for (Edge e in board.edges) {
      EdgeVisual visual = new EdgeVisual.svg(board2d, e);
      _elementsByEdge[e] = visual.toSvg();
      edges.elements.add(visual.toSvg());
      _addEventHandlers(visual);
    }
  }

  tileChanged(Tile old, Tile newTile) {
    if (_elementsByTile.containsKey(old)) {
      _elementsByTile[old].remove();
    }
    TileVisual visual = new TileVisual.svg(board2d, newTile);
    tiles.elements.add(visual.toSvg());
    _elementsByTile[newTile] = visual.toSvg();
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
class Point2D {
  double x;
  double y;
  Point2D(this.x, this.y);
}
