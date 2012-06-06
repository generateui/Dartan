class ChitVisual extends AbstractVisual {
  SVGGElement group;
  SVGCircleElement circle;
  SVGGElement chanceGroup; // TODO: implement
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
    svg = group;
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
    String strText = _chit is RandomChit ? "R" : _chit.number.toString();

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