interface GameSettingsData extends JsonObject {
  String type;
  bool withRobber;
  int maxCardsOn7;
  int maxTradesInTurn;
  int playerAmount;
}
/** All the possible settings of a game */
class GameSettings implements Jsonable, Copyable, Testable {
  /** use the robber in the game? */
  bool withRobber = true; //

  /** Max handcards to stay unaffected by robber 7 roll */
  int maxCardsOn7 = 7;    //

  /** Default should be copied from board setting.
  Board are designed for _one_ amount of players, not a range.
  This should get better game by having more tailored board designs */
  int maxTradesInTurn = 3;

  /** Amount of players allowed playing in this game */
  int playerAmount = 3;

  GameSettings();
  GameSettings.data(JsonObject json) {
    GameSettingsData data = json;

    withRobber = data.withRobber;
    maxCardsOn7 = data.maxCardsOn7;
    maxTradesInTurn = data.maxTradesInTurn;
    playerAmount = data.playerAmount;
  }
  JsonObject get data() {
    GameSettingsData data = new JsonObject();
    data.type = Dartan.name(this);
    data.withRobber = withRobber;
    data.maxCardsOn7 = maxCardsOn7;
    data.maxTradesInTurn = maxTradesInTurn;
    data.playerAmount = playerAmount;
    return data;
  }
  // Copyable
  GameSettings copy([JsonObject data]) => data == null ?
      new GameSettings() : new GameSettings.data(data);
  // Testable
  test() {}
  String toText() => "Game Settings";

  bool equals(other) =>
      withRobber == other.withRobber &&
      maxCardsOn7 == other.maxCardsOn7 &&
      maxTradesInTurn == other.maxTradesInTurn &&
      playerAmount == other.playerAmount;
}
