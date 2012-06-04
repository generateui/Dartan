interface PlayerData extends JsonObject{
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
class Player implements Hashable, Identifyable, Observable {
  static List<String> allColors = const ["green", "blue", "white", "orange"];
  User /* on */ _user;
  int id;
  String color;
  ObservableHelper observable;
  ResourceListMu resources;
  PortList ports;
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
  set /* on */ user(User u) {
    if (user != u) {
      User old = user;
      user=u;
      observable.fire("user", old, user);
    }
  }
  User /* on */ get user() => _user;
  init() {
    observable = new ObservableHelper();
    ports = new PortListMu();
    stock = new Stock();
    roads = new ListenableList<Road>();
    edgePieces = new ListenableList<EdgePiece>();
    victoryPoints= new ListenableList<VictoryPointItem>();
    towns = new ListenableList<Town>();
    producers = new ListenableList<Producer>();
    verticePieces = new ListenableList<VerticePiece>();
    cities = new ListenableList<City>();
    knights = new ListenableList<Knight>();
    playedDevelopmentCards = new ListenableList<DevelopmentCard>();
  }
  Player.data(JsonObject json) {
    init();

    PlayerData data = json;
    id = data.id;
    color = data.color;

    data.resources.forEach((d) { resources.add(new Resource.data(d)); });
    data.roads.forEach((p) { roads.add(new Road.data(p)); });
    data.towns.forEach((p) { towns.add(new Town.data(p)); });
    data.cities.forEach((p) { cities.add(new City.data(p)); });
    stock = new Stock.data(data.stock);
    data.knights.forEach((p) { knights.add(new Knight.data(p)); });
  }
  Player(this._user) {
    init();

    id = user.id;
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

  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  JsonObject get data() {
    PlayerData data = new JsonObject();
    data.id = id;
    return data;
  }
  String toText() => "${id}, ${_user.name}, ${color}";
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
}
interface UserData extends JsonObject {
  int id;
  String name;
  String email;
  String type;
}
/** A person playing the game */
class User implements Hashable, Identifyable, Jsonable {
  int id;
  String name;
  String email;

  bool get hasEmail() => email != null;

  User([this.id, this.name, this.email]);
  User.data(JsonObject json) {
    UserData data = json;
    id = data.id;
    name = data.name;
    email = data.email;
  }

  // Jsonable
  JsonObject get data() {
    UserData data = new JsonObject();
    data.id = id;
    data.name = name;
    data.email = email;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  // Copyable
  User copy([JsonObject data]) => data == null ? new User() : new User.data(data);
  String toText() => "[${id}, ${name}, ${email}]";
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
}