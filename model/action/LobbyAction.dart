interface LobbyAction extends Action {
  update(Lobby lobby);
  prepareLobby(Lobby lobby);
  performAtLobbyServer(Lobby lobby);
}
class SupportedLobbyActions extends ImmutableL<LobbyAction> {
  SupportedLobbyActions() : super([
    new AbstractLobbyAction(),
    new SpectateGame(),
    new JoinLobby(),
    new NewGame(),
    new JoinLobby(),
    new JoinGame(),
    new LeaveLobby(),
    new LeaveGame(),
    new ChangeSettings()
  ]);
}
interface LobbyActionData extends JsonObject {
  String type;
  int id;
  int userId;
  String performedTime;
}
/** Abstract convenience implementation for LobbyActions */
class AbstractLobbyAction implements LobbyAction {
  int id;
  Date performedTime;
  int userId;
  User _user;

  AbstractLobbyAction();
  AbstractLobbyAction.data(JsonObject json) {
    LobbyActionData data = json;
    id = data.id;
    performedTime = data.performedTime == null ?
        null : new Date.fromString(data.performedTime);
    userId = data.userId;
  }

  bool get isServer() => this is ServerAction;
  bool get isGame() => this is GameAction;
  bool get isLobby() => true;
  bool get isTrade() => false;

  prepareLobby(Lobby lobby) {
    user = byId(userId, lobby.users);
  }
  performAtLobbyServer(Lobby lobby) {
  }
  update(Lobby lobby) { }

  User get user() => _user;
  set user(User u) {
    _user = u;
    if (u != null) {
      userId = u.id;
    }
  }

  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  // Copyable
  Action copy([JsonObject data]) => data == null ?
      new AbstractLobbyAction() : new AbstractLobbyAction.data(data);
  // Testable
  test() {}
  String toText() => Dartan.name(this);
  bool equals(other) => other.id == id;
  // Jsonable
  JsonObject get data() {
    LobbyActionData data = new JsonObject();
    data.type = Dartan.name(this);
    data.id = id;
    data.userId = userId;
    data.performedTime = performedTime == null ? null : performedTime.toString();
    return data;
  }
}
interface JoinLobbyData extends LobbyActionData {
  UserData user;
}
/** A user just logged in */
class JoinLobby extends AbstractLobbyAction {

  JoinLobby();
  JoinLobby.data(JsonObject json) : super.data(json) {
    JoinLobbyData data = json;
    user = data.user == null ? user : new User.data(data.user);
  }
  prepareLobby(Lobby lobby) {
    /* explicit empty */
  }
  update(Lobby lobby) {
    lobby.users.add(user);
  }
  JsonObject get data() {
    JoinLobbyData data = super.data;
    data.user = nullOrDataFrom(user);
    return data;
  }

  JoinLobby copy([JsonObject data]) => data == null ?
      new JoinLobby() : new JoinLobby.data(data);
  String toText() => "${user.name} joins";
}
/** A user left the lobby */
class LeaveLobby extends AbstractLobbyAction {

  LeaveLobby();
  LeaveLobby.data(JsonObject data) : super.data(data);

  update(Lobby lobby) {
    lobby.users.remove(user);
  }
  LeaveLobby copy([JsonObject data]) => data == null ?
      new LeaveLobby() : new LeaveLobby.data(data);
  String toText() => "${user.name} left";
}
interface LeaveLobbyData extends LobbyActionData{
}
interface NewGameData extends LobbyActionData {
  GameData game;
}
/** A user starts a new game */
class NewGame extends AbstractLobbyAction {
  Game game;

  NewGame();
  NewGame.data(JsonObject json) : super.data(json) {
    NewGameData data = json;
    game = fromData(data.game);
  }
  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
  }
  update(Lobby lobby) {
    lobby.games.add(game);
  }
  performAtLobbyServer(Lobby lobby) {
    if (game == null) {
      game = new Game();
      game.board = new Standard4p();
      game.name = "waitwhat?";
    }
    game.host = user;
    game.users.add(user);
    lobby.identify(game);
  }
  String toText() => "${user.name} created a new game: ${game.name}";
  JsonObject get data() {
    NewGameData data = super.data;
    data.game = nullOrDataFrom(game);
    return data;
  }
  NewGame copy([JsonObject data])  => data == null ?
      new NewGame() : new NewGame.data(data);
}

