/** A simple class would work here, but the approach to have a defined
implementation for a concept eventually creates an API */
interface Chit
  extends Hashable, Copyable, Testable, Identifyable, Jsonable
  default ChitImpl {

  set id(int id);
  int get number();
  int get chance();
  bool get isRed(); // True on the best numbers
  bool equals(other);
  Chit.number(int number); // 2,3,4,5,6, 8,9,10,11,12
  Chit.random();
}
class SupportedChits extends ImmutableL {
  SupportedChits() : super([new AbstractChit(),
    new Chit2(), new Chit3(), new Chit4(), new Chit5(), new Chit6(),
    new Chit8(), new Chit9(), new Chit10(), new Chit11(), new Chit12(),
    new RandomChit()
  ]);
}
/** Abstract convenience implementation of a [Chit] */
class AbstractChit implements Chit {
  int _id;
  int get number() => 0;
  int get chance() => 0;
  bool get isRed() => number == 6 || number == 8;
  int get id() => _id;
  set id(int id) {
    _id = id;
  }

  AbstractChit();
  AbstractChit.data(JsonObject json) {
    ChitData data = json;
    _id = data.id;
  }
  bool equals(other) => other.id==id;
  // Hashable
  int hashCode() {
    if (_id == null)
      _id = Dartan.generateHashCode(this);
    return _id;
  }
  // Jsonable
  JsonObject get data() {
    ChitData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Copyable
  Chit copy([JsonObject data]) => data == null ?
      new AbstractChit() : new AbstractChit.data(data);
  test() {
    Chit chit3 = new Chit3();
    chit3.id = 1;
    Chit jsonChit3 = new Jsonable.data(new JsonObject.fromMap({"id": 1, "type": "Chit3"}));
    Expect.isTrue(chit3.equals(jsonChit3), "Expected equals chit after serialization");
  }
}
interface ChitData extends JsonObject{
  int id;
  String type;
  int number;
  bool isRandom;
}
/** Default "all-supporting" chit class */
class ChitImpl extends AbstractChit {
  static List<int> numbers = const [2,3,4,5,6,8,9,10,11,12];
  static List<int> chances = const [1,2,3,4,5,5,4, 3, 2, 1];
  int _number = 0;
  int _chance = 0;
  bool _isRandom;
  int get chance() => _chance;
  bool get isRandom() => _isRandom;

  ChitImpl();
  ChitImpl.number(int n) {
    List isOk = numbers.filter((e) => e == n);
    if (isOk.isEmpty()) {
      throw new Exception("No chit exists with number ${n}");
    } else {
      int i = numbers.indexOf(n);
      _number = n;
      _setChance();
    }
  }
  ChitImpl.data(JsonObject json) {
    ChitData d = json;
    _number = d.number;
    _isRandom = d.isRandom;
    id = d.id;
  }
  ChitImpl.random() {
    _isRandom = true;
  }
  JsonObject get data() {
    ChitData data = super.data;
    data.isRandom = _isRandom;
    data.number = _number;
    _setChance();
    return data;
  }
  Chit copy([JsonObject data]) => data == null ?
      new ChitImpl() : new ChitImpl.data(data);

  _setChance() {
    int i = numbers.indexOf(_number);
    _chance = chances[i];
  }

}
/** Design-time placeholder for a chit to be randomly exchanged for another
at game initialization-time */
class RandomChit extends AbstractChit {
  Chit copy([JsonObject data]) => new RandomChit();
}
/** Madness. Maybe switch to ChitImpl instead of all these things? */
class Chit2 extends AbstractChit {
  Chit2();
  Chit2.data(JsonObject json) : super.data(json);
  int get number() => 2;
  int get chance() => 1;
  Chit copy([JsonObject data]) =>
      data==null ? new Chit2() : new Chit2.data(data);
}
class Chit3 extends AbstractChit {
  Chit3();
  Chit3.data(JsonObject json) : super.data(json);
  int get number() => 3;
  int get chance() => 2;
  Chit copy([JsonObject data]) => data == null ?
      new Chit3() : new Chit3.data(data);
}
class Chit4 extends AbstractChit {
  int get number() => 4;
  int get chance() => 3;
  Chit copy([JsonObject data]) => new Chit4();
}
class Chit5 extends AbstractChit {
  int get number() => 5;
  int get chance() => 4;
  Chit copy([JsonObject data]) => new Chit5();
}
class Chit6 extends AbstractChit {
  int get number() => 6;
  int get chance() => 5;
  Chit copy([JsonObject data]) => new Chit6();
}
class Chit8 extends AbstractChit {
  int get number() => 8;
  int get chance() => 5;
  Chit copy([JsonObject data]) => new Chit8();
}
class Chit9 extends AbstractChit {
  int get number() => 9;
  int get chance() => 4;
  Chit copy([JsonObject data]) => new Chit9();
}
class Chit10 extends AbstractChit{
  int get number() => 10;
  int get chance() => 3;
  Chit copy([JsonObject data]) => new Chit10();
}
class Chit11 extends AbstractChit{
  int get number() => 11;
  int get chance() => 2;
  Chit copy([JsonObject data]) => new Chit11();
}
class Chit12 extends AbstractChit{
  int get number() => 12;
  int get chance() => 1;
  Chit copy([JsonObject data]) => new Chit12();
}