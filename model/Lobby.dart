/** The lobby residing on both the client and the server */
class Lobby {
  ListenableList<User> users;
  ListenableList<Game> games;
  ListenableList<LobbyAction> actions;
  ListenableList<SayLobby> chats;
  Lobby() {
    users = new ListenableList<User>();
    games = new ListenableList<Game>();
    actions = new ListenableList<LobbyAction>();
    chats = new ListenableList<SayLobby>();
  }
  /** Prepares given action to be executed */
  prepareAction(LobbyAction action) {
    //action.user = byId(action.id, users);
    action.prepare(this);
  }
  /** Performs given action on this lobby instance */
  performAction(LobbyAction action) {
    prepareAction(action);
    action.update(this);
    actions.add(action);
  }
}