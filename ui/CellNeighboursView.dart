/** Displays 6 neighbours with coordinates of target cell */
class CellNeighboursView {
  Element root; // root html element to add SVG element with board onto
  Board board; // the fake board with 7 tiles to display
  BoardVisual boardVisual; // visual to display the board
  SVGElement boardElement; // SVG element to put board on
  Cell fake; // fake cell to create a board from, using the cell itself and his neighbours
  List<Cell> cells; // All the fake cells to display (center + 6 neighbours)
  List<CellTextEntry> entries; // Keep track of SVG text elements by index
  CellNeighboursView([String elementId]) {
    root = document.query(elementId);
    boardElement = new SVGElement.tag("svg");
    boardElement.attributes = {
      "width": 200,
      "height": 200
    };
    cells = new List<Cell>();
    entries = new List<CellTextEntry>();
    fake = new Cell(1,1);
    board = new Board();
    for (Cell c in fake.cells)
      cells.add(c);
    cells.add(fake);
    for (Cell c in cells) {
      board.addTile(new Sea(c));
    }
    boardVisual = new SvgBoard(board, boardElement);
    boardVisual.hideAllEdges();
    boardVisual.hideAllVertices();
    for (Cell c in cells) {
      SVGTextElement text = new SVGElement.tag("text");
      text.attributes = {
        "x": boardVisual.board2d.xyCell(c).x + 5.0,
        "y": boardVisual.board2d.xyCell(c).y + boardVisual.board2d.hex2d.halfHeight,
        "fill": "white",
        "text": "woeis",
        "font-family":"Verdana",
        "font-size":"12"
      };
      text.text = "woei";
      entries.add(new CellTextEntry(c, text));
      boardElement.elements.add(text);
    }
    root.elements.add(boardElement);
  }
  void showCell(Cell cellToShow) {
    showText(entries[6].textElement, cellToShow, "C: ${cellToShow.toText()}");
    for (int i=0; i<6; i++) {
      showText(entries[i].textElement, cellToShow.cells[i], "${i} ${cellToShow.cells[i].toText()}");
    }
  }
  void showText(SVGTextElement te, Cell cell, String text) {
    te.text = text;
  }
}
class CellTextEntry {
  SVGTextElement textElement;
  Cell cell;
  CellTextEntry(this.cell, this.textElement);
}
