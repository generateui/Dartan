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
    new ChangeSettings(),
    new ReadyToStart()
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
  JsonObject get data() {
    NewGameData data = super.data;
    data.game = nullOrDataFrom(game);
    return data;
  }
  NewGame copy([JsonObject data])  => data == null ?
      new NewGame() : new NewGame.data(data);

  update(Lobby lobby) {

    lobby.games.add(game);
  }
  /** Prepares a complete game server-side based on the settings given
  by the host (creator) of this  game */
  performAtLobbyServer(Lobby lobby) {
    // Get a default game if sender is lazy
    if (game == null) {
      game = new Game();
      game.board = new Standard4p();
      game.name = "waitwhat?";
    } else {
      // TODO: get a blank game from user provided game (ignore most stuff)
      // Ensure the user has not set any weird things in the game instance
    }
    lobby.identifyGame.identify(game);

    // Create a player for each spot
    for (int i = 0; i < game.settings.playerAmount; i++) {
      Player p = new Player();
      // Give the players Id's equal to their index. Not that the index may
      // change later, when the determined first player gets index 0.
      p.id = i;
      game.players.add(p);
    }
    game.players[0].user = user; // occupy first slot by game creator
    game.host = user;            // set him as host
    game.users.add(user);        // convenience users acces list
  }
  String toText() => "${user.name} created a new game: ${game.name}";
}

interface JoinGameData extends JsonObject {
  int gameId;
  int slotIndex;
}
/** A user joins the game intending to fill a player slot and play then game */
class JoinGame extends AbstractLobbyAction {
  int gameId;
  int slotIndex;
  Game game;

  JoinGame();
  JoinGame.data(JsonObject json) : super.data(json){
    JoinGameData data = json;
    gameId = data.gameId;
  }
  JsonObject get data() {
    JoinGameData data = super.data;
    data.gameId = game== null ? null : game.id;
    return data;
  }
  JoinGame copy([JsonObject data])  => data == null ?
      new JoinGame() : new JoinGame.data(data);

  prepareLobby(Lobby lobby) {
    super.prepareLobby(lobby);
    game = byId(gameId, lobby.games);
  }
  update(Lobby lobby) {
    game.users.add(user);
  }

  String toText() => "${user.name} joins the game [${game.name}]";
}

interface SpectateGameData extends LobbyActionData {
  int gameId;
}
/** A user joins the game with the intent to watch it */
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
  }
  String toText() => "${user.name} spectates game [${game.name}";
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
    settings = fromData(data.settings);
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
interface ReadyToStartData extends LobbyActionData {
  int gameId;
}
/** A user signals he is ready to start the game */
class ReadyToStart extends AbstractLobbyAction {
  int _gameId;
  Game game;

  ReadyToStart();
  ReadyToStart.data(JsonObject json) : super.data(json) {
    ReadyToStartData data = json;
    _gameId = data.gameId;
  }
  ReadyToStart copy([JsonObject data])  => data == null ?
      new ReadyToStart() : new ReadyToStart.data(data);
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
    if (game.phases.lobby.readyUsers.filter
        ((User u) => u.equals(user)).length == 0) {
      game.phases.lobby.readyUsers.add(user);
    }
  }
  String toText() => "${user.name} wants to start the game";
}
interface LeaveGameData extends LobbyActionData {
  int gameId;
}
/** A user leaves a game

as user of player in game
as spectator in game
as user in notstarted game
as spectator in nonstarted game
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
    if (game.isSpectator(user)) {
      game.spectators.remove(user);
    }
    if (game.phases.isLobby) {
      game.users.remove(user);
    } else {
      Player nowWithoutUser = game.playerByUser(user);
      nowWithoutUser.user = null;
    }
  }
  String toText() => "${user.name} left the game [${game.name}]";
}