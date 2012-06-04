interface DevelopmentCard extends Identifyable, Hashable, Testable, Jsonable default Oracle {
  bool get onePerTurn();
  bool get summoningSickness();
  bool get keepInStock();
  bool turnAllowed(TurnPhase turn);
  bool gameAllowed(GamePhase phase);
  Turn turnBought;
  Turn turnPlayed;
  DevelopmentCard.type(String type);
}
class SupportedDevelopmentCards extends ImmutableL<DevelopmentCard> {
  SupportedDevelopmentCards() : super([new AbstractDevelopmentCard(), new VictoryPoint(),
    new DummyDevelopmentCard()]);
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
  DevelopmentCard copy([JsonObject data]) { throw new NotImplementedException(); }
  JsonObject get data() { throw new NotImplementedException(); }
  test() {}
}
interface InventionData extends JsonObject {
  String type;
  int id;
  int playerId;
  int turnPlayedId;
  int turnBoughtId;
  List resourcePicks;
}
class Invention extends AbstractDevelopmentCard {
  ResourceList picks;

  Invention();
  Invention.data(JsonObject json) {
    InventionData data = json;
    id = data.id;
    playerId = data.playerId;
    turnPlayedId = data.turnPlayedId;
    turnBoughtId = data.turnBoughtId;
    //picks = new
  }
  JsonObject get data() {
    InventionData json = new JsonObject();
    json.id = id;
    json.type = Dartan.name(this);
    json.turnPlayedId = turnPlayed == null ? 0 : turnPlayed.id;
    json.turnBoughtId = turnBought == null ? 0 : turnBought.id;
    json.resourcePicks = Oracle.toDataList(picks);
    return json;
  }
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new Invention() : new Invention.data(data);
}
interface VictoryPointData extends JsonObject {
  String type;
  int id;
  int playerId;
  int turnPlayedId;
  String bonusName;
}
class VictoryPoint extends AbstractDevelopmentCard {
  String bonusName; // University, etc..
  VictoryPoint([int id, this.bonusName]): super(id);
  VictoryPoint.data(JsonObject json){
    VictoryPointData data = json;
    id = data.id;
    bonusName = data.bonusName;
  }
  JsonObject get data() {
    VictoryPointData json = new JsonObject();
    json.id = id;
    json.type = Dartan.name(this);
    json.bonusName = bonusName;
    json.turnPlayedId = turnPlayed == null ? 0 : turnPlayed.id;
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
}
interface KnightData extends JsonObject {
  String type;
  int id;
  int playerId;
  int turnPlayedId;
  int turnBoughtId;
}
class Knight extends AbstractDevelopmentCard {
  Knight([id]) : super(id);
  Knight.data(JsonObject json) {
    KnightData data = json;
    id = data.id;
    playerId = data.playerId;
    turnPlayedId = data.turnPlayedId;
  }
  JsonObject get data() {
    KnightData json = new JsonObject();
    json.id = id;
    json.type = Dartan.name(this);
    json.turnPlayedId = turnPlayed == null ? 0 : turnPlayed.id;
    json.turnBoughtId = turnBought == null ? 0 : turnBought.id;
    return json;
  }
  bool turnAllowed(TurnPhase turnPhase) =>
      turnPhase.isBeforeDiceRoll || turnPhase.isBuilding;
  bool gameAllowed(GamePhase gamePhase) => gamePhase.isTurns;
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new Knight() : new Knight.data(data);
}
