part of Dartan;

/** Displays all board info for a player to pick one */
class BoardViewer {
  Element element;
  DivElement listsDiv;
  BoardVisual _boardVisual;
  BoardVisual get boardVisual => _boardVisual;
  bool _show;
  set showInfo(bool show) {
    _show = show;
//    listsDiv.style.visibility = show ? "visible" : "hidden";
  }

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
    element = new Element.html("<div></div>"); // class=row-fluid></div>");
//    Element boardElement = new Element.html("<div class=span6></div>");
//    listsDiv = new Element.html("<div class=span3></div>");

    ButtonElement buttonRender = new Element.html("<button>Make</button>");
    ButtonElement buttonRandomTiles = new Element.html("<button>Start</button");



//    listsDiv.elements.add(buttonRandomTiles);
//    listsDiv.elements.add(buttonRender);

    chitsView = new ListViewPerType("Chits");
//    listsDiv.elements.add(chitsView.element);
    portsView = new ListViewPerType("Ports");
//    listsDiv.elements.add(portsView.element);
    tilesView = new ListViewPerType("Tiles");
//    listsDiv.elements.add(tilesView.element);

    _boardVisual = new SvgBoard();
    _boardVisual.hideAllEdges();
    _boardVisual.hideAllVertices();
//    boardElement.elements.add(_boardVisual.element);
//    element.elements.add(boardElement);
//    element.elements.add(listsDiv);
    element.children.add(_boardVisual.element);
  }
}
/** Simple button bar to manipulte a target Board */
class BoardActionBar {
  Element element;
  ButtonElement buttonRender ;
  ButtonElement buttonRandomTiles;
  Board board;

  BoardActionBar() {
    element = new Element.tag("div");
    buttonRender = new Element.html("<button>Prepare for play...</button>");
    buttonRandomTiles = new Element.html("<button>Design</button");
    Random cr = new ClientRandom();
    buttonRender.on.click.add((e) {
      board.make(cr);
    });
    buttonRandomTiles.on.click.add((e) {
      board.setStartingState();
    });
    element.children.add(buttonRandomTiles);
    element.children.add(buttonRender);
  }
}
/** Displays a list of board and lets the user pick one */
class BoardsViewer {
  Element element;
  Map<Board, Element> elementsByBoard;
  Board current;
  Element actions;
  Element currentLiElement;
  Element h1Element;
  DivElement jsonTextTelement;
  BoardViewer boardViewer;
  BoardActionBar actionBar;
  BoardsViewer() {
    element = new Element.html("<div class=row-fluid></div>");
    jsonTextTelement = new Element.html("<div></div>");
    actions = new Element.html("<div></div>");
    h1Element = new Element.html("<h2></h2>");
    Element boardElement = new Element.html("<div class=span9></div>");
    Element listDiv = new Element.html("<div class=span3></div>");
    UListElement listElement = new Element.html("<ul class=boardslist></ul>");
    boardViewer = new BoardViewer();
    boardViewer.showInfo = false;
    actionBar = new BoardActionBar();
    elementsByBoard = new HashMap<Board, Element>();
    List<Board> boards = new List<Board>();
    boards.add(new Standard4p());
    boards.add(new Board(7, 7));
    for (Board board in boards) {
      Element li = new Element.html("""<li class=boardsList id=${board.name}>${board.name}</li>""");
      li.on.click.add((Event e) {
        changeBoard(board, li);
      });
      elementsByBoard[board] = li;
      listElement.children.add(li);
    }
    boardElement.children.add(h1Element);
    boardElement.children.add(actionBar.element);
//    boardElement.elements.add(actions);
    boardElement.children.add(boardViewer.element);
    boardElement.children.add(jsonTextTelement);
    listDiv.children.add(listElement);
    element.children.add(listDiv);
    element.children.add(boardElement);
    changeBoard(boards[0], elementsByBoard[boards[0]]); // First as selected
  }
  String toIconListByTypeAmount(List l) {
    Map<String, int> map = new Map();
    for(var i in l) {
      if (map.containsKey(Dartan.name(i))) {
        map[i] ++;
      }
    }
    StringBuffer sb = new StringBuffer("<span>");
    map.forEach((key, value) {
      sb.add("${Dartan.smallIcon(key)} &#215; <strong>${value}<strong>, ");
    });
    sb.add("</span>");
    return sb.toString();
  }
  changeBoard(Board b, Element li) {
    if (currentLiElement != null) {
      currentLiElement.classes.remove("selected");
    }
    currentLiElement = li;
    li.classes.add("selected");
    boardViewer.board = b;
    //print(b.data.toString());
    //jsonTextTelement.innerHTML = JSON.stringify(b.data);
    h1Element.innerHTML = b.name;
    actionBar.board = b;
    current = b;
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
      element.children.add(new Element.html("<h2>${title}</h2>"));
    }
    element.children.add(listEl);
  }
  /** Set target list to display */
  set list(ListenableList list) {
    if (_list != null) {
      _list.offAdded(addItem);
      _list.offRemoved(removeItem);
    }
    _list = list;
    amountByType.clear();
    for (Element e in elementsByType.values) {
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
      listEl.children.add(li);
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
  HashMap<dynamic, Element> elementsByItem;
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
    elementsByItem = new HashMap<dynamic,Element>();
    listEl = new Element.tag('ul');
    if (title != null) {
      element.children.add(new Element.html("<h2>${_title}</h2>"));
    }
    element.children.add(listEl);
  }
  addItem(var item) {
    Element li = new Element.html("<li>${Dartan.smallIcon(item)} ${Dartan.name(item)}</li>");
    elementsByItem[item] = li;
    listEl.children.add(li);
  }
  removeItem(var item) {
    Element elToRemove = elementsByItem[item];
    elToRemove.remove();
  }
}