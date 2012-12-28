part of Dartan;

class PortTest {
  static void test() {
    ResourceListMu twoCities = new ResourceListMu();
    twoCities.addAll(new CityCost());
    twoCities.addAll(new CityCost());
    Port fourToOne = new FourToOnePort();
    Port threeToOne = new ThreeToOnePort();

    Expect.equals(1, fourToOne.divide(twoCities, "Ore"), "Should be able to trade ore, 6 ore present");
    Expect.equals(1, fourToOne.divide(twoCities, "Wheat"), "Should be able to trade ore, 4 wheat present");
    Expect.equals(2, threeToOne.divide(twoCities, "Ore"), "Should be able to trade 2 gold for 6 ore present");
    Expect.equals(1, threeToOne.divide(twoCities, "Wheat"), "Should be able to trade one gold for 4 wheat present");

    twoCities.addAll(new CityCost());
    Expect.equals(2, fourToOne.divide(twoCities, "Ore"), "Should be able to trade for 2 gold");
    Expect.equals(1, fourToOne.divide(twoCities, "Wheat"), "Should be able to trade for one gold, 6 wheat present");
  }
}
