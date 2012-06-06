expectJsonifiesType(JsonObject json) {
  Expect.isTrue(json["type"] != null);
}
Jsonable copyJsonable(Jsonable toCopy) {
  JsonObject data = toCopy.data;
  expectJsonifiesType(data);

  String jsonString = JSON.stringify(data);
  JsonObject jsonNew = new JsonObject.fromJsonString(jsonString);

  Jsonable newJsonable = new Jsonable.data(jsonNew);
  return newJsonable;
}
expectEqualCopy(Jsonable thing) {
  Jsonable thingCopy = copyJsonable(thing);
  String concreteName = Dartan.name(thing);
  Expect.isTrue(thing.equals(thingCopy), "Copying a ${concreteName} failed");
}
class JsonableTest {
  test() {
    print("******* TESTING ALL IMPORTANT OBJECTS ********");
    for (Iterable<Testable> testables in new AllSupportedLists()) {
      for (Testable t in testables) {
        Jsonable j = t;
        String concreteName = Dartan.name(t);
        print ("testing ${concreteName}");
        if (t is! Collection) {
          if (t is! Hashable) {
            print("**** ${concreteName} is not Hashable");
          }
          if (t is! Copyable) {
            print("**** ${concreteName} is not Copyable");
          }
          if (t is! Identifyable) {
            print("**** ${concreteName} is not Identifyable");
          }
          if (t is! Jsonable) {
            print("**** ${concreteName} is not Jsonable");
          } else {
            try {
//              t.equals(null);
            } catch(Exception ex) {
              NoSuchMethodException nsmex = ex;
              print (nsmex._functionName);
              if (ex is NoSuchMethodException && nsmex._functionName == "equals") {
                Expect.fail("${concreteName} does not have an equals() method");
              }
            }
            expectEqualCopy(j);
          }
        }
      }
    }
    print("******* END TEST ********");
  }
}
