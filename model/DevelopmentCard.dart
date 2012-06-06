interface DevelopmentCard
  extends Identifyable, Hashable, Testable, Jsonable {

  bool get onePerTurn();
  bool get summoningSickness();
  bool get keepInStock();
  bool turnAllowed(TurnPhase turn);
  bool gameAllowed(GamePhase phase);
  Turn turnBought;
  Turn turnPlayed;
}
class SupportedDevelopmentCards extends ImmutableL<DevelopmentCard> {
  SupportedDevelopmentCards() : super([new AbstractDevelopmentCard(), new VictoryPoint(),
    new DummyDevelopmentCard()]);
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
  int playerId;
  int turnBoughtId;
  int turnPlayedId;

  Turn turnPlayed;
  Turn turnBought;
  Player _player;
  AbstractDevelopmentCard([this.id]);
  AbstractDevelopmentCard.data(JsonObject json) {
    DevelopmentCardData data = json;
    id = data.id;
    playerId = data.playerId == null ? null : data.playerId;
    turnBoughtId = data.turnBoughtId;
    turnPlayedId = data.turnPlayedId;
  }
  bool get onePerTurn() => true;
  bool get summoningSickness() => true;
  bool get keepInStock() => true;
  bool turnAllowed(TurnPhase turnPhase) => true;
  bool gameAllowed(GamePhase gamePhase) => true;
  Player get player() => _player;
  set player(Player p) {
    _player = p;
  }
  int hashCode() {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  bool equals(other) => other.id == id;
  DevelopmentCard copy([JsonObject data]) => data == null?
      new AbstractDevelopmentCard() : new AbstractDevelopmentCard.data(data);
  JsonObject get data() {
    DevelopmentCardData data = new JsonObject();
    data.id=id;
    data.type = Dartan.name(this);
    data.playerId = player == null ? playerId == null ?
        null : playerId : player.id;
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
class VictoryPoint extends AbstractDevelopmentCard {
  String bonusName; // University, etc..
  VictoryPoint([int id, this.bonusName]): super(id);
  VictoryPoint.data(JsonObject json) : super.data(json) {
    VictoryPointData data = json;
    bonusName = data.bonusName;
  }
  JsonObject get data() {
    VictoryPointData json = super.data;
    json.bonusName = bonusName;
    return json;
  }
  bool get summoningSickness() => false;
  bool get onePerTurn() => false;
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new VictoryPoint() : new VictoryPoint.data(data);
}
/** Clientside placeholder for a devcard in the stack of devcards */
class DummyDevelopmentCard extends AbstractDevelopmentCard {
  DummyDevelopmentCard([int id]) : super(id);
  DummyDevelopmentCard.data(JsonObject json) : super.data(json);
  DummyDevelopmentCard copy([JsonObject data]) =>
      data == null ? new DummyDevelopmentCard() : new DummyDevelopmentCard.data(data);
}
interface KnightData extends DevelopmentCardData {
  /* empty */
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
