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

  prepare(Lobby lobby) {
    user = byId(userId, lobby.users);
  }
  update(Lobby lobby) { }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  Action copy([JsonObject data]) => new AbstractLobbyAction();
  test() {}
  String toText() => Dartan.name(this);
  JsonObject get data() {
    /* not implemented */
  }
}
interface SayLobbyData extends JsonObject {
  int id;
  String type;
  String performedTime;
  int userId;
  String message;
}
class SayLobby extends AbstractLobbyAction {
  String message;
  SayLobby() {
  }
  SayLobby.data(SayLobbyData d) {
    SayLobbyData data = d;
    id = d.id;
    userId = d.userId;
  }
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
  String boardName;
  Game game;
  GameData createdGame;

  NewGame();
  NewGame.data(JsonObject json) {
    NewGameData data = json;
    name = data.name;
    boardName = data.boardName;
    id = data.id;
    userId = data.userId;
    createdGame = data.createdGame;
  }
  prepare(Lobby lobby) {
    super.prepare(lobby);
  }
  update(Lobby lobby) {
    lobby.games.add(game);
  }
  void performServer(ServerGame serverGame) {
    game = new Game.data(createdGame);
    Board board = new Board.name(boardName);
    board.make(serverGame.random);
    game.board = board;
    game.host = user;
    game.users.add(user);
  }
  String toText() => "${user.name} created a new game: ${game.name}";
  JsonObject get data() {
    NewGameData data = new JsonObject();
    data.userId = userId;
    data.createdGame = createdGame;
    data.type = Dartan.name(this);
    return data;
  }
}
interface NewGameData extends JsonObject {
  String type;
  int id;
  int userId;
  String name;
  String boardName;
  GameData createdGame;
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