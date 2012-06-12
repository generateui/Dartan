/** The lobby residing on both the client and the server */
class Lobby {
  ListenableList<User> users;
  ListenableList<Game> games;
  ListenableList<LobbyAction> actions;
  ListenableList<Say> chats;
  int consecutiveId = 0;
  IdProvider identifyGame;
  IdProvider identifyAction;

  Lobby() {
    identifyGame = new IdProviderImpl.increment();
    identifyAction = new IdProviderImpl.increment();
    users = new ListenableList<User>();
    games = new ListenableList<Game>();
    actions = new ListenableList<LobbyAction>();
    chats = new ListenableList<Say>();
  }
  /** Prepares given action to be executed */
  prepareAction(LobbyAction action) {
    //action.user = byId(action.id, users);
    action.prepareLobby(this);
  }
  /** Performs given action on this lobby instance */
  performAction(LobbyAction action) {
    prepareAction(action); // Ensure action instance is initialized
    action.update(this);   // Dispatch call to the action instance
    actions.add(action);   // Add to the log of actions in this lobby
  }
}