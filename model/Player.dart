/** A [Player] *has* a user, because players never leave 
the game, but users do leave the game */
class Player implements Hashable, Identifyable, Observable {
  User /* on */ user;
  int id;
  String color;
  ObservableHelper observable;
  Player(this.user) {
    id = user.id;
  }
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  String toText() => "[${id}, ${user.name}, ${color}";
  /** Observable */
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
}
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
  Player next(Player from) {
    int index = indexOf(from);
    if (index == length - 1) {
      index = 0;
    }
    return this[index];
  }
}