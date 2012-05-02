/** Displays a lobby to the user and updates whenever lobby actions are performed */
class LobbyView {
  Element root;
  Element actions;
  Element users;
  Element chats;
  Element chatTextbox;
  Element games;
  
  Lobby lobby;
  GameServer server;
  HashMap<User, Element> elementsByUser;
  HashMap<Game, Element> elementsByGame;
  
  LobbyView(this.lobby) {
    elementsByUser = new HashMap<User, Element>();
    elementsByGame = new HashMap<Game, Element>();
    setupUI();
    watchLobby();
  }
  watchLobby() {
    lobby.actions.onAdded((LobbyAction action) => addAction(action));
    lobby.chats.onAdded((SayGame said) => addChat(said));
    lobby.users.onAdded((User user) => addUser(user));
    lobby.users.onRemoved((User removedUser) => removeUser(removedUser));
    lobby.games.onAdded((Game newGame) => addGame(newGame));
  }
  /** Creates UI elements and adds them to the root */
  setupUI() {
    root = new Element.tag("div");
    actions = new Element.html("<ul class=span4></ul>");
    users = new Element.html("<ul class=span4></ul>");
    chats = new Element.html("<ul class=span4></ul>");
    games = new Element.html("<ul class=span4></ul>");
    root.elements.add(actions);
    root.elements.add(users);
    root.elements.add(chats);
    root.elements.add(games);
    root.classes.add("lobby");
    root.classes.add("row");
  }
  Element toElement() => root;
  
  addGame(Game game) {
    Element e = new Element.tag("li");
    e.innerHTML = game.name;
    elementsByGame[game] = e;
    games.elements.add(e);
  }
  
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
    e.innerHTML = action.toText();
    actions.elements.add(e);
  }
  /** Adds target action to the list element containing the chats */
  addChat(SayGame said) {
    Element e = new Element.tag("li");
    e.innerHTML = said.toText();
    chats.elements.add(e);
  }
}
