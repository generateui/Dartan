/** Allow classes to be (de)serialized from/to json */
interface Jsonable
  extends Copyable
  default Oracle {

  JsonObject get data();

  Jsonable.data(JsonObject json);
  Jsonable.type(String type);
  Jsonable.string(String jsonString);
}
/** True if both Jsonables have equal data instance counterparts */
bool valueEquals(Jsonable first, Jsonable second) {
  if (first != null && second != null) {
    return first.data.equals(second.data);
  }
  if (first == null && second == null) {
    return false;
  }
}
interface DefaultJsonableData extends JsonObject {
  String type;
  int id;
}
/** Provides a default example implementation for all interfaces.
Not to be used for any purpose other then copy/pasting code and testing
Jsonable interface test code.  */
class DefaultJsonable
  implements
  Copyable,
  Testable,
  Identifyable,
  Hashable,
  Jsonable {

  int id = null;

  DefaultJsonable();
  DefaultJsonable.data(JsonObject json) {
    DefaultJsonableData data = json;
    id = data.id;
  }
  DefaultJsonable copy([JsonObject data]) => data == null ?
      new DefaultJsonable() : new DefaultJsonable.data(data);
  JsonObject get data() {
    DefaultJsonableData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }

  bool equals(other) => id == other.id;
  test() {
    new JsonableTest().test();
  }
}
/** Extracts the concrete class name from toString() */
String nameOf(obj) {
  if (obj != null) {
    String temp = obj.toString().substring(13);
    return temp.substring(0,temp.length - 1);
  } else {
    return "null";
  }
}
String pluralNameOf(obj) {
  /* TODO: implement */
}