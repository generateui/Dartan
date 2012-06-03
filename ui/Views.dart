/** Displays all known views which are allowed to be tested in a sandbox */
class Views extends View {
  bool isRendered = false;
  Views() {
    div = document.query(id);
  }
  show() {
    if (!isRendered) {
      BoardInfoView biv = new BoardInfoView(new Board(10,10));
      document.query("#infoBoard").elements.add(biv.element);
      isRendered=true;
    }
  }
  void makeTestPicker() {
    div = new Element.html("<div id=testPicker>");
    document.body.elements.add(div);
    new ResourcePicker(new MonopolyableResources(), 2);
    ResourceListMu mu = new ResourceListMu();
    new ResourcesView(mu, div);

    for (ResourceList l in new SupportedResourceLists()) {
      ButtonElement addListButton = new Element.html("<button>${Dartan.smallIcon(l)} ${Dartan.name(l)}</button>");
      addListButton.on.click.add((Event e) {
        l.forEach((f) { mu.add(f.copy()); });
      });
      div.elements.add(addListButton);
    }
    ButtonElement removeRandom = new Element.html("<button><span class=failure>${Dartan.noCheck}</span> Remove</button>");
    removeRandom.on.click.add((Event e) {
      mu.removeLast();
    });
    mu.onChanged(() { removeRandom.disabled = mu.length == 0; });
    div.elements.add(removeRandom);
    document.query("#resourcesView").elements.add(div);
  }
}
/** Show a debug info view of a board */
class BoardInfoView {
  SvgBoard boardVisual; // Actual board
  Board board;
  CellNeighboursView cellNeighbours;
  Element element;

  BoardInfoView(this.board) {
    element = new Element.tag("div");
    Element boardColumn = new Element.html("<div class=span8></div>");
    Element infoColumn = new Element.html("<div class=span4></div>");
    boardVisual = new SvgBoard();
    boardVisual.board = board;
    boardColumn.elements.add(boardVisual.element);
    TileMeasurementInfo tmi = new TileMeasurementInfo();

    // Show neighbours of hovered tile
    cellNeighbours = new CellNeighboursView();
    boardVisual.onSetted("currentVisual", (Visual old, TileVisual newValue) {
      if (newValue is TileVisual)
        cellNeighbours.showCell(newValue.tile.cell);
    });

    // Some buttons to switch edges/vertices groups on/off
    ButtonElement buttonShowEdges = new Element.html("<button>show edges</button>");
    buttonShowEdges.on.click.add((Event e) {
      boardVisual.showAllEdges();
    });
    infoColumn.elements.add(buttonShowEdges);

    ButtonElement buttonHideEdges = new Element.html("<button>hide edges</button>");
    buttonHideEdges.on.click.add((Event e) {
      boardVisual.hideAllEdges();
    });
    infoColumn.elements.add(buttonHideEdges);

    ButtonElement buttonShowVertices = new Element.html("<button>show vertices</button>");
    buttonShowVertices.on.click.add((Event e) {
      boardVisual.showAllVertices();
    });
    infoColumn.elements.add(buttonShowVertices);

    ButtonElement buttonHideVertices= new Element.html("<button>hide vertices</button>");
    buttonHideVertices.on.click.add((Event e) {
      boardVisual.hideAllVertices();
    });
    infoColumn.elements.add(buttonHideVertices);

    infoColumn.elements.add(cellNeighbours.element);
    //infoColumn.elements.add(tmi.element);

    boardColumn.elements.add(boardVisual.element);

    element.elements.add(infoColumn);
    element.elements.add(boardColumn);
  }
}
