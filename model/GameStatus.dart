/** Status of the game */
interface GameStatus extends Hashable, Testable, Identifyable, Jsonable, Copyable {
  bool get blocks();
  String get description();
  bool get waitsForPlayers();
  bool get isPlaying();
}
class SupportedGameStatuses extends ImmutableL<GameStatus> {
  SupportedGameStatuses() : super([
    new AbstractGameStatus(), new Playing(), new WaitingForReplacingUser(),
    new AllStatuses()]);
}
interface GameStatusData extends JsonObject {
  int id;
  String type;
}
interface AllStatusesData extends JsonObject {
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
  bool get blocks() => _current.blocks;
  bool get waitsForPlayers() => _current.waitsForPlayers;
  bool get isPlaying() => _current.isPlaying;
  int hashCode() =>  _current.hashCode();
  String get description() => _current.description;
  AllStatuses();
  AllStatuses.data(JsonObject json) {

  }
  AllStatuses copy([JsonObject data]) =>
      data == null ? new AllStatuses() : new AllStatuses.data(data);
  JsonObject get data() {
    AllStatusesData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.playing =nullOrDataFrom(playing);
    data.lobbying = nullOrDataFrom(lobbying);
    data.waitingForReplacingUser = nullOrDataFrom(waitingForReplacingUser);
    data.currentStatusId = _current == null ? null : _current.id;
    return data;
  }
  bool equals(other) => other.id==id;
  test() {}
}
class AbstractGameStatus implements GameStatus {
  int id;
  bool get blocks() => false;
  bool get waitsForPlayers() => false;
  bool get isPlaying() => true;
  String get description() => "Abstract GameStatus implementation";
  AbstractGameStatus();
  AbstractGameStatus.data(JsonObject json) {
    GameStatusData data = json;
    id = data.id;
  }
  int hashCode() {
    if (id == null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  JsonObject get data() {
    GameStatusData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);;
    return data;
  }
  bool equals(other) => other.id == id;
  AbstractGameStatus copy([JsonObject data]) =>
      data== null ? new AbstractGameStatus() : new AbstractGameStatus.data(data);
  test() {}
}
/** Everything seems OK, playing the game */
class Playing extends AbstractGameStatus {
  Playing();
  Playing.data(JsonObject json) : super.data(json);
  String get description() => "Game is currently going";
  Playing copy([JsonObject data]) =>
      data== null ? new Playing() : new Playing.data(data);
}
/** At the lobby, wiaiting for players */
class Lobbying extends AbstractGameStatus {
  Lobbying();
  Lobbying.data(JsonObject json) : super.data(json);
  String get description() => "Waiting for new players";
  Lobbying copy([JsonObject data]) =>
      data == null ? new Lobbying() : new Lobbying.data(data);
}
/** A user left or disconnected, and now other players wait for a new user to join */
class WaitingForReplacingUser extends AbstractGameStatus {
  WaitingForReplacingUser() {
    playerWithoutUser = new List<Player>();
  }
  WaitingForReplacingUser.data(JsonObject json) : super.data(json);
  List<Player> playerWithoutUser;
  bool get blocks() => true;
  WaitingForReplacingUser copy([JsonObject data]) =>
      data== null ? new WaitingForReplacingUser() : new WaitingForReplacingUser.data(data);
}
