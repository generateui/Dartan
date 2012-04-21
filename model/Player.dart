class Player implements Hashable, Identifyable {
  String name;
  int id;
  String color;
  
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
}