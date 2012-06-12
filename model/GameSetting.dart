interface GameSettingsData extends JsonObject {
  String type;
  bool withRobber;
  int maxCardsOn7;
  int maxTradesInTurn;
  int playerAmount;
  int stockTowns;
  int stockCities;
  int stockRoads;
  int bankResourceAmount;
  List bankResourceTypes;
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

  /** Amount of road/town/cities players start with in their stock */
  int stockTowns = 5;
  int stockCities = 4;
  int stockRoads = 15;

  /** Amount of resources the bank spawns at start for each type */
  int bankResourceAmount = 19;

  List<Resource> bankResourceTypes;


  GameSettings() {
    bankResourceTypes = new List.from([
      new Wheat(), new Ore(), new Sheep(), new Clay(), new Timber()
    ]);
  }
  GameSettings.data(JsonObject json) : this() {
    GameSettingsData data = json;

    withRobber = data.withRobber;
    maxCardsOn7 = data.maxCardsOn7;
    maxTradesInTurn = data.maxTradesInTurn;
    playerAmount = data.playerAmount;
    stockTowns = data.stockTowns;
    stockCities = data.stockCities;
    stockRoads = data.stockRoads;
    bankResourceAmount = data.bankResourceAmount;
    bankResourceTypes = Oracle.fromDataList(data.bankResourceTypes);
  }
  JsonObject get data() {
    GameSettingsData data = new JsonObject();
    data.type = Dartan.name(this);
    data.withRobber = withRobber;
    data.maxCardsOn7 = maxCardsOn7;
    data.maxTradesInTurn = maxTradesInTurn;
    data.playerAmount = playerAmount;
    data.stockTowns = stockTowns;
    data.stockCities = stockCities;
    data.stockRoads = stockRoads;
    data.bankResourceAmount = bankResourceAmount;
    data.bankResourceTypes = Oracle.toDataList(bankResourceTypes);
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
      playerAmount == other.playerAmount &&
      stockTowns == other.stockTowns &&
      stockCities == other.stockCities &&
      stockRoads == other.stockRoads &&
      bankResourceAmount == other.bankResourceAmount;
}
