/** Anything that needs to be drawn onto a surface, like a tile, chit et cetera */
interface Visual {
  show(); // render it
  hide(); // don't render it
  select(); // render as user selected
  deSelect(); // toggle off user selected
  SVGElement toSvg(); // encapsualted SVG element
  draw(CanvasRenderingContext ctx); // Delegated drawing function
}

/** Draw a board on a canvas */
interface BoardVisual extends Observable {
  showAllEdges();
  hideAllEdges();
  showAllVertices();
  hideAllVertices();
  showVertices(Collection<Vertice> vertices); // Only show target vertices subset
  showEdges(Collection<Edge> edges); // Only show target edges subset
  Board2D get board2d();
  Board get board();
  Visual get currentVisual();
  BoardState get boardState();
  PortPickerVisual get portPicker();
  set boardState(BoardState s);
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
    if (v.type() == VerticeType.UpperRow1) {
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
      //"transform": "translate(${xyc.x}, ${xyc.y})"
    };
    svg=c;
  }
}

/** Tile on a canvas */
class TileVisual extends AbstractVisual {
  SVGPathElement p;
  SVGGElement group;
  SVGPolygonElement port;
  Tile tile;
  TileVisual.svg(Board2D board2d, this.tile) : super.svg(board2d) {
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
    
    group = new SVGElement.tag("g");

    tile.onSetted("port", (Port old, Port newPort) {
      updatePort();
    });
    if (tile.port != null) {
      createPort();
      updatePort();
    }
    group.elements.add(p);
    svg = group;
  }
  void updatePort() {
    if (port == null && tile.port !=null)
      createPort();
    if (tile.port == null) {
      port.style.setProperty("display", "none");
      port.remove();
      port=null;
    } else {
      port.style.setProperty("display", "block");
      port.attributes["fill"] = tile.port.color;
      port.attributes["transform"] = "rotate(${tile.port.edgeDirection * 30.0})";
    }
  }
  void createPort() {
    Point2D center = board2d.xyCellCenter(tile.cell);
    port = new SVGElement.tag("polygon");
    Point2D v1 = board2d.xyVertice(tile.cell.vertices[0]);
    Point2D v2 = board2d.xyVertice(tile.cell.vertices[1]);
    port.attributes =  {
      "points": "${center.x}, ${center.y} ${v1.x}, ${v1.y} ${v2.x}, ${v2.y} ${center.x}, ${center.y}"                  
    };
  }
  void showPortIfNecesary() {

  }
  void draw(CanvasRenderingContext c2) {
    //var c2 = ctx.getContext('2d');
//    c2.fillStyle = '#f00';
//    c2.beginPath();
//    c2.moveTo(_halfWidth, 0);
//    
//    c2.lineTo(_width, bottomHeight);
//    c2.lineTo(_width, partialHeight);
//    c2.lineTo(_halfWidth, height);
//    c2.lineTo(0, partialHeight);
//    c2.lineTo(0, bottomHeight);
//    c2.lineTo(halfWidth, 0);
//    
//    c2.closePath();
//    c2.fill();
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
  Board2D board2d;
  Board board;
  BoardState _boardState;
  SVGElement root;
  SVGGElement vertices, edges, tiles; // G element to group them
  HashMap<Vertice, SVGElement> _elementsByVertice;
  HashMap<Edge, SVGElement> _elementsByEdge;
  HashMap<Tile, SVGElement> _elementsByTile;
  ObservableHelper observable;
  Visual _currentVisual;
  PortPickerVisual portPicker;
  
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
  
  void showAllEdges() { edges.style.setProperty("display", "block"); }
  void hideAllEdges() { edges.style.setProperty("display", "none"); }
  void showAllVertices() { vertices.style.setProperty("display", "block"); }
  void hideAllVertices() { vertices.style.setProperty("display", "none"); }
  void showVertices(Collection<Vertice> verticesToShow){}
  void showEdges(Collection<Edge> edgesToShow) {}
  
  SvgBoard(this.board, [this.root, this.board2d]) {
    _elementsByEdge = new HashMap<Edge, SVGElement>();
    _elementsByTile = new HashMap<Tile, SVGElement>();
    _elementsByVertice = new HashMap<Vertice, SVGElement>();
    observable = new ObservableHelper();
    boardState = new SelectOnHover();
    boardState.boardVisual = this;
    //boardState = new ChangeTile();
    boardState.boardVisual = this;
    if (board2d==null)
      board2d = new Board2D(new Hexagon2D(35.0));
    portPicker = new PortPickerVisual(board2d);
    portPicker.hide();
    tiles = new SVGElement.tag("g");
    vertices = new SVGElement.tag("g");
    edges = new SVGElement.tag("g");
    
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
    
    observeBoard();
    
    root.elements.add(tiles);
    root.elements.add(edges);
    root.elements.add(vertices);
    root.elements.add(portPicker.toSvg());
  }
  
  observeBoard() {
    board.onSetted("changeTile", (Tile old, Tile newTile) {
      _elementsByTile[old].remove();
      TileVisual visual = new TileVisual.svg(board2d, newTile);
      tiles.elements.add(visual.toSvg());
      _elementsByTile[newTile] = visual.toSvg();
      _addEventHandlers(visual);
      
    });
  }
  _addEventHandlers(Visual v) {
    _addMouseOut(v);
    _addMouseOver(v);
    _addMouseClick(v);
  }
  _addMouseClick(Visual v) {
    v.toSvg().on.click.add((Event e) {
      _boardState.click(v);
    });
  }
  _addMouseOver(Visual v) {
    v.toSvg().on.mouseOver.add((Event e) {
      _boardState.mouseOver(v);
    });
  }
  _addMouseOut(Visual v) {
    v.toSvg().on.mouseOut.add((Event e) {
      _boardState.mouseOut(v);
    });
  }
  // Observable implementation
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
}

class CanvasBoard {
  CanvasElement shadow; // Shadow canvas element to do hittesting
  Map<int, Visual> _visualsByColor; // map colors to visual elements on shadow canvas
  CanvasElement canvas; // Actual drawing canvas
  //CanvasDrawingContext ctx;
  
}

class BoardInfoView {
  BoardVisual boardVisual; // Actual board
  Board board;
  CellNeighboursView cellNeighbours;
  
