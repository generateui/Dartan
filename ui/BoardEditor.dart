class BoardEditor extends View {
  Element root;
  DivElement buttonList;
  SVGElement boardRoot;
  SpanElement stateName;
  Board board;
  BoardVisual boardVisual;
  List<BoardState> boardStates;

  BoardEditor([this.root]) {
    if (root == null) {
      root = new Element.tag("div");
    }
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
      b.on.click.add((Event e) {
        setState(s);
      });
      buttonList.elements.add(b);
    }
    root.elements.add(stateName);
    root.elements.add(buttonList);
    root.elements.add(boardVisual.element);
    div.elements.add(root);
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
