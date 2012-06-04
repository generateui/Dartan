interface Resource extends Hashable, Identifyable, Testable, Copyable, Jsonable
default Oracle {
  bool get isTradeable();
  set id(int id);
  String get color();
  Resource.type(String type);
  Resource.data(JsonObject data);
}

class SupportedResources extends ImmutableL<Resource> {
  SupportedResources() : super([new AbstractResource(), new Wheat(), new Timber(), new Clay(), new Ore(), new Sheep()]);
}
class AbstractResource implements Resource {
  int _id;
  String get color() => "black";
  bool get isTradeable() => false;
  int get id() => _id;
  int hashCode() {
    if (_id == null)
      _id = Dartan.generateHashCode(this);
    return _id;
  }

  AbstractResource([this._id]);
  int test() { return 0; }
  AbstractResource copy([JsonObject data]) => new AbstractResource();
  _setFromData(JsonObject json) {
    ResourceData data = json;
    id = data.id;
  }
  JsonObject get data() {
    ResourceData d = new JsonObject();
    d.id = id;
    d.type = Dartan.name(this);
    return d;
  }
}
interface ResourceData extends JsonObject {
  int id;
  String type;
}
class Timber extends AbstractResource {
  String get color() => "green";
  bool get isTradeable() => true;
  Timber([int id]): super(id);
  Timber copy([JsonObject data]) => new Timber();
}
class Wheat extends AbstractResource {
  String get color() => "gold";
  bool get isTradeable() => true;
  Wheat([int id]): super(id);
  Wheat copy([JsonObject data]) => new Wheat();
}
class Ore extends AbstractResource {
  String get color() => "purple";
  bool get isTradeable() => true;
  Ore([int id]): super(id);
  Ore copy([JsonObject data]) => new Ore();
}
class Sheep extends AbstractResource {
  String get color() => "lightgreen";
  bool get isTradeable() => true;
  Sheep([int id]): super(id);
  Sheep copy([JsonObject data]) => new Sheep();
}
class Clay extends AbstractResource {
  String get color() => "Red";
  bool get isTradeable() => true;
  Clay([int id]): super(id);
  Clay copy([JsonObject data]) => new Clay();
}
