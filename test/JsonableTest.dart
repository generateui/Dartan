part of Dartan;

expectJsonifiesType(JsonObject json) {
  Expect.isTrue(json["type"] != null);
}
Jsonable copyJsonable(Jsonable toCopy) {
  JsonObject data = toCopy.data;
  expectJsonifiesType(data);

  String jsonString = JSON.stringify(data);
  JsonObject jsonNew = new JsonObject.fromJsonString(jsonString);

  Jsonable newJsonable = new Jsonable.fromData(jsonNew);
  return newJsonable;
}
expectEqualCopy(Jsonable thing) {
  Jsonable thingCopy;
  try {
    thingCopy = copyJsonable(thing);
  } on Exception catch (ex) {
    Expect.fail("Failed copying a ${Dartan.name(thing)} because ${ex.toString()}");
  }

  String concreteName = Dartan.name(thing);
  Expect.isTrue(thingCopy != null, "Expected copied instance of ${concreteName}");
  Expect.isTrue(thing == thingCopy, "Copying a ${concreteName} failed");
}
class JsonableTest {
  test() {
    print("******* TESTING ALL IMPORTANT OBJECTS ********");
    for (Iterable<Testable> testables in new AllSupportedLists()) {
      for (Testable t in testables) {
        var j = t; // TODO: unsure about m2 cast here
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
            } on Exception catch(ex) {
              // TODO: convert to m2
//              NoSuchMethodError nsmex = ex;
//              print (nsmex._functionName);
//              if (ex is NoSuchMethodException && nsmex._functionName == "equals") {
//                Expect.fail("${concreteName} does not have an equals() method");
//              }
            }
            expectEqualCopy(j);
          }
        }
      }
    }
    print("******* END TEST ********");
  }
}
