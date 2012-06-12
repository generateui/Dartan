interface DevelopmentCard
  extends Identifyable, Hashable, Testable, Jsonable {

  bool get onePerTurn(); // Is this devcard limited to play one per turn?
  bool get summoningSickness(); // Wait one turn before able to play this card?
  bool get keepInStock(); // After playing, move the card to stock?
  bool turnAllowed(TurnPhase turn);
  bool gameAllowed(GamePhase phase);
  Turn turnBought;
  Turn turnPlayed;
  Player player;
}
class SupportedDevelopmentCards extends ImmutableL<DevelopmentCard> {
  SupportedDevelopmentCards() : super([
    new AbstractDevelopmentCard(),
    new VictoryPoint(),
    new Knight(),
    new Invention(),
    new DummyDevelopmentCard()
  ]);
}
interface DevelopmentCardData extends JsonObject {
  int id;
  int playerId;
  String type;
  int turnBoughtId;
  int turnPlayedId;
}
class AbstractDevelopmentCard implements DevelopmentCard {
  int id;
  int _playerId;
  int turnBoughtId;
  int turnPlayedId;

  Turn turnPlayed;
  Turn turnBought;
  Player player;

  AbstractDevelopmentCard([this.id]);
  AbstractDevelopmentCard.data(JsonObject json) {
    DevelopmentCardData data = json;
    id = data.id;
    _playerId = data.playerId == null ? null : data.playerId;
    turnBoughtId = data.turnBoughtId;
    turnPlayedId = data.turnPlayedId;
  }
  bool get onePerTurn() => true;
  bool get summoningSickness() => true;
  bool get keepInStock() => true;
  bool turnAllowed(TurnPhase turnPhase) => true;
  bool gameAllowed(GamePhase gamePhase) => true;

  // Hashable
  int hashCode() {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  bool equals(other) => other.id == id;
  // Copyable
  DevelopmentCard copy([JsonObject data]) => data == null?
      new AbstractDevelopmentCard() : new AbstractDevelopmentCard.data(data);
  // Jsonable
  JsonObject get data() {
    DevelopmentCardData data = new JsonObject();
    data.id=id;
    data.type = Dartan.name(this);
    data.playerId = player == null ? _playerId == null ?
        null : _playerId : player.id;
    data.turnBoughtId = turnBought == null ? turnBoughtId == null ?
        null : turnBoughtId : turnBought.id;
    data.turnPlayedId = turnPlayed == null ? turnPlayedId == null ?
        null : turnPlayedId : turnPlayed.id;

    return data;
  }
  test() {}
}
interface InventionData extends DevelopmentCardData {
  List resourcePicks;
}
/** Player picks two resources he then gets */
class Invention extends AbstractDevelopmentCard {
  ResourceList picks;

  Invention();
  Invention.data(JsonObject json) : super.data(json) {
    InventionData data = json;
    //picks = new
  }
  JsonObject get data() {
    InventionData json = super.data;
    json.resourcePicks = Oracle.toDataList(picks);
    return json;
  }
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new Invention() : new Invention.data(data);
}
interface VictoryPointData extends DevelopmentCardData {
  String bonusName;
}
class VictoryPoint extends AbstractDevelopmentCard implements VictoryPointItem {
  static List<String> bonuses = const["Market", "University", "Town Hall"];
  String bonusName;

  VictoryPoint([int id, this.bonusName]): super(id);
  VictoryPoint.market() : bonusName = bonuses[0];
  VictoryPoint.university() : bonusName = bonuses[1];
  VictoryPoint.townHall() : bonusName = bonuses[2];
  VictoryPoint.data(JsonObject json) : super.data(json) {
    VictoryPointData data = json;
    bonusName = data.bonusName;
  }
  JsonObject get data() {
    VictoryPointData json = super.data;
    json.bonusName = bonusName;
    return json;
  }
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new VictoryPoint() : new VictoryPoint.data(data);

  bool get summoningSickness() => false;
  bool get onePerTurn() => false;
  int get points() => 1;
}
/** Clientside placeholder for a devcard in the stack of devcards */
class DummyDevelopmentCard extends AbstractDevelopmentCard {
  DummyDevelopmentCard([int id]) : super(id);
  DummyDevelopmentCard.data(JsonObject json) : super.data(json);
  DummyDevelopmentCard copy([JsonObject data]) =>
      data == null ? new DummyDevelopmentCard() : new DummyDevelopmentCard.data(data);
}
/** Move the robber, rob a player and build an army */
class Knight extends AbstractDevelopmentCard {
  Knight([id]) : super(id);
  Knight.data(JsonObject json) : super.data(json);
  bool turnAllowed(TurnPhase turnPhase) =>
      turnPhase.isBeforeDiceRoll || turnPhase.isBuilding;
  bool gameAllowed(GamePhase gamePhase) => gamePhase.isTurns;
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new Knight() : new Knight.data(data);
}
