part of Dartan;

/** User interaction with a board */
abstract class BoardState {
  BoardVisual boardVisual; // The [BoardVisual] to interact with

  start(); // set begin state
  end();   // set back to neutral state

  mouseOver(Visual visual);
  mouseOut(Visual visual);
  click(Visual visual);
}
/** Abstract convenience implementation for [BoardState] implementors */
class AbstractBoardState implements BoardState {
  BoardVisual boardVisual;
  start() { }
  end() { }
  mouseOver(Visual visual) { }
  mouseOut(Visual visual) { }
  click(Visual visual) { }
}
class NoState extends AbstractBoardState {
  NoState();
}
class SelectOnHover extends AbstractBoardState {
  mouseOver(Visual visual) {
    visual.select();
    boardVisual.currentVisual = visual;
  }
  mouseOut(Visual visual) { visual.deSelect(); }
}
/** Change a selected tile on a board */
class ChangeTile extends AbstractBoardState {
  mouseOver(Visual visual) { visual.select(); }
  mouseOut(Visual visual) { visual.deSelect(); }
  click(Visual visual) {
    if (visual is TileVisual) {
      TileVisual tv = visual;
      Tile copy = new Desert(tv.tile.cell);
      boardVisual.board.changeTile(copy);
    }
  }
}
/** Allow the user to pick a port on 6 triangles of a tile */
class PickPort extends AbstractBoardState {
  start() {
    boardVisual.portPicker.show();
  }
  end() {
    boardVisual.portPicker.hide();
  }
  mouseOver(Visual visual) {
    if (visual is TileVisual) {
      TileVisual tv = visual;
      boardVisual.portPicker.setPosition(tv.tile);
    }
  }
  click(Visual visual) {
    if (visual is PortPickerVisual) {
      PortPickerVisual ppv =  visual;
      ppv.selectedTile.port = new ThreeToOnePort();
    }
  }
}
/** Player wants to pick a spot for a town */
class PickTown extends AbstractBoardState {
  bool firstTown; // True if first town to place for player
  bool secondTownOrCity; // True if second town/city
  HashSet<Vertice> _possibleVertices;
  start() {
    if (firstTown) {
      _possibleVertices = boardVisual.board.firstTownPossibilities();
    }
    if (secondTownOrCity) {
      _possibleVertices = boardVisual.board.secondTownPossibilities();
    }
    if (!firstTown && !secondTownOrCity) {
      _possibleVertices = boardVisual.board.townPossibilities();
    }
    boardVisual.showVertices(_possibleVertices);
  }
  end() {
    boardVisual.hideAllVertices();
  }
  mouseOver(Visual visual) {
    if (visual is VerticeVisual) {
      boardVisual.currentVisual = visual;
      visual.select();
    }
  }
  mouseOut(Visual visual) {
    if (visual is VerticeVisual) {
      visual.deSelect();
    }
  }
  click(Visual visual) {
    if (visual is VerticeVisual) { // should be only
      // Yey! user picked a town spot
      // Spawn a new BuildTown command?
    }
  }
}