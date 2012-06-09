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
  DivElement wrapper;
  SpanElement nameEl;
  GameListElement(Game game) {
    element = new Element.tag("li");
    wrapper = new Element.tag("div");
    nameEl = new Element.html("<span>${game.name}</span>");
    Element amountUsersEl = new Element.tag("span");
    amountUsersEl.innerHTML = game.users.length.toString();
    nameEl.elements.add(amountUsersEl);

    //nameEl = new Element.html("<span>${game.name}</span>");
    wrapper.elements.add(nameEl);
    element.elements.add(wrapper);
    game.users.onAdded((User u) {
      amountUsersEl.innerHTML = game.users.length.toString();
    });
  }
}
