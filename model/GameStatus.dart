/** Status of the game */
interface GameStatus extends Hashable, Testable {
  bool get blocks();
  String get description();
  bool get waitsForPlayers();
  bool get isPlaying();
}
class SupportedGameStatuses extends ImmutableL<GameStatus> {
  SupportedGameStatuses() : super([new AbstractGameStatus(), new Playing(), new WaitingForReplacingUser()]);
}
interface GameStatusData {
  bool playing;
  bool lobbying;
}
class AllStatuses implements GameStatus {
  Playing playing;
  Lobbying lobbying;
  WaitingForReplacingUser waitingForReplacement;
  GameStatus _current;
  bool get blocks() => _current.blocks;
  bool get waitsForPlayers() => _current.waitsForPlayers;
  bool get isPlaying() => _current.isPlaying;
  int hashCode() =>  _current.hashCode();
  test() {}
  String get description() => _current.description;
}
class AbstractGameStatus implements GameStatus {
  int id;
  bool get blocks() => false;
  bool get waitsForPlayers() => false;
  bool get isPlaying() => true;
  String get description() => "Abstract GameStatus implementation";
  int hashCode() {
    if (id == null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  test() {}
}
class Playing extends AbstractGameStatus {
  String get description() => "Game is currently going";
}
class Lobbying extends AbstractGameStatus {
  String get description() => "Waiting for new players";
}
/** A user left or disconnected, and now other players wait for a new user to join */
class WaitingForReplacingUser extends AbstractGameStatus {
  List<Player> playerWithoutUser;
  bool get blocks() => true;
  WaitingForReplacingUser() {
    playerWithoutUser = new List<Player>();
  }
}