interface LobbyAction extends Action {
  update(Lobby lobby);
  prepare(Lobby lobby);
}
class SupportedLobbyActions extends ImmutableL<LobbyAction> {
  SupportedLobbyActions() : super([new AbstractLobbyAction(), new JoinLobby(), 
    new NewGame(), new JoinLobby(), new LeaveLobby()]);
}
class AbstractLobbyAction implements LobbyAction {
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
class SayLobby extends AbstractLobbyAction {
  String message;
  update(Lobby lobby) {
    lobby.chats.add(this);
  }
  String toText() => "${user.name}: ${message}";
}
/** A user just logged in */
class JoinLobby extends AbstractLobbyAction {
  update(Lobby lobby) {
    lobby.users.add(user);
  }
  String toText() => "${user.name} joined the lobby";
}
/** A user left the lobby */
class LeaveLobby extends AbstractLobbyAction {
  update(Lobby lobby) {
    lobby.users.remove(user);
  }
  String toText() => "${user.name} left";
}
/** A user starts a new game */
class NewGame extends AbstractLobbyAction {
  Game game;
  prepare(Lobby lobby) {
    game = new Game();
  }
  update(Lobby lobby) {
    lobby.games.add(game);
  }
  String toText() => "${user.name} created a new game: ${game.name}";
}