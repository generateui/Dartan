interface Port extends Hashable, Copyable, Identifyable, Testable {
  Cell get seaCell();
  Cell get landCell();
  Resource get resource();
  Edge get edge();
  int get edgeDirection();
  int get inAmount();
  int get outAmount();
  int divide(ResourceList resources, String resourceType);
  bool canTrade(Resource resource);
  String get color();
  bool get hasResource();
}
class SupportedPorts extends ImmutableL<Port> {
  SupportedPorts() : super([new AbstractPort(), new FourToOnePort(), new ThreeToOnePort()]);
}
class AbstractPort implements Port {
  int id;
  Cell _landCell;
  Cell _seaCell;
  Edge _edge;
  int _edgeDirection;
  Cell get landCell() => _landCell;
  Cell get seaCell() => _seaCell;
  Edge get edge() => _edge;
  int get edgeDirection() => _edgeDirection;
  int get inAmount() => 0;
  int get outAmount() => 0;
  String get color() => "black";
  Resource get resource() => null;
  Port copy() => new AbstractPort();
  bool get hasResource() => false;
  AbstractPort([this._seaCell, this._edgeDirection]) {
    if (_seaCell != null)
      _landCell = _seaCell.cells[edgeDirection];
  }
  int divide(ResourceList resources, String resourceType) {
    return (resources.ofType(resourceType).length / inAmount).toInt();
  }
  bool canTrade(Resource resource) {
    return false;
  }
  int hashCode() {
    if (id== null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  test() {
    PortTest.test();
  }
}
class FourToOnePort extends AbstractPort {
  FourToOnePort([Cell seaCell, int edgeDirection]) : super(seaCell, edgeDirection);
  int get inAmount() => 4;
  int get outAmount() => 1;
  String get color() => "darkgrey";
}
class ThreeToOnePort extends AbstractPort {
  ThreeToOnePort([Cell seaCell, int edgeDirection]): super(seaCell, edgeDirection);
  int get inAmount() => 3;
  int get outAmount() => 1;
  String get color() => "lightGrey";
}