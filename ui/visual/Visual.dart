part of Dartan;

/** HTML widget has a root element */
abstract class AsElement {
  Element element;
}
abstract class Svg {
  svg.SvgElement get svgRoot;
}
abstract class Canvas {
  draw(CanvasRenderingContext ctx); // Delegated drawing function
}
/** Anything that needs to be drawn onto a surface, like a tile, chit et cetera */
abstract class Visual implements Svg, Canvas {
  show(); // render it
  hide(); // don't render it
  select(); // render as user selected
  deSelect(); // toggle off user selected
//  factory Visual.svg(String type) = VisualFactory.svg;
}
//class VisualFactory {
//  factory Visual.svg(String type) {
//    if (type=="Road") {
//      //return new RoadVisual.svg
//    }
//  }
//}
/** Draw a board on a canvas */
abstract class BoardVisual implements Observable, AsElement, Visual {
  showAllEdges();
  hideAllEdges();
  showAllVertices();
  hideAllVertices();
  showVertices(Collection<Vertice> vertices); // Only show target vertices subset
  showEdges(Collection<Edge> edges); // Only show target edges subset
  Board2D get board2d;
  Board board;
  BoardState get boardState;
  PortPickerVisual get portPicker;

  set boardState(BoardState s);

  Visual get currentVisual;
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

  double get bottomHeight => _h;
  double get halfHeight => _height / 2;
  double get halfWidth => _halfWidth;
  double get height => _height;
  double get partialHeight => _sideLength + _h;
  double get width=> _width;
  double get sideLength => _sideLength;
  double get edgeWidthFactor => _edgeWidthFactor;
  double get edgeHeightFactor => _edgeHeightFactor;
  double get strokeWidth => _strokeWidth;
  double get halfStrokeWidth => _strokeWidth /2;
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
  svg.SvgElement svgRoot;
  Board2D board2d;

  AbstractVisual.svg(this.board2d) { isSvg = true; }
  AbstractVisual.canvas(this.board2d) { isCanvas = true; }
  svg.SvgElement toSvg() => svgRoot;

  show() {
    isHidden = false;
    if (isSvg) {
      svgRoot.style.setProperty("display", "block");
    }
  }
  hide() {
    isHidden = true;
    if (isSvg) {
      svgRoot.style.setProperty("display", "none");
    }
  }
  void draw(CanvasRenderingContext ctx) {
    if (!isHidden) {
      // draw...
    }
  }
  select() {
    isSelected = true;
    if (isSvg) {
      svgRoot.attributes["stroke"] = "yellow";
    }
  }
  deSelect() {
    isSelected = false;
    if (isSvg) {
      svgRoot.attributes["stroke"] = "black";
    }
  }
}
class Point2D {
  double x;
  double y;
  Point2D(this.x, this.y);
}
