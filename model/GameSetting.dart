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
class AbstractGameSetting implements GameSetting {
  
}
/** The game will use the robber as playing item */
class WithRobber implements GameSetting {
  setSetting(GameSettings settings) => settings.withRobber = this;
}
/** When 7 rolls, this amount of cards is allowed in the hand of a player */
class MaximumCardsInHandWhenSeven implements GameSetting {
  int maxCards = 7;
  setSetting(GameSettings settings) => settings.maximumCardsInHandWhenSeven = this;
}
/** When not present, there is no maximum amount of trades per turn */
class MaximumTradesPerTurn implements GameSetting {
  int maxTrades = 3; 
  setSetting(GameSettings settings) => settings.maximumTradesPerTurn = this;
}