  BoardInfoView(this.board) {
    boardVisual = new SvgBoard(board, document.query("#bord2"));
    Element svgDiv = document.query("#svgBoardLeftColumn");
    SVGElement svg = new SVGElement.tag("svg");
    svg.attributes = {
      "width": 200,
      "height": 200
    };
    TileMeasurementInfo tmi = new TileMeasurementInfo(svg);
    
    // Show neighbours of hovered tile
    cellNeighbours = new CellNeighboursView("#svgBoardLeftColumn");
    boardVisual.onSetted("currentVisual", (Visual old, TileVisual newValue) {
      if (newValue is TileVisual)
        cellNeighbours.showCell(newValue.tile.cell);
    });
    
    // Some buttons to switch edges/vertices groups on/off
    ButtonElement buttonShowEdges = new Element.html("<button>show edges</button>");
    buttonShowEdges.on.click.add((Event e) { 
      boardVisual.showAllEdges();
    });
    svgDiv.elements.add(buttonShowEdges);
    
    ButtonElement buttonHideEdges = new Element.html("<button>hide edges</button>");
    buttonHideEdges.on.click.add((Event e) { 
      boardVisual.hideAllEdges();
    });
    svgDiv.elements.add(buttonHideEdges);
    
    ButtonElement buttonShowVertices = new Element.html("<button>show vertices</button>");
    buttonShowVertices.on.click.add((Event e) { 
      boardVisual.showAllVertices();
    });
    svgDiv.elements.add(buttonShowVertices);
    
    ButtonElement buttonHideVertices= new Element.html("<button>hide vertices</button>");
    buttonHideVertices.on.click.add((Event e) { 
      boardVisual.hideAllVertices();
    });
    svgDiv.elements.add(buttonHideVertices);
    svgDiv.elements.add(svg);
  }
}

class Point2D {
  double x;
  double y;
  Point2D(this.x, this.y);
}
