part of Dartan;

abstract class TurnData extends JsonObject{
  String type;
  int id;
  int playerId;
  int userId;
  int humanIndex; // Don't depend on id for turn numbering
  List trades; // TODO: implement
}
class Turn implements Identifyable, Hashable, Copyable, Jsonable {
  int id; // Consecutive index, starting at 1
  int playerId;
  int userId;
  Player player;
  ObservableHelper observable;
  int humanIndex; // 1 based as opposed to 0-based

  // Instance changes when latest offer changes (an offer is added)
  Map<TradeOffer, List<TradeResponse>> responsesByOffer;
  Set<TradeOffer> get offers => responsesByOffer.keys;

  ListenableList<TradeResponse> currentResponses;
  TradeOffer _latestOffer;

  TradeOffer get latestOffer => _latestOffer;
  set latestOffer(TradeOffer offer) {
    TradeOffer old = _latestOffer;
    _latestOffer = offer;
    observable.fire("latestOffer", old, offer);
  }

  init() {
    observable = new ObservableHelper();
    currentResponses = new ListenableList<TradeResponse>();
    responsesByOffer = new Map<TradeOffer, List<TradeResponse>>();
  }
  Turn.next(Turn current) {
    id = current.id++;
  }
  Turn([this.humanIndex, this.player]) {
    init();
  }
  Turn.fromData(JsonObject json) {
    init();
    TurnData data = json;
    playerId = data.playerId;
    humanIndex = data.humanIndex;
    id = data.id;
    userId = data.userId;
  }

  /** Adds target response to the map off responses to offers */
  addTradeResponse(TradeResponse response, TradeOffer offer) {
    if (responsesByOffer.containsKey(offer)) {
      responsesByOffer[offer].add(response);
      if (offer == latestOffer) {
        currentResponses.add(response);
      }
    }
  }
  /** Adds target offer and sets it as latest */
  addTradeOffer(TradeOffer offer) {
    responsesByOffer[offer] = new List<TradeResponse>();
    currentResponses = new ListenableList<TradeResponse>();
    _latestOffer = offer;
  }

  // Jsonable
  JsonObject get data {
    TurnData data = new JsonObject();
    data.id = id;
    data.userId = userId;
    data.playerId = playerId;
    data.humanIndex = humanIndex;
    data.type = Dartan.name(this);
    return data;
  }
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  // Copyable
  Turn copy([JsonObject data]) =>
      data == null ? new Turn() : new Turn.fromData(data);

  bool equals(other) => other.id == id &&
      other.playerId == playerId;
}