interface JoinGameData extends JsonObject {
  int gameId;
}
class JoinGame extends AbstractLobbyAction {
  int gameId;
  Game game;
  JoinGame();
  JoinGame.data(JsonObject json) : super.data(json){
    JoinGameData data = json;
    gameId = data.gameId;
  }
  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
    game = byId(gameId, lobby.games);
  }
  update(Lobby lobby) {
    game.users.add(user);
  }
  JsonObject get data() {
    JoinGameData data = super.data;
    data.gameId = game== null ? null : game.id;
    return data;
  }
  JoinGame copy([JsonObject data])  => data == null ?
      new JoinGame() : new JoinGame.data(data);
}

interface SpectateGameData extends LobbyActionData {
  int gameId;
}
class SpectateGame extends AbstractLobbyAction {
  int _gameId;
  Game game;

  SpectateGame();
  SpectateGame.data(JsonObject json) : super.data(json) {
    SpectateGameData data = json;
    _gameId = data.gameId;
  }
  JsonObject get data() {
    SpectateGameData data = super.data;
    data.gameId = game == null ? null : game.id;
    return data;
  }
  SpectateGame copy([JsonObject data])  => data == null ?
      new SpectateGame() : new SpectateGame.data(data);

  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
    game = byId(_gameId, lobby.games);
  }
  update(Lobby lobby) {
    game.spectators.add(user);
    game.users.add(user);
  }
}
interface ChangeSettingsData extends LobbyActionData {
  GameSettingsData settings;
  int gameId;
}
/** The host changed the settings in the lobby */
class ChangeSettings extends AbstractLobbyAction {
  int _gameId;
  Game game;
  GameSettings settings;

  ChangeSettings();
  ChangeSettings.data(JsonObject json) : super.data(json) {
    ChangeSettingsData data = json;
    settings = new GameSettings.data(data.settings);
    _gameId = data.gameId;
  }
  JsonObject get data() {
    ChangeSettingsData data = super.data;
    data.gameId = game == null ? null : game.id;
    data.settings = nullOrDataFrom(settings);
    return data;
  }
  ChangeSettings copy([JsonObject data])  => data == null ?
      new ChangeSettings() : new ChangeSettings.data(data);

  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
    game = byId(_gameId, lobby.games);
  }
  update(Lobby lobby) {
    game.settings = settings;
    game.phases.lobby.unreadyAllExceptHost(game.host);
  }
}
/** A user signals he is ready to start the game */
class ReadyToStart extends AbstractLobbyAction {
  int _gameId;
  Game game;

  ReadyToStart();
  ReadyToStart.data(JsonObject data) : super.data(data);
  ReadyToStart copy([JsonObject data])  => data == null ?
      new ReadyToStart() : new ReadyToStart.data(data);

  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
    game = byId(_gameId, lobby.games);
  }
  update(Lobby lobby) {
    game.phases.lobby.readyUsers.add(user);
  }
}
interface LeaveGameData extends LobbyActionData {
  int gameId;
}
/** A user leaves a game
TODO: implement for both in the game and in the lobby */
class LeaveGame extends AbstractLobbyAction {
  int _gameId;
  Game game;

  LeaveGame();
  LeaveGame.data(JsonObject json) : super.data(json) {
    LeaveGameData data = json;
    _gameId = data.gameId;
  }
  LeaveGame copy([JsonObject data])  => data == null ?
  new LeaveGame() : new LeaveGame.data(data);
  JsonObject get data() {
    LeaveGameData data = super.data;
    data.gameId = game == null ? null : game.id;
    return data;
  }

  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
    game = byId(_gameId, lobby.games);
  }
  update(Lobby lobby) {
    if (game.phases.isLobby) {
      game.users.remove(user);
      game.spectators.remove(user);
    }
  }
  String toText() => "${user.name} left the game [${game.name}]";
}