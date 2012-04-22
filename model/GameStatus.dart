/** Status of the game */
interface GameStatus extends Hashable, Testable {
  bool get blocks();
  String get description();
  bool get waitsForPlayers();
  bool get isPlaying();
}
class SupportedGameStatuses extends ImmutableL<GameStatus> {
  SupportedGameStatuses() : super([new AbstractGameStatus(), new Playing()]);
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