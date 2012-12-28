part of Dartan;

/** Mirror kitteh sees wall - No mirrors detected.
Each object requires:
- Object.data(JsonObject json) constructor
- copy instance method defaulting on Object() or Object.data(json) e.g.
  ObjectName copy([JsonObject data]) => data == null ?
    new ObjectName() : new ObjectName.data(data);

*/
abstract class Copyable {
  dynamic copy([JsonObject data]);
}
/** Returns [amount] copies of target copyable */
List copiesOf(Copyable c, int amount) {
  var l = new List();
  for (int i=0; i<amount; i++) {
    l.add(c.copy());
  }
  return l;
}