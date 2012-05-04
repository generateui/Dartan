/** A [Player] *has* a user, because players never leave 
the game, but users do leave the game */
class Player implements Hashable, Identifyable, Observable {
  User /* on */ _user;
  int id;
  String color;
  ObservableHelper observable;
  ListenableList<Road> roads;
  ListenableList<EdgePiece> edgePieces;
  ListenableList<VictoryPointItem> victoryPoints;
  ListenableList<Town> towns;
  ListenableList<Producer> producers;
  ListenableList<VerticePiece> verticePieces;
  ListenableList<City> cities;
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
    stock = new Stock();
    roads = new ListenableList<Road>();
    edgePieces = new ListenableList<EdgePiece>();
    victoryPoints= new ListenableList<VictoryPointItem>();
    towns = new ListenableList<Town>();
    producers = new ListenableList<Producer>();
    verticePieces = new ListenableList<VerticePiece>();
    cities = new ListenableList<City>();
  }
  int totalPoints() {
    int total = 0;
    for (VictoryPointItem vp in victoryPoints) {
      total += vp.points;
    }
    return total;
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