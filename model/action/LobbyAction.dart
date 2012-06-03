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
interface SayLobbyData {
  int id;
  String performedTime;
  int userId;
  String message;
}
class SayLobby extends AbstractLobbyAction {

  SayLobbyData data;
  SayLobby() {
  }
  SayLobby.data(SayLobbyData d) {
    data = d;
    id = d.id;
    userId = d.userId;
    //performedTime = d.performedTime;
  }
  update(Lobby lobby) {
    lobby.chats.add(this);
  }
  String toText() => "${user.name}: ${data.message}";
}
/** A user just logged in */
class JoinLobby extends AbstractLobbyAction {
  update(Lobby lobby) {
    lobby.users.add(user);
  }
  String toText() => "${user.name} joins";
}
/** A user left the lobby */
class LeaveLobby extends AbstractLobbyAction {

  update(Lobby lobby) {
    lobby.users.remove(user);
  }
  String toText() => "${user.name} left";
}
interface LeaveLobbyData {
  int userId;
}
/** A user starts a new game */
class NewGame extends AbstractLobbyAction {
  String name;
  String board;
  GameData game;
  prepare(Lobby lobby) {
    //game = new Game();
  }
  update(Lobby lobby) {
    lobby.games.add(game);
    //game.host = user;
    game.users.add(user);
  }
  String toText() => "${user.name} created a new game: ${game.name}";
//  String toJson() => JSON.stringify(toJsonObject());
//  JsonObject toJsonObject() {
//    NewGameData data = new JsonObject();
//    data.userId = userId;
//    data.gameData = gameData;
//    return data;
//  }
}
interface NewGameData {
  int userId;
  String name;
  String board;
//  GameData gameData;
}
class JoinGame extends AbstractLobbyAction {
  int gameId;
  Game _game;
  prepare(Lobby lobby) {
    _game = byId(gameId, lobby.games);
  }
  update(Lobby lobby) {
    _game.users.add(user);
  }
}
class SpectateGame extends AbstractLobbyAction {
  int gameId;
  Game _game;
  prepare(Lobby lobby) {
    _game = byId(gameId, lobby.games);
  }
  update(Lobby lobby) {
    _game.spectators.add(user);
  }
}
/** The host changed the settings in the lobby */
class ChangeSettings extends AbstractLobbyAction {
  int gameId;
  Game _game;
  List<GameSetting> settings;
  update(Lobby lobby) {
    for (GameSetting setting in settings) {
      setting.setSetting(_game.settings);
    }
    _game.phases.lobby.unreadyAllExceptHost(_game.host);

  }
}
/** A user signals he is ready to start the game */
class ReadyToStart extends AbstractLobbyAction {
  int gameId;
  Game _game;
  update(Lobby lobby) {
    _game.phases.lobby.readyUsers.add(user);
  }
}
class LeaveGame extends AbstractLobbyAction {
  int gameId;
  Game _game;
}