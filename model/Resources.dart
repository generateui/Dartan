part of Dartan;

abstract class ResourceList implements Collection<Resource>, Testable {
  bool hasType(String type);
  ResourceList ofType(String type);
  Collection<String> types();
  String toSummary();
  num halfCount();
  bool hasAtLeast(ResourceList toHave);
}

class SupportedResourceLists extends ImmutableL<ResourceList> {
  SupportedResourceLists() : super([
    new ResourceListIm(),
    new ResourceListMu(),
    new TownCost(),
    new RoadCost(),
    new CityCost(),
    new DevelopmentCardCost() ]);
}

class DevelopmentCardCost extends ResourceListIm {
  String get description => "Total cost for a development card";
  DevelopmentCardCost() : super([new Wheat(), new Ore(), new Sheep()]);
}
class TownCost extends ResourceListIm {
  String get description => "Total cost for a town";
  TownCost() : super([new Wheat(), new Timber(), new Sheep(), new Clay()]);
}
class RoadCost extends ResourceListIm {
  String get description => "Total cost for a road";
  RoadCost() : super([new Timber(), new Clay()]);
}
class CityCost extends ResourceListIm {
  String get description => "Total cost for a city";
  CityCost() : super([new Ore(), new Ore(),new Ore(), new Wheat(), new Wheat()]);
}
class MonopolyableResources extends ResourceListIm {
  String get description => "Total cost for a town";
  MonopolyableResources() : super([new Wheat(), new Ore(), new Timber(), new Sheep(), new Clay()]);
}

/** Wraps mutable list */
class ResourceListIm implements ResourceList {
  ResourceListMu wrapped;

  ResourceListIm([List<Resource> other]) {
    if (other != null) {
      wrapped = new ResourceListMu.from(other);
    } else {
      wrapped = new ResourceListMu();
    }
  }

  // ResourceList
  int halfCount() { return wrapped.halfCount().toInt(); }
  bool hasType(String type) { return wrapped.hasType(type); }
  ResourceList ofType(String type) { return wrapped.ofType(type); }
  Collection<String> types() { return wrapped.types(); }
  String toSummary() { return wrapped.toSummary(); }
  bool hasAtLeast(ResourceList toHave) { return wrapped.hasAtLeast(toHave); }

  // Iterable<Resource>:
  Iterator<Resource> iterator() => wrapped.iterator();

  // Collection<Resource>:
  Resource reduce(initial, combine(previous, Resource r)) => wrapped.reduce(initial, combine);
  bool contains(Resource element) => wrapped.contains(element);
  Collection<Resource> filter(bool f(Resource element)) => wrapped.filter(f);
  Collection map(f(Resource element)) => wrapped.map(f);
  bool every(bool f(Resource element)) => wrapped.every(f);
  bool some(bool f(Resource element)) => wrapped.some(f);
  void forEach(void f(Resource element)) { wrapped.forEach(f); }
  bool get isEmpty => wrapped.isEmpty;
  int get length => wrapped.length;

  test() {
    new ResourceListImTest().test();
  }
}
/** Mutable variant of a collection of resources */
class ResourceListMu extends ListenableList<Resource> implements ResourceList {
  Map<String, List<Resource>> _res; // Administer by type

  initr() {
    _res = new Map<String, List<Resource>>();
    for (Resource r in _internal) {
      _add(r);
    }
  }

  ResourceListMu.from(Iterable<Resource> other) : super.from(other) {
    initr();
  }

  ResourceListMu() :
    super() { initr(); }

  num halfCount() {
    num temp = _internal.length;
    // Make number even
    if (temp % 2 != 0) {
      temp++;
    }
    return temp / 2;
  }

  String toSummary() {
    StringBuffer s = new StringBuffer();
    for (String t in types())
      if (hasType(t)) {
        s.add("${ofType(t).length} ${t}, ");
      }

    String tmp = s.toString();
    if (tmp.length > 0) {
      return tmp.substring(0, tmp.length-2);
    } else {
      return "Empty";
    }
  }

  void _remove(Resource toRemove) {
    String name = Dartan.name(toRemove);
    if (hasType(name)) {
      int ind = _res[name].indexOf(toRemove);
      _res[name].removeRange(ind, 1);
    }
  }
  bool remove(Resource r) {
    _remove(r);
    return super.remove(r);
  }

  void _add(Resource r) {
    String n = Dartan.name(r);
    ensureType(n);
    _res[n].add(r);
  }

  void add(Resource r) {
    _add(r);
    super.add(r);
  }
  void addAll(Collection<Resource> resources) {
    for (Resource r in resources) {
      _add(r);
    }
    super.addAll(resources);
  }
  void ensureType(String t) {
    if (_res[t] == null) {
      _res[t] = new List<Resource>();
    }
  }
  Collection<String> types() {
    return _res.keys;
  }

  /** True if this list has at least amount of resources contained in toHave, per Type */
  bool hasAtLeast(ResourceList toHave) {
    for (String t in toHave.types()) {
      if (hasType(t)) {
        if (ofType(t).length < toHave.ofType(t).length) {
          return false; // don't have enough of type t, bail
        }
      } else {
        return false; // don't have the type, bail
      }
    }
    return true;
  }
  bool hasType(String type) {
    ensureType(type);
    return !(_res[type] == null || _res[type].length == 0);
  }
  ResourceList ofType(String type) {
    ensureType(type);
    return new ResourceListIm(_res[type]);
  }

  test() {
    new ResourceListMuTest().test();
  }
}
