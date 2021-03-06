part of Dartan;

/** Vertice selection box on a canvas */
class VerticeVisual extends AbstractVisual {
  svg.CircleElement c;
  Vertice vertice;
  VerticeVisual.svg(Board2D board2d, this.vertice) : super.svg(board2d) {
    c = new svg.SvgElement.tag("circle");
    isSvg = true;

    Point2D xy = board2d.xyVertice(vertice);
    c.attributes = {
      "cx":xy.x,
      "cy":xy.y,
      "r":board2d.hex2d._sideLength * 0.2,
      "fill":"orange"
    };
    svgRoot=c;
  }
}