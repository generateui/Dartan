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