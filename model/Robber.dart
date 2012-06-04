interface RobberData extends JsonObject{
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
  Robber.data(JsonObject json) {
    init();
    RobberData data = json;
    cell = new Cell.data(data.cell);
  }
  move(Cell newCell) {
    if (cell != newCell) {
      Cell oldCell = cell;
      cell = newCell;
      observable.fire("cell", oldCell, newCell);
    }
  }
  // Jsonable
  JsonObject get data() {
    RobberData data = new JsonObject();
    data.cell = cell.data;
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
  Robber copy([JsonObject data]) => data == null ?
      new Robber() : new Robber.data(data);
  // Testable
  test() {

  }
}
