interface Tile extends Copyable, Observable, Hashable, Testable  {
  String get color();
  Cell get cell();
  set cell(Cell c);

  bool get canBuildOnLand();
  bool get canBuildOnSea();
  bool get isPartOfGame();
  bool get isRobberPlaceable();
  bool get isPiratePlaceable();
  Tile copy();
  bool get producesResource();
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

/** Abstract convenience implementation of a [Tile] */
class AbstractTile implements Tile {
  ObservableHelper observable;
  int id;
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

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => false;
  bool get isRobberPlaceable() => false;
  bool get isPiratePlaceable() => false;
  Tile copy() => new AbstractTile(cell);
  bool get producesResource() => false;
  Resource resource() => null;
  String get color() => "black";

  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  test() {

  }
}
class RandomTile extends AbstractTile {
  String get color() => "DarkGrey";
  RandomTile([Cell loc]) : super(loc);
  Tile copy() => new RandomTile(cell);
  bool get canHaveChit() => true;
}
class Sea extends AbstractTile {
  Sea([Cell loc]) : super(loc);


  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => false;
  bool get isPiratePlaceable() => true;
  Tile copy() => new Sea(cell);
  bool get producesResource() => false;
  Resource resource() => null;
  bool get canHaveChit() => false;
  bool get canHavePort() => true;
  String get color() => "blue";
}
class Desert extends AbstractTile {
  Desert([Cell loc]) : super(loc);

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => false;
  bool get canHaveChit() => false;
  bool get canHavePort() => false;
  String get color() => "lightyellow";
  Tile copy() => new Desert(cell);
  Resource resource() => null;
}
/** Design-time placeholder for an empty [Tile] slot */
class NoneTile extends AbstractTile {
  NoneTile([Cell loc]) : super(loc);

  bool get canBuildOnLand() => false;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => false;
  bool get isRobberPlaceable() => false;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => false;
  bool get canHaveChit() => false;
  bool get canHavePort() => false;
  String get color() => "lightgrey";
  Tile copy() => new NoneTile(cell);
  Resource resource() => null;
}
class Field extends AbstractTile {
  Field([Cell loc]) : super(loc);

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "yellow";
  Tile copy() => new Field(cell);
  Resource resource() => new Wheat();
}
class Forest extends AbstractTile {
  Forest([Cell loc]) : super(loc);

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "darkgreen";
  Tile copy() => new Forest(cell);
  Resource resource() => new Timber();
}
class Mountain extends AbstractTile {
  Mountain([Cell loc]) : super(loc);

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "purple";
  Tile copy() => new Mountain(cell);
  Resource resource() => new Ore();
}
class Pasture extends AbstractTile {
  Pasture([Cell loc]) : super(loc);

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "lightgreen";
  Tile copy() => new Pasture(cell);
  Resource resource() => new Sheep();
}
class Hill extends AbstractTile {
  Hill([Cell loc]) : super(loc);

  bool get canBuildOnLand() => true;
  bool get canBuildOnSea() => false;
  bool get isPartOfGame() => true;
  bool get isRobberPlaceable() => true;
  bool get isPiratePlaceable() => false;
  bool get producesResource() => true;
  bool get canHaveChit() => true;
  bool get canHavePort() => false;
  String get color() => "red";
  Tile copy() => new Hill(cell);
  Resource resource() => new Clay();
}