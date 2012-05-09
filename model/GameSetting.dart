/** A setting represented as an object */
interface GameSetting extends Observable {
  setSetting(GameSettings settings);
}
class SupportedSettings extends ImmutableL<GameSetting> {
  SupportedSettings() : super([new WithRobber(), new MaximumCardsInHandWhenSeven(), 
    new MaximumTradesPerTurn()]);
}

/** All the possible settings of a game */
class GameSettings extends ListenableList<GameSetting> {
  WithRobber withRobber;
  MaximumCardsInHandWhenSeven maximumCardsInHandWhenSeven;
  MaximumTradesPerTurn maximumTradesPerTurn;
}
/** Abstract convenenience implementation of a Setting */
class AbstractGameSetting implements GameSetting {
  ObservableHelper observable;
  AbstractGameSetting() : observable = new ObservableHelper();
  // Observable 
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  setSetting(GameSettings settings) { /* empty */ }
}
/** The game will use the robber as playing item */
class WithRobber extends AbstractGameSetting {
  WithRobber() : super();
  setSetting(GameSettings settings) => settings.withRobber = this;
}
/** When 7 rolls, this amount of cards is allowed in the hand of a player */
class MaximumCardsInHandWhenSeven extends AbstractGameSetting {
  MaximumCardsInHandWhenSeven() : super();
  int _maxCards = 7;
  int get maxCards() => _maxCards;
  set maxCards(int newAmount) {
    if (_maxCards != newAmount) {
      int old = _maxCards;
      _maxCards = newAmount;
      observable.fire("maxCards", old, _maxCards);
    }
  }
  setSetting(GameSettings settings) => settings.maximumCardsInHandWhenSeven = this;
}
/** When not present, there is no maximum amount of trades per turn */
class MaximumTradesPerTurn extends AbstractGameSetting {
  MaximumTradesPerTurn() : super();
  int _maxTrades = 3;
  int get maxTrades() => _maxTrades;
  set maxTrades(int newAmount) {
    if (_maxTrades != newAmount) {
      int old = _maxTrades;
      _maxTrades = newAmount;
      observable.fire("maxTrades", old, newAmount);
    }
  }
  setSetting(GameSettings settings) => settings.maximumTradesPerTurn = this;
}
