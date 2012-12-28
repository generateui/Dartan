part of Dartan;

/** Allow classes to be (de)serialized from/to json */
class Jsonable
  extends Copyable
  {

  JsonObject get data => null;
  
  dynamic copy([JsonObject data]) => null;
  
  static Map<String, Copyable> instancesByType;
  /** Ensures all instances are mapped to its interface and concrete name */
  static ensureMap() {
    if (instancesByType == null) {
      instancesByType = new HashMap<String, Copyable>();

      // Fill the maps
      for (Iterable<Testable> instances in new AllSupportedLists()) {
        for (Testable t in instances) {
          if (t is Copyable) {
            Copyable c = t;
            String concretename = Dartan.name(c);
            if (instancesByType.containsKey(concretename)) {
              print("Naming collision: ${concretename}");
            }
            instancesByType[concretename] = c;
          } else {
            print("Not copyable: ${Dartan.name(t)}");
          }
        }
      }
    }
  }
  // TODO: add null checks
  /*

  Jsonable -> data
  List<Jsonable> -> data


  */

  /** From a concrete type string */
  factory Jsonable.fromType(String type) {
    ensureMap();
    if (instancesByType.containsKey(type)) {
      Jsonable instance = instancesByType[type] as Jsonable;
      return instance;
    } else {
      String msg = "Oracle: Type ${type} not found";
      print (msg);
      throw new Exception(msg);
    }
  }
  /** From a JsonObject containing a type attribute with the concrete class name */
  factory Jsonable.fromData(JsonObject data) {
    Jsonable fromType = new Jsonable.fromType(data["type"]);
    return fromType.copy(data);
  }
  factory Jsonable.fromString(String jsonString) {
    Jsonable referenced;
    try {
      JsonObject parsed = new JsonObject.fromJsonString(jsonString);
      referenced = new Jsonable.fromData(parsed);
    } on Exception catch (ex) {
      print("fail: create Jsonable from ${jsonString}");
    }
    return referenced;
  }


  
  
  
  
  
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
abstract class DefaultJsonableData extends JsonObject {
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
  DefaultJsonable.fromData(JsonObject json) {
    var data = json;
    id = data.id;
  }
  DefaultJsonable copy([JsonObject data]) => data == null ?
      new DefaultJsonable() : new DefaultJsonable.fromData(data);
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }

  bool operator ==(other) => id == other.id;
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