/** Any user or server initiated action */
interface Action extends Hashable, Copyable, Identifyable, Testable {
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
/** An action initiated by the server himself */
interface ServerAction extends Action {
  //perform(Application app);
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
  bool get isTrade() => this is TradeAction;

  toText() => "AbstractAction";
  Action copy() => new AbstractAction();
  test() { }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
}