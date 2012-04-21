interface Resource extends Hashable, Identifyable, Testable, Copyable {
  bool get isTradeable();
  String get color();
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
  AbstractResource copy() => new AbstractResource();
}

class Timber extends AbstractResource {
  String get color() => "green";
  bool get isTradeable() => true;
  Timber([int id]): super(id);
  Timber copy() => new Timber();
}
class Wheat extends AbstractResource {
  String get color() => "gold";
  bool get isTradeable() => true;
  Wheat([int id]): super(id);
  Wheat copy() => new Wheat();
}
class Ore extends AbstractResource {
  String get color() => "purple";
  bool get isTradeable() => true;
  Ore([int id]): super(id);
  Ore copy() => new Ore();
}
class Sheep extends AbstractResource {
  String get color() => "lightgreen";
  bool get isTradeable() => true;
  Sheep([int id]): super(id);
  Sheep copy() => new Sheep();
}
class Clay extends AbstractResource {
  String get color() => "Red";
  bool get isTradeable() => true;
  Clay([int id]): super(id);
  Clay copy() => new Clay();
}
