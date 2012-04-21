class TileMeasurementInfo {
  BoardVisual boardVisual;
  Board board;
  Cell fake;
  SVGElement root;
  
  TileMeasurementInfo(this.root) {
    fake = new Cell(0,0); 
    board = new Board();
    board.addTile(new Sea(fake));
    Board2D board2d = new Board2D(new Hexagon2D(50.0));
    board2d.margin = 50.0;
    
    boardVisual = new SvgBoard(board, root, board2d);
    boardVisual.hideAllEdges();
    boardVisual.hideAllVertices();
    double x = board2d.xyCell(fake).x;
    double y = board2d.xyCell(fake).y + board2d.hex2d.height;
    SVGElement g = horizontalLine(x, y, board2d.hex2d.halfWidth, "halfwidth");
    root.elements.add(g);
  }
  
  SVGGElement horizontalLine(num x, num y, num length, String t) {
    SVGGElement g = new SVGElement.tag("g");
    num shortlength = 5;
    SVGLineElement shortLeft = new SVGElement.tag("line");
    shortLeft.attributes = {
      "x1": x,                    
      "x2": x,                     
      "y1": y - (shortlength/2),       
      "y2": y + (shortlength/2)                      
    };
    SVGLineElement shortRight = new SVGElement.tag("line");
    shortRight.attributes = {
      //"fill": "black",
      "stroke-width":"2",
      "x1": x + length,                    
      "x2": x + length,                     
      "y1": y - (shortlength/2),       
      "y2": y + (shortlength/2)                       
    };    
    SVGLineElement long = new SVGElement.tag("line");
    long.attributes = {
      "x1": x,                    
      "x2": x + length,                     
      "y1": y,      
      "y2": y                     
    };  
    SVGTextElement text = new SVGElement.tag("text");
    text.attributes = { 
       "x": x + 3.0,
       "y": y + 10.0,
       "fill": "black",
       "text": "woeis",
       "font-family":"Verdana",
       "font-size":"10"
    };
    text.text=t;
    root.elements.add(shortLeft);
    root.elements.add(shortRight);
    root.elements.add(long);
    root.elements.add(text);
    return g;
  }
}
