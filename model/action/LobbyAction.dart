interface LobbyAction extends Action {
  update(Lobby lobby);
  prepare(Lobby lobby);
}
class SupportedLobbyActions extends ImmutableL<LobbyAction> {
  SupportedLobbyActions() : super([new AbstractLobbyAction(), new JoinLobby(), new NewGame()]);
}
class Lobby {
  ListenableList<User> users;
  ListenableList<Game> games;
  Lobby() {
    users = new ListenableList<User>();
    games = new ListenableList<Game>();
  }
  prepareAction(LobbyAction action) {
    //action.user = byId(action.id, users);
  }

}
class AbstractLobbyAction implements Action {
  int id;
  Date performedTime;
  int userId;
  User user;
  bool get isServer() => this is ServerAction;
  bool get isGame() => this is GameAction;
  bool get isLobby() => true;
  bool get isTrade() => this is TradeAction;
  prepare(Lobby lobby) { }
  update(Lobby lobby) { }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  Action copy() => new AbstractLobbyAction();
  test() {}
  String toText() => Dartan.name(this);
}
class JoinLobby extends AbstractLobbyAction {
  update(Lobby lobby) {
    lobby.users.add(user);
  }
}
class NewGame extends AbstractLobbyAction {
  Game game;
  prepare(Lobby lobby) {
    game = new Game();
  }
  update(Lobby lobby) {
    lobby.games.add(game);
  }
}

