/** Displays all board info for a player to pick one */
class BoardViewer {
  Element element;
  DivElement listsDiv;
  BoardVisual _boardVisual;
  BoardVisual get boardVisual() => _boardVisual;

  ListViewPerType chitsView;
  ListViewPerType portsView;
  ListViewPerType tilesView;
  set board(Board b) {
    boardVisual.board = b;
    chitsView.list = b.chitsBag;
    portsView.list = b.portsBag;
    tilesView.list = b.tilesBag;
  }
  BoardViewer() {
    element = new Element.html("<div class=row-fluid></div>");
    Element boardElement = new Element.html("<div class=span6></div>");
    Element listsDiv = new Element.html("<div class=span3></div>");

    ButtonElement buttonRender = new Element.html("<button>Make</button>");
    ButtonElement buttonRandomTiles = new Element.html("<button>Start</button");
    Random cr = new ClientRandom();

    buttonRender.on.click.add((e) {
      _boardVisual.board.make(cr);
    });
    buttonRandomTiles.on.click.add((e) {
      _boardVisual.board.setStartingState();
    });
    listsDiv.elements.add(buttonRandomTiles);
    listsDiv.elements.add(buttonRender);

    chitsView = new ListViewPerType("Chits");
    listsDiv.elements.add(chitsView.element);
    portsView = new ListViewPerType("Ports");
    listsDiv.elements.add(portsView.element);
    tilesView = new ListViewPerType("Tiles");
    listsDiv.elements.add(tilesView.element);

    _boardVisual = new SvgBoard();
    _boardVisual.hideAllEdges();
    _boardVisual.hideAllVertices();
    boardElement.elements.add(_boardVisual.element);
    element.elements.add(boardElement);
    element.elements.add(listsDiv);
  }
}
/** Displays a list of board and lets the user pick one */
class BoardsViewer {
  Element element;
  Map<Board, Element> elementsByBoard;
  Board current;
  Element currentLiElement;
  BoardViewer boardViewer;
  BoardsViewer() {
    element = new Element.html("<div class=row-fluid></div>");
    Element boardElement = new Element.html("<div class=span10></div>");
    Element listDiv = new Element.html("<div class=span2></div>");
    UListElement listElement = new Element.html("<ul class=boardslist></ul>");
    boardViewer = new BoardViewer();
    elementsByBoard = new HashMap<Board, Element>();
    List<Board> boards = new List<Board>();
    boards.add(new Standard4p());
    boards.add(new Board(7, 7));
    for (Board board in boards) {
      Element li = new Element.html("""<li class=boardsList id=${board.name}>${board.name}</li>""");
      li.on.click.add((Event e) {
        board.setStartingState();
        changeBoard(board, li);
      });
      elementsByBoard[board] = li;
      listElement.elements.add(li);
    }
    boardElement.elements.add(boardViewer.element);
    listDiv.elements.add(listElement);
    element.elements.add(listDiv);
    element.elements.add(boardElement);
    changeBoard(boards[0], elementsByBoard[boards[0]]); // First as selected
  }
  changeBoard(Board b, Element li) {
    if (currentLiElement != null) {
      currentLiElement.classes.remove("selected");
    }
    currentLiElement = li;
    li.classes.add("selected");
    boardViewer.board = b;
  }
}
/** Displays amount of items per concrete type */
class ListViewPerType {
  String title;
  Element element;
  UListElement listEl;
  ListenableList _list;
  HashMap<String, int> amountByType;
  HashMap<String, Element> elementsByType;

  ListViewPerType(this.title) {
    amountByType = new HashMap<String, int>();
    elementsByType = new HashMap<String, Element>();

    element = new Element.tag("div");
    listEl = new Element.tag('ul');
    if (title != null) {
      element.elements.add(new Element.html("<h2>${title}</h2>"));
    }
    element.elements.add(listEl);
  }
  /** Set target list to display */
  set list(ListenableList list) {
    if (_list != null) {
      _list.offAdded(addItem);
      _list.offRemoved(removeItem);
    }
    _list = list;
    amountByType.clear();
    for (Element e in elementsByType.getValues()) {
      e.remove();
    }
    elementsByType.clear();
    fillItems();
    list.onAdded(addItem);
    list.onRemoved(removeItem);
  }
  fillItems() {
    for (var item in _list) {
      addItem(item);
    }
  }
  addItem(var item) {
    String type = Dartan.name(item);
    if (amountByType[type] == null) {
      amountByType[type] = 1;
      Element li = new Element.html(
        "<li>${Dartan.smallIcon(item)} ${Dartan.name(item)}: <span class=amount id= ${type}>${amountByType[type]}</span></li>");
      elementsByType[type] = li;
      listEl.elements.add(li);
    } else {
      updateType(type);
    }
  }
  updateType(String type) {
    Element e = elementsByType[type];
    e.query("#${type}").innerHTML = amountByType[type].toString();
  }
  removeItem(var item) {
    String type = Dartan.name(item);
    amountByType[type]--;
    updateType(type);
  }
}
/** Listens on a list and displays each item as <li> {icon} {name} */
class ListView {
  String _title;
  Element element;
  UListElement listEl;
  ListenableList _list;
  HashMap<Dynamic, Element> elementsByItem;
  /** Set target list to display */
  set list(ListenableList list) {
    if (_list != null) {
      _list.offAdded(addItem);
      _list.offRemoved(removeItem);
    }
    _list = list;
    list.onAdded(addItem);
    list.onRemoved(removeItem);
  }
  ListView([String title]) {
    element = new Element.tag("div");
    _title=title;
    elementsByItem = new HashMap<Dynamic,Element>();
    listEl = new Element.tag('ul');
    if (title != null) {
      element.elements.add(new Element.html("<h2>${_title}</h2>"));
    }
    element.elements.add(listEl);
  }
  addItem(var item) {
    Element li = new Element.html("<li>${Dartan.smallIcon(item)} ${Dartan.name(item)}</li>");
    elementsByItem[item] = li;
    listEl.elements.add(li);
  }
  removeItem(var item) {
    Element elToRemove = elementsByItem[item];
    elToRemove.remove();
  }
}