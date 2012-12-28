part of Dartan;

/** Status of the game

wait for user
wait for turn action
wait for queued
  -RobPlayer (next)
  -MoveRobber (next)
  -PickGold (next / each player)
  -Build Town (next)
  -Build Road (next)
  -Roll Dice (next:DetFirstPlayer); // not queued in normal game
*/
abstract class GameStatus implements Hashable, Testable, Identifyable, Jsonable, Copyable {
  bool get blocks;
  String get description;
  bool get waitsForPlayers;
  bool get isPlaying;
}
class SupportedGameStatuses extends ImmutableL<GameStatus> {
  SupportedGameStatuses() : super([
    new AbstractGameStatus(), new Playing(), new WaitingForReplacingUser(),
    new AllStatuses()]);
}
abstract class GameStatusData extends JsonObject {
  int id;
  String type;
}
abstract class AllStatusesData extends JsonObject {
  int id;
  String type;
  GameStatusData playing;
  GameStatusData lobbying;
  GameStatusData waitingForReplacingUser;
  int currentStatusId;
}
class AllStatuses implements GameStatus {
  int id;
  Playing playing;
  Lobbying lobbying;
  WaitingForReplacingUser waitingForReplacingUser;
  GameStatus _current;
  bool get blocks => _current.blocks;
  bool get waitsForPlayers => _current.waitsForPlayers;
  bool get isPlaying => _current.isPlaying;
  int get hashCode =>  _current.hashCode;
  String get description => _current.description;

  AllStatuses();
  AllStatuses.fromData(JsonObject json) { }

  AllStatuses copy([JsonObject data]) =>
      data == null ? new AllStatuses() : new AllStatuses.fromData(data);
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.playing =nullOrDataFrom(playing);
    data.lobbying = nullOrDataFrom(lobbying);
    data.waitingForReplacingUser = nullOrDataFrom(waitingForReplacingUser);
    data.currentStatusId = _current == null ? null : _current.id;
    return data;
  }
  bool operator ==(other) => other.id==id;
  test() {}
}
class AbstractGameStatus implements GameStatus {
  int id;
  bool get blocks => false; /** !!! Default non-blocking !!! */
  bool get waitsForPlayers => false;
  bool get isPlaying => true;
  String get description => "Abstract GameStatus implementation";
  AbstractGameStatus();
  AbstractGameStatus.fromData(JsonObject json) {
    var data = json;
    id = data.id;
  }
  int get hashCode {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);;
    return data;
  }
  bool operator ==(other) => other.id == id;
  AbstractGameStatus copy([JsonObject data]) =>
      data== null ? new AbstractGameStatus() : new AbstractGameStatus.fromData(data);
  test() {}
}
/** Everything seems OK, playing the game */
class Playing extends AbstractGameStatus {
  Playing();
  Playing.data(JsonObject json) : super.fromData(json);
  String get description => "Game is currently going";
  Playing copy([JsonObject data]) =>
      data== null ? new Playing() : new Playing.data(data);
}
/** At the lobby, wiaiting for players */
class Lobbying extends AbstractGameStatus {
  Lobbying();
  Lobbying.data(JsonObject json) : super.fromData(json);
  String get description => "Waiting for new players";
  Lobbying copy([JsonObject data]) =>
      data == null ? new Lobbying() : new Lobbying.data(data);
}
/** A user left or disconnected, and now other players wait for a new user to join */
class WaitingForReplacingUser extends AbstractGameStatus {
  WaitingForReplacingUser() {
    playerWithoutUser = new List<Player>();
  }
  WaitingForReplacingUser.data(JsonObject json) : super.fromData(json);
  List<Player> playerWithoutUser;
  bool get blocks => true;
  WaitingForReplacingUser copy([JsonObject data]) =>
      data== null ? new WaitingForReplacingUser() : new WaitingForReplacingUser.data(data);
}
