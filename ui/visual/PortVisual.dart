class PortVisual extends AbstractVisual {
  SVGPolygonElement portElement;
  Port _port;
  Port get port() => _port;
  set port(Port p) {
    _port = p;
    updatePort();
  }
  PortVisual.svg(Board2D board2d) : super.svg(board2d) {
    portElement = new SVGElement.tag("polygon");
    svg = portElement;
  }
  void updatePort() {
    if (_port == null) {
      portElement.style.setProperty("display", "none");
    } else {
      portElement.style.setProperty("display", "block");
      portElement.attributes["fill"] = _port.color;
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

  void createPort() {

  }
}