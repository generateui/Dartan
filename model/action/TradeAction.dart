/** Any response to a trade action */
interface TradeResponse extends GameAction {
  TradeOffer offer;
  int offerId;
}
interface TradeBankData extends GameActionData {
  List offered;
  List wanted;
}
/** Use a [Port] to trade resources with the bank */
class TradeBank extends AbstractGameAction {
  ResourceList offered;
  ResourceList wanted;

  TradeBank();
  TradeBank.data(JsonObject json) : super.data(json) {
    TradeBankData data = json;
    wanted = new ResourceListIm(listFrom(data.wanted));
    offered = new ResourceListIm(listFrom(data.offered));
  }

  perform(Game game) {
//    game.bank.remove(wanted);
    game.bank.addAll(offered);
    player.resources.addAll(wanted);
  }

  bool allowedGamePhase(GamePhase gp) => gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
  bool get isTrade() => true;

  JsonObject get data() {
    TradeOfferData data = super.data;
    data.wanted = nullOrDataListFrom(wanted);
    data.offered = nullOrDataListFrom(offered);
    return data;
  }
  TradeBank copy([JsonObject data]) => data == null ?
      new TradeBank() : new TradeBank.data(data);
}
interface TradeOfferData extends GameActionData {
  List offered;
  List wanted;
}
/** Try getting "wanted" in place of "offered" */
class TradeOffer extends AbstractGameAction {
  ResourceList wanted;
  ResourceList offered;
  bool _allPlayersResponded = false;
  ListenableList<TradeResponse> responses;

  TradeOffer();
  TradeOffer.data(JsonObject json) : super.data(json) {
    TradeOfferData data = json;
    wanted = new ResourceListIm(listFrom(data.wanted));
    offered = new ResourceListIm(listFrom(data.offered));
  }
  perform(Game game) {
    game.turn.addTradeOffer(this);
  }
  bool allowedGamePhase(GamePhase gp) => gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
  bool get isTrade() => true;

  JsonObject get data() {
    TradeOfferData data = super.data;
    data.wanted = nullOrDataListFrom(wanted);
    data.offered = nullOrDataListFrom(offered);
    return data;
  }

  bool get allPlayersResponded() => _allPlayersResponded;
  TradeOffer copy([JsonObject data]) => data == null ?
      new TradeOffer() : new TradeOffer.data(data);
}
interface RejectOfferData extends GameActionData {
  int offerId;
}
class RejectOffer extends AbstractGameAction implements TradeResponse {
  TradeOffer offer;
  int offerId;

  prepare(Game game) {
    offer = byId(offerId, game.turn.offers);
  }
  perform(Game game) {
    game.turn.addTradeResponse(this, offer);
  }

  RejectOffer();
  RejectOffer.data(JsonObject json) : super.data(json);

  bool allowedGamePhase(GamePhase gp) => gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
  bool get isTrade() => true;

  JsonObject get data() {
    RejectOfferData data = super.data;
    data.offerId = offerId;
    return data;
  }
  RejectOffer copy([JsonObject data]) => data == null ?
      new RejectOffer() : new RejectOffer.data(data);
}
interface CounterOfferData extends GameActionData {
  List offered;
  List wanted;
  int offerId;
}
/** A player offers a new trade as response to a previous trade offer */
class CounterOffer extends AbstractGameAction implements TradeResponse {
  ResourceList wanted;
  ResourceList offered;
  int offerId;
  TradeOffer offer;

  prepare(Game game) {
    offer = byId(offerId, game.turn.offers);
  }
  perform(Game game) {
    game.turn.addTradeResponse(this, offer);
  }

  CounterOffer();
  CounterOffer.data(JsonObject json) : super.data(json) {
    CounterOfferData data = json;
    offerId = data.offerId;
    wanted = new ResourceListIm(listFrom(data.wanted));
    offered = new ResourceListIm(listFrom(data.offered));
  }
  bool allowedGamePhase(GamePhase gp) => gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
  bool get isTrade() => true;

  JsonObject get data() {
    CounterOfferData data = super.data;
    data.offerId = offerId;
    data.wanted = Oracle.toDataList(wanted);
    data.offered = Oracle.toDataList(offered);
    return data;
  }
  CounterOffer copy([JsonObject data]) => data == null ?
      new CounterOffer() : new CounterOffer.data(data);

  String toText() => "${player.user.name} countered ";
}


interface AcceptOfferData extends GameActionData {
  int offerId;
}
/** Wanted & Offered are flipped, because this action is seen from the accepting player */
class AcceptOffer extends AbstractGameAction  implements TradeResponse {
  TradeOffer offer;
  int offerId;

  AcceptOffer();
  AcceptOffer.data(JsonObject json) : super.data(json) {
    AcceptOfferData data = json;
    offerId = data.offerId;
  }
  prepare(Game game) {
    offer = byId(offerId, game.turn.offers);
  }
  perform(Game game) {
    game.turn.addTradeResponse(this, offer);
  }
  bool allowedGamePhase(GamePhase gp) => gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
  bool get isTrade() => true;

  JsonObject get data() {
    RejectOfferData data = super.data;
    data.offerId = offer == null ? offerId == null ?
        null : offerId : offer.id;
    return data;
  }
  AcceptOffer copy([JsonObject data]) => data == null ?
      new AcceptOffer() : new AcceptOffer.data(data);
}
interface TradeData extends GameActionData {
  int toPlayerId;
  int offerId;
  int positiveResponseId;
  List offered;
  List wanted;
}
/** The actual trade of an agreed set of resources */
class Trade extends AbstractGameAction {
  int toPlayerId;
  int offerId; // Originating offer
  int positiveResponseId; // Accept || Counter
  TradeOffer offer;
  TradeResponse positiveResponse;
  Player toPlayer;
  ResourceList offered;
  ResourceList wanted;

  Trade();
  Trade.data(JsonObject json) : super.data(json) {
    TradeData data = json;
    toPlayerId = data.toPlayerId;
    offerId = data.offerId;
    positiveResponseId = data.positiveResponseId;
    offered = new ResourceListIm(listFrom(data.offered));
    wanted = new ResourceListIm(listFrom(data.wanted));
  }
  bool allowedGamePhase(GamePhase gp) => gp.isTurns;
  bool allowedTurnPhase(TurnPhase tp) => tp.isTrading;
  bool get isTrade() => true;

  prepare(Game game) {
    toPlayer = game.playerById(toPlayerId);
    // offer =
    // response =
  }
  perform(Game game) {
    // Actually perform the exchange
  }
  JsonObject get data() {
    TradeData data = super.data;
    data.offerId = offer == null ? offerId == null ?
        null : offerId : offer.id;
    data.positiveResponseId = positiveResponse ==  null ? positiveResponseId == null ?
        null : positiveResponseId : positiveResponse.id;
    data.offered = Oracle.toDataList(offered);
    data.wanted = Oracle.toDataList(wanted);
    return data;
  }
}
