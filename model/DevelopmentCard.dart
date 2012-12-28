part of Dartan;

abstract class DevelopmentCard
  implements Identifyable, Hashable, Testable, Jsonable {

  bool get onePerTurn; // Is this devcard limited to play one per turn?
  bool get summoningSickness; // Wait one turn before able to play this card?
  bool get keepInStock; // After playing, move the card to stock?
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
abstract class DevelopmentCardData extends JsonObject {
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
  AbstractDevelopmentCard.fromData(JsonObject json) {
    var data = json;
    id = data.id;
    _playerId = data.playerId == null ? null : data.playerId;
    turnBoughtId = data.turnBoughtId;
    turnPlayedId = data.turnPlayedId;
  }
  bool get onePerTurn => true;
  bool get summoningSickness => true;
  bool get keepInStock => true;
  bool turnAllowed(TurnPhase turnPhase) => true;
  bool gameAllowed(GamePhase gamePhase) => true;

  // Hashable
  int get hashCode {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  bool operator ==(other) => other.id == id;
  // Copyable
  DevelopmentCard copy([JsonObject data]) => data == null?
      new AbstractDevelopmentCard() : new AbstractDevelopmentCard.fromData(data);
  // Jsonable
  JsonObject get data {
    var data = new JsonObject();
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
abstract class InventionData extends DevelopmentCardData {
  List resourcePicks;
}
/** Player picks two resources he then gets */
class Invention extends AbstractDevelopmentCard {
  ResourceList picks;

  Invention();
  Invention.fromData(JsonObject json) : super.fromData(json) {
    var data = json;
    //picks = new
  }
  JsonObject get data {
    var json = super.data;
    json.resourcePicks = Oracle.toDataList(picks);
    return json;
  }
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new Invention() : new Invention.fromData(data);
}
abstract class VictoryPointData extends DevelopmentCardData {
  String bonusName;
}
class VictoryPoint extends AbstractDevelopmentCard implements VictoryPointItem {
  static List<String> bonuses = const["Market", "University", "Town Hall"];
  String bonusName;

  VictoryPoint([int id, this.bonusName]): super(id);
  VictoryPoint.market() : bonusName = bonuses[0];
  VictoryPoint.university() : bonusName = bonuses[1];
  VictoryPoint.townHall() : bonusName = bonuses[2];
  VictoryPoint.fromData(JsonObject json) : super.fromData(json) {
    var data = json;
    bonusName = data.bonusName;
  }
  JsonObject get data {
    var json = super.data;
    json.bonusName = bonusName;
    return json;
  }
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new VictoryPoint() : new VictoryPoint.fromData(data);

  bool get summoningSickness => false;
  bool get onePerTurn => false;
  int get points => 1;
}
/** Clientside placeholder for a devcard in the stack of devcards */
class DummyDevelopmentCard extends AbstractDevelopmentCard {
  DummyDevelopmentCard([int id]) : super(id);
  DummyDevelopmentCard.data(JsonObject json) : super.fromData(json);
  DummyDevelopmentCard copy([JsonObject data]) =>
      data == null ? new DummyDevelopmentCard() : new DummyDevelopmentCard.data(data);
}
/** Move the robber, rob a player and build an army */
class Knight extends AbstractDevelopmentCard {
  Knight([id]) : super(id);
  Knight.data(JsonObject json) : super.fromData(json);
  bool turnAllowed(TurnPhase turnPhase) =>
      turnPhase.isBeforeDiceRoll || turnPhase.isBuilding;
  bool gameAllowed(GamePhase gamePhase) => gamePhase.isTurns;
  DevelopmentCard copy([JsonObject data]) => data == null ?
      new Knight() : new Knight.data(data);
}
