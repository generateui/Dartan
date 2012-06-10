/** Any user or server initiated action
    -When sending from client, action is wrapped in a [ClientAction]
    -When sending via server, action is wrapped in a [ViaServer] action
    -When server initiates something, action si wrapped in a [ServerAction]

    Actions are async. Within a session,

    */
interface Action
  extends Hashable, Copyable, Identifyable, Testable, Jsonable  {

  User user;
  int userId;
  Date performedTime;

  /** Flags */
  bool get isServer();
  bool get isGame();
  bool get isLobby();
  bool get isTrade();

  toText();
}
interface ActionData extends JsonObject {
  String type;
  int id;
  int userId;
  String performedTime;
}
class SupportedActions extends ImmutableL {
  SupportedActions() : super([new AbstractGameAction(), new Say()]);
}
/** Abstract convenience implementation of an [Action] */
class AbstractAction implements Action {
  int id;
  User user;
  int userId;
  Date performedTime;

  bool get isServer() => this is ServerAction;
  bool get isGame() => this is GameAction;
  bool get isLobby() => this is LobbyAction;
  bool get isTrade() => false;

  // Jsonable
  AbstractAction();
  AbstractAction.data(JsonObject json) {
    ActionData data = json;
    userId = data.userId;
    if (data.performedTime != null) {
      performedTime = new Date.fromString(data.performedTime);
    }
  }
  JsonObject get data()  {
    ActionData data = new JsonObject();
    data.id = id;
    if (data.performedTime != null) {
      data.performedTime = performedTime.toString();
    }
    return data;
  }
  Action copy([JsonObject data]) => new AbstractAction();

  toText() => "AbstractAction id:${id}";

  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  test() { }
}
interface ConnectData extends ActionData {
  UserData connectedUser;
}
class Connect extends AbstractGameAction {
  User connectedUser;

  Connect();
  Connect.data(JsonObject json) : super.data(json) {
    ConnectData data = json;
    connectedUser = new Jsonable.data(data.connectedUser);
  }
}
interface SayData extends GameActionData {
  String message;
  bool isLobby;
}
/** Either a Lobby or Game chat */
class Say
  extends AbstractGameAction
  implements LobbyAction, GameAction {

  bool _isLobby = false;
  String message;

  bool get isServer() => false;
  bool get isGame() => gameId != null;
  bool get isLobby() => _isLobby;
  bool get isTrade() => false;
  bool isValid() => true;
  bool allowedTurnPhase(TurnPhase tp) => true;
  bool allowedGamePhase(GamePhase gp) => true;

  Say();
  Say.game(Game game) { gameId = game.id; }
  Say.lobby() { _isLobby = true; }
  Say.data(SayData json) : super.data(json) {
    SayData data = json;
    message = data.message;
    _isLobby = data.isLobby;
  }

  // Lobbyaction
  prepareLobby(Lobby lobby) {
    if (isLobby) {
      user = byId(userId, lobby.users);
    }
  }
  performAtLobbyServer(lobby) {}
  update(Lobby lobby) {
    lobby.chats.add(this);
  }
  // GameAction
  prepare(Game game) {
    if (isGame) {
      super.prepare(game); // AbstractGameAction
    }
  }
  perform(Game game) {
    game.chats.add(this);
  }
  // Jsonable
  JsonObject get data() {
    SayData data = super.data;
    data.message = message;
    data.isLobby = isLobby;
    return data;
  }
  Say copy([JsonObject data]) => data ==  null ? new Say() : new Say.data(data);
  String toText() => "${user.name}: ${message}";
}
/** An wrapped action from the client to the server */
class ClientAction extends AbstractAction {
  String actionName;
  JsonObject action;
}
/** Action is received at server, performed and broadcasted to interested users */
class ClientViaServer extends AbstractAction {

}
/** Action initiated by server, e.g. Error, notification */
class ServerAction extends AbstractAction {

}
