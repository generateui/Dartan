part of Dartan;

class TileMeasurementInfo {
  BoardVisual boardVisual;
  Board board;
  Cell fake;
  svg.SvgElement element;

  TileMeasurementInfo() {
    element = new svg.SvgElement.tag("svg");
    fake = new Cell(0,0);
    board = new Board();
    board.addTile(new Sea(fake));
    Board2D board2d = new Board2D(new Hexagon2D(50.0));
    board2d.margin = 50.0;

    boardVisual = new SvgBoard();
    boardVisual.board = board;
    boardVisual.hideAllEdges();
    boardVisual.hideAllVertices();
    double x = board2d.xyCell(fake).x;
    double y = board2d.xyCell(fake).y + board2d.hex2d.height;
    svg.SvgElement g = horizontalLine(x, y, board2d.hex2d.halfWidth, "halfwidth");
    element.nodes.add(boardVisual.element);
    element.nodes.add(g);
  }

  svg.GElement horizontalLine(num x, num y, num length, String t) {
    svg.GElement g = new svg.SvgElement.tag("g");
    num shortlength = 5;
    svg.LineElement shortLeft = new svg.SvgElement.tag("line");
    shortLeft.attributes = {
      "x1": x,
      "x2": x,
      "y1": y - (shortlength/2),
      "y2": y + (shortlength/2)
    };
    svg.LineElement shortRight = new svg.SvgElement.tag("line");
    shortRight.attributes = {
      //"fill": "black",
      "stroke-width":"2",
      "x1": x + length,
      "x2": x + length,
      "y1": y - (shortlength/2),
      "y2": y + (shortlength/2)
    };
    svg.LineElement long = new svg.SvgElement.tag("line");
    long.attributes = {
      "x1": x,
      "x2": x + length,
      "y1": y,
      "y2": y
    };
    svg.TextElement text = new svg.SvgElement.tag("text");
    text.attributes = {
       "x": x + 3.0,
       "y": y + 10.0,
       "fill": "black",
       "text": "woeis",
       "font-family":"Verdana",
       "font-size":"10"
    };
    text.text=t;
    element.nodes.add(shortLeft);
    element.nodes.add(shortRight);
    element.nodes.add(long);
    element.nodes.add(text);
    return g;
  }
}
