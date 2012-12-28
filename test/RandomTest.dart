part of Dartan;

class RandomTest {
  void test() {
    ClientRandom cr = new ClientRandom();
    bool minHit, maxHit;
    int r;
    for (int i=0; i< 1000; i++) { // in practice, chances this fails randomly are slim
      r = cr.intFromZero(10); // 0..9
      Expect.isFalse(r > 9, "random number should be below 9");
      Expect.isFalse(r < 0, "random number should not be negative");
      if (r==0) {
        minHit = true;
      }
      if (r==9) {
        maxHit = true;
      }
    }
    Expect.isTrue(minHit, "Expected 0 to be hit");
    Expect.isTrue(maxHit, "Expected 9 to be hit");
    minHit=false;
    maxHit=false;
    int r2;
    for (int i=0; i< 1000; i++) {
      r2 = cr.intFromOne(10); // 1..10
      Expect.isFalse(r2 > 10, "random number should be below 9");
      Expect.isFalse(r2 < 1, "random number should not be negative");
      if (r2 == 1) {
        minHit = true;
      }
      if (r2 == 10) {
        maxHit = true;
      }
    }

    Expect.isTrue(minHit, "Expected 1 to be hit");
    Expect.isTrue(maxHit, "Expected 10 to be hit");
  }
}
