interface DevelopmentCard extends Identifyable, Hashable, Testable {
  bool get onePerTurn();
  bool get summoningSickness();
  bool get keepInStock();
  bool turnAllowed(TurnPhase turn);
  bool gameAllowed(GamePhase phase);
  int turnBought;
}
class SupportedDevelopmentCards extends ImmutableL<DevelopmentCard> {
  SupportedDevelopmentCards() : super([new AbstractDevelopmentCard(), new VictoryPoint(), 
    new DummyDevelopmentCard()]);
}
class AbstractDevelopmentCard implements DevelopmentCard {
  int id;
  int turnBought;
  AbstractDevelopmentCard([this.id]);
  bool get onePerTurn() => true;
  bool get summoningSickness() => true;
  bool get keepInStock() => true;
  bool turnAllowed(TurnPhase turnPhase) => true;
  bool gameAllowed(GamePhase gamePhase) => true;
  int hashCode() {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  test() {}
}
class VictoryPoint extends AbstractDevelopmentCard {
  String bonusName; // University, etc..
  VictoryPoint([int id, this.bonusName]): super(id);
  bool get summoningSickness() => false;
  bool get onePerTurn() => false;
}
/** Clientside placeholder for a devcard in the stack of devcards */
class DummyDevelopmentCard extends AbstractDevelopmentCard {
  DummyDevelopmentCard([int id]) : super(id);
}