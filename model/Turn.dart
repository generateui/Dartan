class Turn implements Identifyable {
  int id;
  Player player;
  int humanIndex; // 1 based as opposed to 0-based
  ListenableList<TradeAction> trades;

  Turn([this.humanIndex, this.player]);
}