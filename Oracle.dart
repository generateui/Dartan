part of Dartan;

/** Get instances from concrete class name strings or JsonObject instances.
    Assumptions:
      -Unique names for all concrete classes
      -classes implement "copy([JsonObject])"
      -
 */
class Oracle {
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
      instantiated.add(new Jsonable.fromData(json));
    }
    return instantiated;
  }
}


/** Null if JsonObject is null, otherwise its data instance */
Jsonable fromData(JsonObject json) {
  if (json == null) {
    return null;
  } else {
    return new Jsonable.fromData(json);
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
      Jsonable newJsonable = new Jsonable.fromData(json);
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
bool isNullOrEmpty(List l) => l == null || l.isEmpty;

