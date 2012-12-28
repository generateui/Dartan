part of Dartan;

abstract class RobberData extends JsonObject {
  String type;
  CellData cell;
}
class Robber implements Testable, Observable, Jsonable {
  Cell /* on */ cell;
  ObservableHelper observable;
  init() {
    observable = new ObservableHelper();
  }
  Robber() {
    init();
  }
  Robber.fromData(JsonObject json) {
    init();
    var data = json;
    cell = fromData(data.cell);
  }
  move(Cell newCell) {
    if (cell != newCell) {
      Cell oldCell = cell;
      cell = newCell;
      observable.fire("cell", oldCell, newCell);
    }
  }
  bool operator ==(other) => cell == other.cell;
  // Jsonable
  JsonObject get data {
    var d = new JsonObject();
    d.type = nameOf(this);
    d.cell = nullOrDataFrom(cell);
    return d;
  }
  // Observable
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Copyable
  Robber copy([JsonObject data]) => data == null ?
      new Robber() : new Robber.fromData(data);
  // Testable
  test() {

  }
}
