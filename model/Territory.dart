part of Dartan;

/** Group of tiles, e.g. an island, or main island */
abstract class Territory
 implements Copyable, Identifyable, Hashable, Testable, Jsonable {

  String name;
}
class SupportedTerritories extends ImmutableL<Territory> {
  SupportedTerritories() : super([
    new AbstractTerritory(), new MainIsland(), new Island()
  ]);
}
/** Abstract convenience implementation of a territory */
class AbstractTerritory implements Territory {
  String name;
  int id;

  AbstractTerritory([int id]);
  AbstractTerritory.fromData(JsonObject data) { _initByData(data); }
  _initByData(JsonObject json) {
    var data = json;
    id = data.id;
    name= data.name;
  }

  Territory copy([JsonObject data]) =>
      data==null ? new AbstractTerritory() : new AbstractTerritory.fromData(data);

  bool operator ==(other) => other.id==id && other.name == name;
  int get hashCode {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.name=name;
    data.type = Dartan.name(this);
    return data;
  }
  test() {

  }
}
abstract class TerritoryData extends JsonObject {
  int id;
  String type;
  String name;
}
/** Usually the island with 3+4+5+4+3 = 19 tiles */
class MainIsland extends AbstractTerritory {
  MainIsland.fromData(JsonObject json) : super.fromData(json);
  MainIsland([int id]) : super(id);
  Territory copy([JsonObject data]) =>
      data == null ? new MainIsland() : new MainIsland.fromData(data);
}
/** Usually a group of tiles surrounded by sea tiles */
class Island extends AbstractTerritory {
  Island.fromData(JsonObject json) : super.fromData(json);
  Island([int id]) : super(id);
  Territory copy([JsonObject data]) =>
      data == null ? new Island() : new Island.fromData(data);
}
