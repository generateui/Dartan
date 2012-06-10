interface Tile
  extends Copyable, Observable, Hashable, Testable, Jsonable, Identifyable
  default Oracle {

  int territoryId;
  String get color();
  Cell get cell();
  set cell(Cell c); // this should be one-time mutable

  bool get canBuildOnLand(); // town, road
  bool get canBuildOnSea();  // ship, bridge
  bool get isPartOfGame();   // NoneTile
  bool get isRobberPlaceable();
  bool get isPiratePlaceable();
  bool get producesResource();
  bool get isRandom(); // Instance acts as a placeholder for random other tile?
  Resource resource();

  bool get canHaveTerritory();
  bool get hasTerritory();
  Territory get territory();
  set /* on */ territory(Territory t);

  bool get canHaveChit();
  bool get hasChit();
  Chit get chit();
  set /* on */ chit(Chit c);

  bool get canHavePort();
  bool get hasPort();
  Port get port();
  set /* on */ port(Port p);
}

class SupportedTiles extends ImmutableL<Tile> {
  SupportedTiles() : super([new AbstractTile(), new Sea(), new Desert(),
    new NoneTile(), new Field(), new Mountain(), new Forest(), new Hill(), new Pasture()]);
}
interface TileData extends JsonObject {
  int id;
  String type;
  CellData cell;
  PortData port;
  ChitData chit;
  int territoryId;
}
/** Abstract convenience implementation of a [Tile] */
class AbstractTile implements Tile {
  ObservableHelper observable;
  int id;
  int territoryId;
  Cell _cell;
  Port _port;
  Chit _chit;
  Territory _territory;
  Cell get cell() => _cell;
  set cell(Cell c) {
    _cell=c;
  }
  // Territory
  bool get canHaveTerritory() => true;
  bool get hasTerritory()=> _territory != null;
  Territory get territory() => _territory;
  set /* on */ territory(Territory t) {
    if(canHaveTerritory) {
      Territory old = _territory;
      _territory=t;
      observable.fire("territory", old, _territory);
    }
  }

  // Chit
  bool get canHaveChit() => false;
  bool get hasChit() => _chit != null;
  Chit get chit() => _chit;
  set /* on */ chit(Chit c) {
    if (canHaveChit) {
      Chit old = _chit;
      _chit=c;
      observable.fire("chit", old, _chit);
    }
  }

  // Port
  bool get canHavePort() => false;
  bool get hasPort() => _port != null;
  Port get port() => _port;
  set /* on */ port(Port p) {
    if (canHavePort) {
      Port old = _port;
      _port=p;
      observable.fire("port", old, _port);
    }
  }

  AbstractTile([this._cell]) {
    observable = new ObservableHelper();
  }

  _initByData(JsonObject json) {
    TileData data = json;
    id = data.id;
    cell = data.cell == null ? null : new Jsonable.data(data.cell);
    port = data.port == null ? null : new Jsonable.data(data.port);
    chit = data.chit == null ? null : new Jsonable.data(data.chit);
    territoryId = data.territoryId;
  }

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isRandom() => false;
  bool get isPartOfGame() => false;
  bool get isRobberPlaceable() => false;
  bool get isPiratePlaceable() => false;
  Tile copy([JsonObject data]) => new AbstractTile(cell);
  bool get producesResource() => false;
  Resource resource() => null;
  String get color() => "black";
  bool equals(other) => other.id == id;

  JsonObject get data() {
    TileData data = new JsonObject();
    data.id=id;
    data.type = Dartan.name(this);
    data.cell = nullOrDataFrom(cell);
    data.chit = nullOrDataFrom(chit);
    data.port = nullOrDataFrom(port);
    data.territoryId = territory == null ? null : territory.id;
    return data;
  }

  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  // Observable
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
class RandomTile extends AbstractTile {
  String get color() => "DarkGrey";
  RandomTile([Cell loc]) : super(loc);
  RandomTile.data(JsonObject json) { _initByData(json); }
  Tile copy([JsonObject data]) => new RandomTile(cell);
  bool get canHaveChit() => true;
  bool get isRandom() => true;
}
class Sea extends AbstractTile {
  Sea([Cell loc]) : super(loc);
  Sea.data(JsonObject json) { _initByData(json); }

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => false;
  bool get isPiratePlaceable() => true;
  bool get producesResource() => false;
  Resource resource() => null;
  bool get canHaveChit() => false;
  bool get canHavePort() => true;
  Tile copy([JsonObject data]) => data == null ? new Sea(cell) : new Sea.data(data);
  String get color() => "blue";
}
class Desert extends AbstractTile {
  Desert([Cell loc]) : super(loc);
  Desert.data(JsonObject json) { _initByData(json); }

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => false;
  bool get canHaveChit() => false;
  bool get canHavePort() => false;
  String get color() => "lightyellow";
  Tile copy([JsonObject data]) => data == null ? new Desert(cell) : new Desert.data(data);
  Resource resource() => null;
}
/** Design-time placeholder for an empty [Tile] slot */
class NoneTile extends AbstractTile {
  NoneTile([Cell loc]) : super(loc);
  NoneTile.data(JsonObject data) { _initByData(data); }

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => false;
  bool get isRobberPlaceable() => false;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => false;
  bool get canHaveChit() => false;
  bool get canHavePort() => false;
  String get color() => "lightgrey";
  Tile copy([JsonObject data]) => data== null ? new NoneTile(cell) : new NoneTile.data(data);
  Resource resource() => null;
}
class Field extends AbstractTile {
  Field([Cell loc]) : super(loc);
  Field.data(JsonObject data) { _initByData(data); }

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "yellow";
  Tile copy([JsonObject data]) => data== null ? new Field(cell) : new Field.data(data);
  Resource resource() => new Wheat();
}
class Forest extends AbstractTile {
  Forest([Cell loc]) : super(loc);
  Forest.data(JsonObject data) { _initByData(data); }

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "darkgreen";
  Tile copy([JsonObject data]) => data== null ? new Forest(cell) : new Forest.data(data);
  Resource resource() => new Timber();
}
class Mountain extends AbstractTile {
  Mountain([Cell loc]) : super(loc);
  Mountain.data(JsonObject data) { _initByData(data); }

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "purple";
  Tile copy([JsonObject data]) => data== null ? new Mountain(cell) : new Mountain.data(data);
  Resource resource() => new Ore();
}
class Pasture extends AbstractTile {
  Pasture([Cell loc]) : super(loc);
  Pasture.data(JsonObject data) { _initByData(data); }

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "lightgreen";
  Tile copy([JsonObject data]) => data== null ? new Pasture(cell) : new Pasture.data(data);
  Resource resource() => new Sheep();
}
class Hill extends AbstractTile {
  Hill([Cell loc]) : super(loc);
  Hill.data(JsonObject data) { _initByData(data); }

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "red";
  Tile copy([JsonObject data]) => data== null ? new Hill(cell) : new Hill.data(data);
  Resource resource() => new Clay();
}
