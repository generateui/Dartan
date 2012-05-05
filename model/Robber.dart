class Robber implements Testable, Observable {
  Cell /* on */ cell;
  ObservableHelper observable;
  Robber() {
    observable = new ObservableHelper();
  }
  move(Cell newCell) {
    if (cell != newCell) {
      Cell oldCell = cell;
      cell = newCell;
      observable.fire("cell", oldCell, newCell);
    }
  }
  /** Observable */
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  // Testable
  test() {
    
  }
}
