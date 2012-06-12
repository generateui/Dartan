/** global unique id
To ensure the server and client are talkin' about the same thing, each supported
interface extends [Identifyable]. Implementors should assume the thing is first
instantiated serverside (which may be on the client for local games), and assigned a fresh
GUID.
*/
interface Identifyable {
  int get id();
  set id(int id); // Throw IdAlreadySetException?
}
interface IdProvider {
  identify(Identifyable withId);
}
/** Gives target Identifyable instance an id */
class IdProviderImpl implements IdProvider {
  int current = 0;
  bool increment = false;
  bool isRandom = false;
  Random random;

  IdProviderImpl.increment() {
    increment = true;
  }
  IdProviderImpl.random(Random r) {
    isRandom = true;
    random = r;
  }
  identify(Identifyable withId) {
    if (withId != null) {
      if (increment) {
        withId.id = current++;
      } else if (isRandom) {
        withId.id = (Math.random()* 10000000).toInt();
      } else if(false) { // ?
        // ??
      }
    }
  }
}
/** Returns Identifyable with hiven Id from target list, null if not found,
null if list is null */
Identifyable byId(int theid, Collection<Identifyable> withIds) {
  Collection<Identifyable> filtered = withIds.filter
      ((Identifyable withId) => withId.id == theid);
  if (filtered.iterator().hasNext()) {
    return filtered.iterator().next();
  } else {
    return null;
  }
}
/** True if target List<Identifyable> contains item with given id */
bool hasId(int id, Collection<Identifyable> withIds) {
  if (id != null) {
    return byId(id, withIds) != null;
  }
  return false;
}