/** A simple class would work here, but the approach to have a defined 
implementation for a concept eventually creates an API */
interface Chit extends Hashable, Copyable, Testable, Identifyable {
  int get number();
  int get chance();
  bool get isRed(); // True on the best numbers
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
  test() {}
  int hashCode() {
    if (_id==null)
      _id = Dartan.generateHashCode(this);
    return _id;
  }
  Chit copy() => new AbstractChit();
}
/** Design-time placeholder for a chit to be randomly exchanged for another 
at game initialization-time */
class RandomChit extends AbstractChit {
  Chit copy() => new RandomChit();  
}
class Chit2 extends AbstractChit {
  int get number() => 2;
  int get chance() => 1;
  Chit copy() => new Chit2();
}
class Chit3 extends AbstractChit {
  int get number() => 3;
  int get chance() => 2;
  Chit copy() => new Chit3();
}
class Chit4 extends AbstractChit {
  int get number() => 4;
  int get chance() => 3;
  Chit copy() => new Chit4();
}
class Chit5 extends AbstractChit {
  int get number() => 5;
  int get chance() => 4;
  Chit copy() => new Chit5();
}
class Chit6 extends AbstractChit {
  int get number() => 6;
  int get chance() => 5;
  Chit copy() => new Chit6();
}
class Chit8 extends AbstractChit {
  int get number() => 8;
  int get chance() => 5;
  Chit copy() => new Chit8();
}
class Chit9 extends AbstractChit {
  int get number() => 9;
  int get chance() => 4;
  Chit copy() => new Chit9();
}
class Chit10 extends AbstractChit{
  int get number() => 10;
  int get chance() => 3;
  Chit copy() => new Chit10();
}
class Chit11 extends AbstractChit{
  int get number() => 11;
  int get chance() => 2;
  Chit copy() => new Chit11();
}
class Chit12 extends AbstractChit{
  int get number() => 12;
  int get chance() => 1;
  Chit copy() => new Chit12();
}