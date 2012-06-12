/** Displays a lobby to the user and updates whenever lobby actions are performed */
class LobbyView {
  Element root;
  Element actions;
  Element users;
  Element chats;
  Element chatTextbox;
  Element games;

  Lobby lobby;
  Server server;
  HashMap<User, Element> elementsByUser;
  HashMap<Game, GameListElement> elementsByGame;

  LobbyView(this.lobby) {
    elementsByUser = new HashMap<User, Element>();
    elementsByGame = new HashMap<Game, GameListElement>();
    setupUI();
    watchLobby();
  }
  watchLobby() {
    lobby.actions.onAdded((LobbyAction action) => addAction(action));
    lobby.chats.onAdded((Say said) => addChat(said));
    lobby.users.onAdded((User user) => addUser(user));
    lobby.users.onRemoved((User removedUser) => removeUser(removedUser));
    lobby.games.onAdded((Game newGame) => addGame(newGame));
  }
  /** Creates UI elements and adds them to the root */
  setupUI() {
    root = new Element.tag("div");
    actions = new Element.html("<ul class=span4><h2>actions</h2></ul>");
    users = new Element.html("<ul class=span4><h2>users</h2></ul>");
    chats = new Element.html("<ul class=span4><h2>chat</h2></ul>");
    games = new Element.html("<ul class=span4><h2>games</h2></ul>");
    root.elements.add(actions);
    root.elements.add(users);
    root.elements.add(chats);
    root.elements.add(games);
    root.classes.add("lobby");
    root.classes.add("row");
  }
  Element toElement() => root;

  /** Shows and adds target user in the list of users of the lobby */
  addUser(User userToAdd) {
    Element e = new Element.tag("li");
    e.innerHTML = userToAdd.name;
    elementsByUser[userToAdd] = e;
    users.elements.add(e);
  }
  /** Removes target user from the displayed list of users */
  removeUser(User user) {
    Element e = elementsByUser[user];
    e.remove();
  }
  /** Adds target action to the list element containing the actions */
  addAction(LobbyAction action) {
    Element e = new Element.tag("li");
    e.elements.add(new Element.html("<p>${Dartan.smallIcon(action)} ${action.toText()}</p>"));
    actions.elements.add(e);
  }
  /** Adds target action to the list element containing the chats */
  addChat(Say said) {
    Element e = new Element.tag("li");
    e.innerHTML = said.toText();
    chats.elements.add(e);
  }
  addGame(Game game) {
    GameListElement gameEl = new GameListElement(game);
    games.elements.add(gameEl.element);
    elementsByGame[game] = gameEl;
  }
}
class GameListElement {
  Element element;
 // DivElement wrapper;
  SpanElement nameEl;
  IconList players, spectators;
  GameSettingsIconSummary settingsIcons;

  GameListElement(Game game) {
    element = new Element.tag("li");
    //wrapper = new Element.tag("div");
    nameEl = new Element.html("<span>${game.name}</span>");
    players = new IconList();
    players.list = game.users;
    spectators = new IconList.fixed("Spectator");
    spectators.list = game.spectators;

    settingsIcons = new GameSettingsIconSummary();
    game.onSetted("settings", (GameSettings old, GameSettings newSettings) {
      settingsIcons.settings = newSettings;
    });

    //nameEl = new Element.html("<span>${game.name}</span>");
    element.elements.add(nameEl);
    //ement.elements.add(wrapper);
    element.elements.add(players.element);
    element.elements.add(spectators.element);
    element.elements.add(settingsIcons.element);
  }
}
/** Displays a list of icons hinting the user settings info */
class GameSettingsIconSummary {
  Element withRobber;
  Element maxCardsInHandOn7;
  Element playerAmount;
  Element maxTradesInTurn;
  Element element;
  GameSettings _settings;

  GameSettingsIconSummary() {
    Robber r = new Robber();
    element = new Element.tag("span");
    withRobber = new Element.html("<span>${Dartan.smallIcon(r)}</span>");
    maxCardsInHandOn7 = new Element.html("<span class=settings></span>");
    maxTradesInTurn = new Element.html("<span class=settings></span>");
    playerAmount = new Element.html("<span class=settings></span>");
    element.elements.add(withRobber);
    element.elements.add(maxCardsInHandOn7);
    element.elements.add(maxTradesInTurn);
    element.elements.add(playerAmount);
  }

  set settings(GameSettings s) {
    _settings=s;
    withRobber.style.opacity = s.withRobber ? "1.0" : "0.5";
    maxCardsInHandOn7.innerHTML = s.maxCardsOn7.toString();
    maxTradesInTurn.innerHTML = s.maxTradesInTurn.toString();
    playerAmount.innerHTML = s.playerAmount.toString();
  }
}
class ActsView {
  Element element;
  Element latestText;
  Map<int, Element> elementsByActIndex;
  GameTester gameTester;
  int index;

  ActsView(this.gameTester) {
    element = new Element.tag("div");
    latestText = new Element.tag("label");
    elementsByActIndex = new Map();
    gameTester.onSetted("latest", (old, newF) {
      latestText.text = "Act #${index} went okay";
      index++;
    });
    element.elements.add(latestText);
  }
}
/** Display an icon for every item in the list */
class IconList {
  ListenableList _list;
  String fixedIcon = null;
  set list(ListenableList list) {
    _list = list;
    for (var i in list) {
      addIcon(i);
    }
    list.onAdded(addIcon);
    list.onRemoved(removeIcon);
  }
  Element element;
  Map<Hashable, Element> elementsByObject;
  IconList() {
    element = new Element.tag("span");
    elementsByObject = new Map();
  }
  IconList.fixed(String nameOfIcon) : this() {
    fixedIcon = nameOfIcon;
  }
  addIcon(i) {
    Element eli;
    if (fixedIcon != null) {
      eli = new Element.html("""<img src="img/icon16/${fixedIcon}.png"/>""");
    } else {
      eli = new Element.html(Dartan.smallIcon(i));
    }
    element.elements.add(eli);
    elementsByObject[i] = eli;
  }
  removeIcon(i) {
    Element e = elementsByObject[i];
    if (e != null) {
      e.remove();
    }
  }
}
