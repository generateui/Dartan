/** Group of tiles, e.g. an island, or main island */
interface Territory extends Copyable, Identifyable, Hashable, Testable {
  String name;
}
class SupportedTerritories extends ImmutableL<Territory> {
  SupportedTerritories() : super([new AbstractTerritory(), new MainIsland(), new Island()]);
}
/** Abstract convenience implementation of a territory */
class AbstractTerritory implements Territory {
  String name;
  int id;
  AbstractTerritory([int id]);
  Territory copy() => new AbstractTerritory();
  int hashCode() {  
    if (id == null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  test() {
    
  }
}
/** Usually the island with 3+4+5+4+3 = 19 tiles */
class MainIsland extends AbstractTerritory {
  MainIsland([int id]) : super(id);
  Territory copy() => new MainIsland();
}
/** Usually a group of tiles surrounded by sea tiles */
class Island extends AbstractTerritory {
  Island([int id]) : super(id);
  Territory copy() => new Island();
}
