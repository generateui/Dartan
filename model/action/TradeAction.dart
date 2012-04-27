/** Any action related to trading in the game */
interface TradeAction extends Action {
  ResourceList offered;
  ResourceList wanted;
}
class SupportedTradeActions extends ImmutableL<TradeAction> {
  SupportedTradeActions(): super([new AbstractTradeAction(), new TradeBank(), 
    new TradeOffer(), new RejectOffer(), new CounterOffer(), new AcceptOffer()]);
}
/** Any response to a trade action */
interface TradeResponse extends TradeAction { 
  TradeOffer offer;
  int offerId;
}
/** Convenience impl for [TradeAction] */
class AbstractTradeAction extends AbstractAction implements TradeAction {
  ResourceList offered;
  ResourceList wanted;
  bool allowedGamePhase(GamePhase gp) => gp.isTurns; 
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
}
/** Use a [Port] to trade resources with the bank */
class TradeBank extends AbstractTradeAction implements TradeAction {
  
}
/** Try getting "wanted" in place of "offered" */
class TradeOffer extends AbstractTradeAction {
  bool _allPlayersResponded = false;
  ListenableList<TradeResponse> responses;
  bool get allPlayersResponded() => _allPlayersResponded;
}
/** Do not want */
class RejectOffer extends AbstractTradeAction implements TradeResponse {
  TradeOffer offer;
  int offerId;
}
class CounterOffer extends AbstractTradeAction implements TradeResponse {
  TradeOffer offer;
  int offerId;
}
/** Wanted & Offered are flipped, because this action is seen from the accepting player */
class AcceptOffer extends AbstractTradeAction  implements TradeResponse{
  TradeOffer offer;  
  int offerId;
}