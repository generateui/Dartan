class ResourcesTest {
  void test() {
  	    /* Simple collection test */
    ResourceListIm cost = new RoadCost();
    Expect.equals(cost.length, 2, "Two resources (Timber and Clay) expected");
    Expect.isTrue(cost.hasType("Timber"), "roadcost should have a timber");
    Expect.isTrue(cost.hasType("Clay"), "roadcost should have a clay");
    Expect.isFalse(cost.hasType("Ore"), "roadcost should not have ore");
    Expect.isFalse(cost.hasType("Testing123"), "roadcost should have a timber");
    Expect.isTrue(cost.hasAtLeast(new ResourceListIm([new Timber(), new Clay()])), "Road costs timber + brick");
    Expect.isFalse(cost.hasAtLeast(new DevelopmentCardCost()), "should'nt be able to pay for a devcard with a roadcost");
    //cost.types().forEach((f) { print(Catan.name(f));});
    Expect.equals(1, cost.ofType("Timber").length,  "Road needs at least one timber");
    Expect.equals(1, cost.ofType("Clay").length,  "Road needs at least one clay");
    
    ResourceList cityCost = new CityCost();
    Expect.equals(2, cityCost.ofType("Wheat").length, "Expected a city to need 2 wheat");
    /* Custom rounding */
    ResourceList im8 = new ResourceListIm([
      new Wheat(),new Wheat(),new Wheat(),new Wheat(),
      new Wheat(),new Wheat(),new Wheat(),new Wheat()]);
    Expect.equals(im8.halfCount(), 4, "half of 8 is 4");
    ResourceList im9 = new ResourceListIm([
      new Wheat(),new Wheat(),new Wheat(),new Wheat(),
      new Wheat(),new Wheat(),new Wheat(),new Wheat(), new Wheat()]);
    Expect.equals(im9.halfCount(), 5, "half of 9 rounded up is 5");
    
    List<String> l = new List<String>();
    l.add(null);
    Expect.equals(1, l.length,"list length 1");
    //String s = JSON.stringify(cost);
    //print(s);
    
    return new ResourcesTest().test();
  }
}