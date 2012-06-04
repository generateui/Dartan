interface TurnPhase
  extends Testable, Jsonable, Identifyable
  default Oracle {

  //TurnPhase processAction(GameAction action, Game game);
  //bool isAllowed(GameAction action);
  bool get isBeforeDiceRoll();
  bool get isDiceRoll();
  bool get isTrading();
  bool get isBuilding();
  TurnPhase.data(JsonObject json);
  TurnPhase.type(String type);
}
class SupportedTurnPhases extends ImmutableL<TurnPhase> {
  SupportedTurnPhases() : super([new AbstractTurnPhase(), new TradingTurnPhase(),
    new BuildingTurnPhase(), new DiceRollTurnPhase(), new BeforeDiceRollTurnPhase()]);
}
class AbstractTurnPhase implements TurnPhase {
  int id;
  AbstractTurnPhase();
  _initByData(JsonObject json) {
    TurnPhaseData data = json;
    id = data.id;
  }
  bool get isBeforeDiceRoll() => false;
  bool get isTrading() => false;
  bool get isBuilding() => false;
  bool get isDiceRoll() => false;
  JsonObject get data() {
    TurnPhaseData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  Dynamic copy([JsonObject data]) { throw new NotImplementedException();}
  test() { }
}
interface TurnPhaseData extends JsonObject {
  int id;
  String type;
}
interface AllTurnPhasesData extends JsonObject {
  TurnPhaseData trading;
  TurnPhaseData building;
  TurnPhaseData diceRoll;
  TurnPhaseData beforeDiceRoll;
}
class AllTurnPhases {
  BeforeDiceRollTurnPhase beforeDiceRoll;
  DiceRollTurnPhase diceRoll;
  TradingTurnPhase trading;
  BuildingTurnPhase building;
  List<TurnPhase> phases;
  Iterator<TurnPhase> iterator;
  TurnPhase current;

  AllTurnPhases() {
    beforeDiceRoll = new BeforeDiceRollTurnPhase();
    diceRoll = new DiceRollTurnPhase();
    trading = new TradingTurnPhase();
    building = new BuildingTurnPhase();
    initPhases();
  }
  AllTurnPhases.data(JsonObject json) {
    AllTurnPhasesData data = json;
    beforeDiceRoll = new TurnPhase.data(data.beforeDiceRoll);
    diceRoll = new TurnPhase.data(data.diceRoll);
    trading = new TurnPhase.data(data.trading);
    building = new TurnPhase.data(data.building);
    initPhases();
  }
  initPhases() {
    phases.add(beforeDiceRoll);
    phases.add(diceRoll);
    phases.add(trading);
    phases.add(building);
    iterator = phases.iterator();
    current = iterator.next();
  }

  bool get isBeforeDiceRoll() => current.isBeforeDiceRoll;
  bool get isDiceRoll() => current.isDiceRoll;
  bool get isTrading() => current.isTrading;
  bool get isBuilding() => current.isBuilding;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new AllTurnPhases() : new AllTurnPhases.data(data);
}
class TradingTurnPhase extends AbstractTurnPhase {
  TradingTurnPhase();
  TradingTurnPhase.data(JsonObject json) { _initByData(json); }
  bool get isTrading() => true;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new TradingTurnPhase() : new TradingTurnPhase.data(data);
}
class BuildingTurnPhase extends AbstractTurnPhase {
  BuildingTurnPhase();
  BuildingTurnPhase.data(JsonObject json) { _initByData(json); }
  bool get isBuilding() => true;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new BuildingTurnPhase() : new BuildingTurnPhase.data(data);
}
class DiceRollTurnPhase extends AbstractTurnPhase {
  DiceRollTurnPhase();
  DiceRollTurnPhase.data(JsonObject json) { _initByData(json); }
  bool get isDiceRoll() => true;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new DiceRollTurnPhase() : new DiceRollTurnPhase.data(data);
}
class BeforeDiceRollTurnPhase extends AbstractTurnPhase {
  BeforeDiceRollTurnPhase();
  BeforeDiceRollTurnPhase.data(JsonObject json) { _initByData(json); }
  bool get isBeforeDiceRoll() => true;
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new BeforeDiceRollTurnPhase() : new BeforeDiceRollTurnPhase.data(data);
}
