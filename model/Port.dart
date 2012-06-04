interface Port
  extends Hashable, Copyable, Identifyable, Testable, Jsonable
  default Oracle {

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
  setCellAndDirection(Cell seaCell, int direction);
  Port.type(String type);
  Port.data(JsonObject json);
}
interface PortData extends JsonObject {
  int id;
  String type;
  ResourceData resource;
  CellData seaCell;
  int direction;
  bool isRandom;
}
class SupportedPorts extends ImmutableL<Port> {
  SupportedPorts() : super([
    new AbstractPort(),
    new FourToOnePort(),
    new ThreeToOnePort()]);
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
  Port copy([JsonObject data]) => new AbstractPort();
  bool get hasResource() => false;
  bool get isRandom() => false;
  AbstractPort([this._seaCell, this._edgeDirection]) {
    if (_seaCell != null) {
      setCellAndDirection(_seaCell, _edgeDirection);
    }
  }
  _setFromData(JsonObject json) {
    PortData data = json;
    id = data.id;
    _seaCell = new Cell.data(data.seaCell);
    _edgeDirection = data.direction;
    List<Vertice> vs = _seaCell.fromDirection(_edgeDirection);
    _edge = new Edge.fromVertices(vs[0], vs[1]);
  }
  setCellAndDirection(Cell seaCell, int direction) {
    if (seaCell== null) {
      print ("whoops");
    }
    _seaCell=seaCell;
    _landCell = _seaCell.cells[direction];
    _edge = new Edge(seaCell, landCell);
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
  JsonObject get data() {
    PortData data = new JsonObject();
    data.isRandom = isRandom;
    data.direction = _edgeDirection;
    data.seaCell = seaCell.data;
    data.id = id;
    data.resource = resource.data;
    data.type = Dartan.name(this);
    return data;
  }
  test() {
    PortTest.test();
  }
}
class FourToOnePort extends AbstractPort {
  FourToOnePort.data(JsonObject json) { _setFromData(json); }
  FourToOnePort([Cell seaCell, int edgeDirection]) : super(seaCell, edgeDirection);
  int get inAmount() => 4;
  int get outAmount() => 1;
  String get color() => "darkgrey";
  FourToOnePort copy([JsonObject data]) => data == null ?
      new FourToOnePort() : new FourToOnePort.data(data);
}
class ThreeToOnePort extends AbstractPort {
  ThreeToOnePort([Cell seaCell, int edgeDirection]): super(seaCell, edgeDirection);
  ThreeToOnePort.data(JsonObject json) { _setFromData(json); }
  int get inAmount() => 3;
  int get outAmount() => 1;
  String get color() => "blue";
  ThreeToOnePort copy([JsonObject data]) => data == null ?
      new ThreeToOnePort() : new ThreeToOnePort.data(data);
}
class TwoToOnePort extends AbstractPort {
  Resource resource;
  TwoToOnePort.data(JsonObject json) {
    PortData data = json;
    _setFromData(json);
    resource = new Resource.data(data.resource);
  }
  TwoToOnePort(this.resource, [Cell seaCell, int edgeDirection]): super(seaCell, edgeDirection);
  int get inAmount() => 2;
  int get outAmount() => 1;
  String get color() => resource.color;
  TwoToOnePort copy([JsonObject data]) => data == null ?
      new TwoToOnePort(resource) : new TwoToOnePort.data(data);
}
class RandomPort extends AbstractPort {
  RandomPort.data(JsonObject json) { _setFromData(json); }
  RandomPort([Cell seaCell, int edgeDirection]): super(seaCell, edgeDirection);
  String get color() => "black";
  bool get isRandom() => true;
  RandomPort copy([JsonObject data]) => data == null ?
      new RandomPort() : new RandomPort.data(data);
}

