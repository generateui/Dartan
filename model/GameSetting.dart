/** A setting represented as an object */
interface GameSetting extends Observable {
  bool isEnabled;
  setSetting(GameSettings settings);
}
class SupportedSettings extends ImmutableL<GameSetting> {
  SupportedSettings() : super([new WithRobber(), new MaximumCardsInHandWhenSeven(),
    new MaximumTradesPerTurn()]);
}

/** All the possible settings of a game */
class GameSettings {
  WithRobber withRobber;
  MaximumCardsInHandWhenSeven maximumCardsInHandWhenSeven;
  MaximumTradesPerTurn maximumTradesPerTurn;
  GameSettings() {
    withRobber = new WithRobber();
    maximumCardsInHandWhenSeven = new MaximumCardsInHandWhenSeven();
    maximumTradesPerTurn = new MaximumTradesPerTurn();
  }
}
/** Abstract convenenience implementation of a Setting */
class AbstractGameSetting implements GameSetting {
  ObservableHelper observable;
  bool _isEnabled;
  bool get isEnabled() => _isEnabled;
  set isEnabled(bool enabled) {
    if (enabled != _isEnabled) {
      bool oldEnabled = _isEnabled;
      _isEnabled = enabled;
      observable.fire("isEnabled", oldEnabled, enabled);
    }
  }
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
  WithRobber() : super() {
    _isEnabled = true;
  }
  setSetting(GameSettings settings) => settings.withRobber = this;
}
/** When 7 rolls, this amount of cards is allowed in the hand of a player */
class MaximumCardsInHandWhenSeven extends AbstractGameSetting {
  MaximumCardsInHandWhenSeven() : super() {
    _isEnabled = true;
  }
  int _maxCards = 7;
  int get maxCards() => _maxCards;
  set maxCards(int newAmount) {
    if (_maxCards != newAmount) {
      int old = _maxCards;
      _maxCards = newAmount;
      observable.fire("maxCards", old, _maxCards);
    }
  }
  setSettings(GameSettings settings) {
    settings.maximumCardsInHandWhenSeven.maxCards = maxCards;
  }
}
/** When not present, there is no maximum amount of trades per turn */
class MaximumTradesPerTurn extends AbstractGameSetting {
  MaximumTradesPerTurn() : super() {
    _isEnabled = true;
  }
  int _maxTrades = 3;
  int get maxTrades() => _maxTrades;
  set maxTrades(int newAmount) {
    if (_maxTrades != newAmount) {
      int old = _maxTrades;
      _maxTrades = newAmount;
      observable.fire("maxTrades", old, newAmount);
    }
  }
  setSettings(GameSettings settings) {
    settings.maximumTradesPerTurn.maxTrades = maxTrades;
  }
}
