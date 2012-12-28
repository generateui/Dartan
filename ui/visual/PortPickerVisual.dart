part of Dartan;

class PortPickerVisual extends AbstractVisual {
  List<svg.PolygonElement> polygons;
  svg.GElement group;
  int selectedTriangle = 0;
  Tile selectedTile;
  PortPickerVisual(Board2D board2d) : super.svg(board2d) {
    group  = new svg.SvgElement.tag("g");
    for (int i=0; i < 6; i++) {
      Cell c = new Cell(0, 0);
      Point2D center = board2d.xyCellCenter(c);
      int j = i == 5 ? 0 : i+1;
      Point2D v1 = board2d.xyVertice(c.vertices[i]);
      Point2D v2 = board2d.xyVertice(c.vertices[j]);
      svg.PolygonElement p = new svg.SvgElement.tag("polygon");
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
      group.nodes.add(p);
    }
    svgRoot = group;
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