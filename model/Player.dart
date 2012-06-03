interface PlayerData {
  int id;
  UserData user;
  String color;
  List<Resource> resources;
  List<Port> ports;
  List<RoadData> roads;
  List<Town> towns;
  List<City> cities;
  List<EdgePiece> edgePieces;
  List<VerticePiece> verticePieces;
  List<VictoryPointItem> victoryPoints;
  List<Producer> producers;
  List<Knight> knights;
  List<DevelopmentCard> playedDevelopmentCards;
}
/** A [Player] *has* a user, because players never leave
the game, but users do leave the game */
class Player implements Hashable, Identifyable, Observable {
  static List<String> allColors = ["green", "blue", "white", "orange"];
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
  set /* on */ user(User u) {
    if (user != u) {
      User old = user;
      user=u;
      observable.fire("user", old, user);
    }
  }
  User /* on */ get user() => _user;
  Player(this._user) {
    id = user.id;
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
  String toText() => "${id}, ${_user.name}, ${color}";
  /** Observable */
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
}
interface UserData {
  int id;
  String name;
  String email;
}
/** A person playing the game */
class User implements Hashable, Identifyable {
  int id;
  String name;
  String email;
  bool get hasEmail() => email != null;
  User([int id, String name, String email]);
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
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