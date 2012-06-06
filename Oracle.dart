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
  /** From a JsonObject containing a type attribute with the concrete class name */
  factory Jsonable.data(JsonObject data) {
    Jsonable fromType = new Jsonable.type(data["type"]);
    return fromType.copy(data);
  }
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

  // TODO: cleanup
//  static newChitByType(String type) => instanceOf(type);
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
  /** Creates a list of non-data instances from a list of data instances */
  static List<Copyable> fromDataList(List<JsonObject> dataList) {
    List<Copyable> instantiated = new List();
    for (JsonObject json in dataList) {
      instantiated.add(new Jsonable.data(json));
    }
    return instantiated;
  }
}