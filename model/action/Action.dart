/** Any user or server initiated action
    -When sending from client, action is wrapped in a [ClientAction]
    -When sending via server, action is wrapped in a [ViaServer] action
    -When server initiates something, action si wrapped in a [ServerAction]  */
interface Action
  extends Hashable, Copyable, Identifyable, Testable, Jsonable
  default ActionFactory {

  User user;
  int userId;
  Date performedTime;

  /** Flags */
  bool get isServer();
  bool get isGame();
  bool get isLobby();
  bool get isTrade();

  Action.name(String name, JsonObject json);

  toText();
}
class ActionFactory {
  static Map<String, Action> _actions;
  factory Action.name(String name, JsonObject json) {
    if (_actions.containsKey(name)) {
      Action action = _actions[name];
//      action.setJson(json);
      return action.copy();
    }
  }
}
class SupportedActions extends ImmutableL {
  SupportedActions() : super([new AbstractGameAction(), new SayGame()]);
}
/** Abstract convenience implementation of an [Action] */
class AbstractAction implements Action {
  int id;
  User user;
  int userId;
  Date performedTime;

  /** Flags */
  bool get isServer() => this is ServerAction;
  bool get isGame() => this is GameAction;
  bool get isLobby() => this is LobbyAction;
  bool get isTrade() => false;

  toText() => "AbstractAction";
  Action copy([JsonObject data]) => new AbstractAction();
  test() { }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  JsonObject get data() { throw new NotImplementedException(); }
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