/** Tile on a canvas */
class TileVisual extends AbstractVisual {
  SVGPolygonElement p;
  SVGGElement group;
  Tile tile;
  ChitVisual chit;
  PortVisual port;

  TileVisual.svg(Board2D board2d, this.tile) : super.svg(board2d) {
    group = new SVGElement.tag("g");

    createTileVisual();

    if (tile.canHaveChit) {
      chit = new ChitVisual.svg(board2d);
      group.elements.add(chit.svg);
      tile.onSetted("chit", _chitChange);
      if (tile.hasChit) {
        _chitChange(null, tile.chit);
      }
    }
    if (tile.canHavePort) {
      port = new PortVisual.svg(board2d);
      group.elements.add(port.svg);
      tile.onSetted("port", _portChange);
      if (tile.hasPort) {
        _portChange(null, tile.port);
      }
    }
    if (tile.canHaveTerritory) {
      // TODO: implement
    }
    svg = group;
  }
  _chitChange(Chit old, Chit newChit) {
    chit.setChit(tile.chit, tile.cell);
  }
  _portChange(Port old, Port newPort) {
    port.port = newPort;
  }
  createTileVisual() {
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
    group.elements.add(p);
  }
  remove() {
    tile.offSetted("port", _portChange);
    tile.offSetted("chit", _chitChange);
    if (port != null) {
      port.svg.remove();
    }
    if (chit != null) {
      chit.svg.remove();
    }
    group.remove();
  }
}