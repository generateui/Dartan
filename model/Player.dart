part of Dartan;

abstract class PlayerData extends JsonObject{
  int id;
  String type;
  UserData user;
  String color;
  List resources;
  List ports;

  List roads;
  List towns;
  List cities;

  List edgePieces;
  List verticePieces;
  List victoryPoints;
  List producers;
  List knights;
  List playedDevelopmentCards;
  StockData stock;
}
/** A [Player] *has* a user, because players never leave
the game, but users do leave the game */
class Player implements Hashable, Identifyable, Observable, Jsonable, Testable {
  static List<String> allColors = const ["green", "blue", "white", "orange"];
  User /* on */ _user;
  int id;
  int _userId;
  String color;
  ObservableHelper observable;

  ResourceListMu resources;
  PortListMu ports;
  ListenableList<Road> roads;
  ListenableList<Town> towns;
  ListenableList<City> cities;
  ListenableList<EdgePiece> edgePieces;
  ListenableList<VerticePiece> verticePieces;
  ListenableList<VictoryPointItem> victoryPoints;
  ListenableList<Producer> producers;
  ListenableList<Knight> knights;
  ListenableList<DevelopmentCard> playedDevelopmentCards;
  Stock stock;

  /* A user can change because users may leave or join, but players stay */
  User /* on */ get user => _user;
  set /* on */ user(User u) {
    if (user != u) {
      User old = _user;
      _user=u;
      observable.fire("user", old, _user);
    }
  }
  init() {
    observable = new ObservableHelper();
  }
  Player.fromData(JsonObject json) {
    init();

    var data = json;
    id = data.id;
    user = data.user == null ? null : new User.fromData(data.user);
    color = data.color;

    data.resources.forEach((d) { resources.add(new Jsonable.fromData(d)); });
    ports = new PortListMu.from(Oracle.fromDataList(data.ports));

    roads = llFrom(data.roads);
    towns = llFrom(data.towns);
    cities = llFrom(data.cities);

    edgePieces = llFrom(data.edgePieces);
    verticePieces = llFrom(data.verticePieces);
    victoryPoints = llFrom(data.victoryPoints);
    knights = llFrom(data.knights);
    playedDevelopmentCards = llFrom(data.playedDevelopmentCards);
    producers = llFrom(data.producers);
    stock = fromData(data.stock);
  }
  Player([this._user]) {
    init();

    resources = new ResourceListMu();
    ports = new PortListMu();

    roads = new ListenableList<Road>();
    cities = new ListenableList<City>();
    towns = new ListenableList<Town>();

    edgePieces = new ListenableList<EdgePiece>();
    verticePieces = new ListenableList<VerticePiece>();
    victoryPoints= new ListenableList<VictoryPointItem>();
    knights = new ListenableList<Knight>();
    playedDevelopmentCards = new ListenableList<DevelopmentCard>();
    ports = new PortListMu();
    producers = new ListenableList<Producer>();
    stock = new Stock();
  }
  int totalPoints() {
    int total = 0;
    for (VictoryPointItem vp in victoryPoints) {
      total += vp.points;
    }
    return total;
  }
  /* TODO IMPLEMENT */
  bool canPay(Piece toBuy) {
    return false;
  }

  String toText() => "${id}, ${_user.name}, ${color}";
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  // Jsonable
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.user = nullOrDataFrom(user);
    data.type = Dartan.name(this);
    data.color = color;

    data.resources = Oracle.toDataList(resources);
    data.ports = Oracle.toDataList(ports);

    data.roads = Oracle.toDataList(roads);
    data.cities = Oracle.toDataList(cities);
    data.towns = Oracle.toDataList(towns);

    data.edgePieces = nullOrDataListFrom(edgePieces);
    data.verticePieces = nullOrDataListFrom(verticePieces);
    data.victoryPoints = nullOrDataListFrom(victoryPoints);
    data.knights = nullOrDataListFrom(knights);
    data.playedDevelopmentCards = nullOrDataListFrom(playedDevelopmentCards);
    data.producers =  nullOrDataListFrom(producers);
    data.stock = stock.data;
        return data;
  }
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Copyable
  Player copy([JsonObject data]) =>
      data == null ? new Player(user) : new Player.fromData(data);
  bool operator ==(other) => id == other.id;
  test() {

  }
}
abstract class UserData extends JsonObject {
  int id;
  String name;
  String email;
  String type;
}
/** A person playing the game */
class User implements Hashable, Identifyable, Jsonable, Testable {
  int id;
  String name;
  String email;

  bool get hasEmail => email != null;

  User([this.id, this.name, this.email]);
  User.fromData(JsonObject json) {
    var data = json;
    id = data.id;
    name = data.name;
    email = data.email;
  }

  // Jsonable
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.name = name;
    data.email = email;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  bool operator ==(other) =>
    id == other.id &&
    name == other.name &&
    email == other.email;

  // Copyable
  User copy([JsonObject data]) => data == null ? new User() : new User.fromData(data);
  String toText() => "[${id}, ${name}, ${email}]";
  test() {

  }
}
/** The server as a user */
class ServerUser extends User {
  ServerUser() {
    id = 0;
    name = "Server";
    email = "server@dartan.test";
  }
}
class PlayerListMu extends ListenableList<Player> {
  /** All opponents of target player */
  List<Player> opponents(Player ofPlayer) =>
      filter(((Player p) => p != ofPlayer));
  /** Returns the next player based on given player from this list */
  Player next(Player from) {
    int index = indexOf(from);
    if (index == length - 1) {
      index = 0;
    }
    return this[index];
  }
  PlayerListMu();
  PlayerListMu.from(List<Player> players) : super.from(players);
}