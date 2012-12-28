part of Dartan;

/** Any hand card resource a hexagon tile may produce during
DiceRoll GamePhase */
abstract class Resource implements Hashable, Identifyable, Testable, Copyable, Jsonable {
  bool get isTradeable;
  set id(int id);
  String get color;
}
abstract class ResourceData extends JsonObject {
  int id;
  String type;
}
class SupportedResources extends ImmutableL<Resource> {
  SupportedResources() : super([
    new AbstractResource(),
    new Wheat(),
    new Timber(),
    new Clay(),
    new Ore(),
    new Sheep()
  ]);
}
class AbstractResource implements Resource {
  int id;
  String get color => "black";
  bool get isTradeable => false;

  int get hashCode {
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }

  AbstractResource.fromData(JsonObject json) {
    //ResourceData data = json as ResourceData;
    id = json.id;
  }
  AbstractResource([this.id]);
  AbstractResource copy([JsonObject data]) => new AbstractResource();
  _setFromData(JsonObject json) {
    var data = json;
    id = data.id;
  }
  // Jsonable
  JsonObject get data {
    var d = new JsonObject();
    d.id = id;
    d.type = Dartan.name(this);
    return d;
  }
  bool operator ==(other) => id == other.id;
  test() { }
}
class Timber extends AbstractResource {
  String get color => "green";
  bool get isTradeable => true;

  Timber([int id]): super(id);
  Timber.fromData(JsonObject data) : super.fromData(data);
  Timber copy([JsonObject data]) => data ==null ? new Timber() : new Timber.fromData(data);
}
class Wheat extends AbstractResource {
  String get color => "gold";
  bool get isTradeable => true;

  Wheat([int id]): super(id);
  Wheat.fromData(JsonObject data) : super.fromData(data);
  Wheat copy([JsonObject data]) => data ==null ? new Wheat() : new Wheat.fromData(data);
}
class Ore extends AbstractResource {
  String get color => "purple";
  bool get isTradeable => true;
  Ore([int id]): super(id);
  Ore.fromData(JsonObject data) : super.fromData(data);
  Ore copy([JsonObject data]) => data ==null ? new Ore() : new Ore.fromData(data);
}
class Sheep extends AbstractResource {
  String get color => "lightgreen";
  bool get isTradeable => true;
  Sheep([int id]): super(id);
  Sheep.fromData(JsonObject data) : super.fromData(data);
  Sheep copy([JsonObject data]) => data ==null ? new Sheep() : new Sheep.fromData(data);
}
class Clay extends AbstractResource {
  String get color => "Red";
  bool get isTradeable => true;
  Clay([int id]): super(id);
  Clay.fromData(JsonObject data) : super.fromData(data);
  Clay copy([JsonObject data]) => data ==null ? new Clay() : new Clay.fromData(data);
}
