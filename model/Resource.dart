/** Any hand card resource a hexagon tile may produce during
DiceRoll GamePhase */
interface Resource extends Hashable, Identifyable, Testable, Copyable, Jsonable {
  bool get isTradeable();
  set id(int id);
  String get color();
  bool equals(other);
}
interface ResourceData extends JsonObject {
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
  String get color() => "black";
  bool get isTradeable() => false;

  int hashCode() {
    if (id == null)
      id = Dartan.generateHashCode(this);
    return id;
  }

  AbstractResource.data(JsonObject json) {
    ResourceData data = json;
    id = data.id;
  }
  AbstractResource([this.id]);
  AbstractResource copy([JsonObject data]) => new AbstractResource();
  _setFromData(JsonObject json) {
    ResourceData data = json;
    id = data.id;
  }
  // Jsonable
  JsonObject get data() {
    ResourceData d = new JsonObject();
    d.id = id;
    d.type = Dartan.name(this);
    return d;
  }
  bool equals(other) => id == other.id;
  test() { }
}
class Timber extends AbstractResource {
  String get color() => "green";
  bool get isTradeable() => true;

  Timber([int id]): super(id);
  Timber.data(JsonObject data) : super.data(data);
  Timber copy([JsonObject data]) => data ==null ? new Timber() : new Timber.data(data);
}
class Wheat extends AbstractResource {
  String get color() => "gold";
  bool get isTradeable() => true;

  Wheat([int id]): super(id);
  Wheat.data(JsonObject data) : super.data(data);
  Wheat copy([JsonObject data]) => data ==null ? new Wheat() : new Wheat.data(data);
}
class Ore extends AbstractResource {
  String get color() => "purple";
  bool get isTradeable() => true;
  Ore([int id]): super(id);
  Ore.data(JsonObject data) : super.data(data);
  Ore copy([JsonObject data]) => data ==null ? new Ore() : new Ore.data(data);
}
class Sheep extends AbstractResource {
  String get color() => "lightgreen";
  bool get isTradeable() => true;
  Sheep([int id]): super(id);
  Sheep.data(JsonObject data) : super.data(data);
  Sheep copy([JsonObject data]) => data ==null ? new Sheep() : new Sheep.data(data);
}
class Clay extends AbstractResource {
  String get color() => "Red";
  bool get isTradeable() => true;
  Clay([int id]): super(id);
  Clay.data(JsonObject data) : super.data(data);
  Clay copy([JsonObject data]) => data ==null ? new Clay() : new Clay.data(data);
}
