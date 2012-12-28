part of Dartan;

/** Randomization for simpicity sake */
abstract class Random extends Testable {
  int intFromZero(int length);
  int intFromOne(int length);
}
class SupportedRandoms extends ImmutableL<Random> {
  SupportedRandoms() : super([new ClientRandom()]);
}
/** A randomizer run in the browser for local games */
class ClientRandom implements Random {
  int intFromZero(int length) { // l = 3: 0, 1, 2
    if (length==1) {
      return 0;
    }
    Math.Random r = new Math.Random();
    double rnd = r.nextDouble();
    double rndl = rnd * length.toDouble();
    return rndl.toInt();
  }
  int intFromOne(int length) => (intFromZero(length) + 1) ;

  test() {
    new RandomTest().test();
  }
}
