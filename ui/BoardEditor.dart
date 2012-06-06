class BoardEditor extends View {
  Element element;
  DivElement buttonList;
  SVGElement boardRoot;
  SpanElement stateName;
  Board board;
  BoardVisual boardVisual;
  List<BoardState> boardStates;

  BoardEditor() {
    element = new Element.tag("div");
    div = document.query(id);
    board = new Board(7,7);
    boardVisual = new SvgBoard();
    boardVisual.board = board;
    buttonList = new Element.tag("div");
    stateName = new Element.tag("span");
    stateName.innerHTML = Dartan.name(boardVisual.boardState);
    boardStates = new List.from([new NoState(), new ChangeTile(), new PickPort()]);
    for (BoardState s in boardStates) {
      ButtonElement b = new Element.html("<button>${Dartan.name(s)}</button>");
      b.on.click.add((e) {
        setState(s);
      });
      buttonList.elements.add(b);
    }
    element.elements.add(stateName);
    element.elements.add(buttonList);
    element.elements.add(boardVisual.element);
    div.elements.add(element);
    boardVisual.hideAllEdges();
    boardVisual.hideAllVertices();
  }
  setState(BoardState bs) {
    boardVisual.boardState = bs;
    stateName.innerHTML = Dartan.name(bs);
  }
  show() {

  }
}
