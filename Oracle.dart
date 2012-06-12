/** Get instances from concrete class name strings or JsonObject instances.
    Assumptions:
      -Unique names for all concrete classes
      -classes implement "copy([JsonObject])"
      -
 */
class Oracle {
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
  factory Jsonable.type(String type) {
    ensureMap();
    if (instancesByType.containsKey(type)) {
      return instancesByType[type];
    } else {
      String msg = "Oracle: Type ${type} not found";
      print (msg);
      throw new Exception(msg);
    }
  }
  /** From a JsonObject containing a type attribute with the concrete class name */
  factory Jsonable.data(JsonObject data) {
    Jsonable fromType = new Jsonable.type(data["type"]);
    return fromType.copy(data);
  }
  factory Jsonable.string(String jsonString) {
    Jsonable referenced;
    try {
      JsonObject parsed = new JsonObject.fromJsonString(jsonString);
      referenced = new Jsonable.data(parsed);
    } catch (Exception ex) {
      print("fail: create Jsonable from ${jsonString}");
    }
    return referenced;
  }

  // TODO: cleanup
  //static newChitByType(String type) => instanceOf(type);
  /** Creates new list with data objects from a list of jsonables */
  static List<JsonObject> toDataList(Iterable<Jsonable> jsonables) {
    List<JsonObject> result = new List<JsonObject>();
    if (jsonables != null) {
      for (Jsonable json in jsonables) {
        result.add(json.data);
      }
    }
    return result;
  }
  /** Creates a list of models from a list of data instances */
  static List<Copyable> fromDataList(List<JsonObject> dataList) {
    List<Copyable> instantiated = new List();
    for (JsonObject json in dataList) {
      instantiated.add(new Jsonable.data(json));
    }
    return instantiated;
  }
}


/** Null if JsonObject is null, otherwise its data instance */
Jsonable fromData(JsonObject json) {
  if (json == null) {
    return null;
  } else {
    return new Jsonable.data(json);
  }
}
/** returns a listenable list from a list of json objects */
ListenableList<Jsonable> llFrom(Iterable<JsonObject> jsonables) {
  if (jsonables == null) {
    return new ListenableList();
  } else {
    return new ListenableList.from(listFrom(jsonables));
  }
}
/** Returns a list from a list of json objects */
List<Jsonable> listFrom(List<JsonObject> jsonObjects) {
  if (jsonObjects == null) {
    return new List();
  } else {
    List l = new List();
    for (JsonObject json in jsonObjects) {
      Jsonable newJsonable = new Jsonable.data(json);
      l.add(newJsonable);
    }
    return l;
  }
}
/** List ofJsonObject from a list of Jsonables */
List<JsonObject> nullOrDataListFrom(Iterable<Jsonable> jsonables) {
  if (jsonables == null) {
    return null;
  }
  return Oracle.toDataList(jsonables);
}
/** JsonObject or null from target Jsonable */
JsonObject nullOrDataFrom(Jsonable json) {
  if (json == null) {
    return null;
  }
  return json.data;
}
/** True if target list is null OR empty */
bool isNullOrEmpty(List l) => l == null || l.isEmpty();

