interface TurnPhase extends Testable{
  //TurnPhase processAction(GameAction action, Game game);
  //bool isAllowed(GameAction action);
  bool get isBeforeDiceRoll();
  bool get isDiceRoll();
  bool get isTrading();
  bool get isBuilding();
}
class SupportedTurnPhases extends ImmutableL<TurnPhase> {
  SupportedTurnPhases() : super([new AbstractTurnPhase(), new TradingTurnPhase(), 
    new BuildingTurnPhase(), new DiceRollTurnPhase(), new BeforeDiceRollTurnPhase()]);
}
class AbstractTurnPhase implements TurnPhase {
  AbstractTurnPhase();
  bool get isBeforeDiceRoll() => false;
  bool get isTrading() => false;
  bool get isBuilding() => false;
  bool get isDiceRoll() => false;
  test() { }
}
class TradingTurnPhase extends AbstractTurnPhase {
  bool get isTrading() => true;
}
class BuildingTurnPhase extends AbstractTurnPhase {
  bool get isBuilding() => true;
}
class DiceRollTurnPhase extends AbstractTurnPhase {
  bool get isDiceRoll() => true;
}
class BeforeDiceRollTurnPhase extends AbstractTurnPhase {
  bool get isBeforeDiceRoll() => true;
}
