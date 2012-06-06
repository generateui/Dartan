class ResourceListImTest {
  void test() {
    ResourceListIm cost = new RoadCost();
    Expect.equals(cost.length, 2, "Two resources (Timber and Clay) expected");
    Expect.isTrue(cost.hasType("Timber"), "roadcost should have a timber");
    Expect.isTrue(cost.hasType("Clay"), "roadcost should have a clay");
    Expect.isFalse(cost.hasType("Ore"), "roadcost should not have ore");
    Expect.isFalse(cost.hasType("Testing123"), "roadcost should have a timber");
    Expect.isTrue(cost.hasAtLeast(new ResourceListIm([new Timber(), new Clay()])), "Road costs timber + brick");
    Expect.isFalse(cost.hasAtLeast(new DevelopmentCardCost()), "should'nt be able to pay for a devcard with a roadcost");
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

    Resource jsonWheat = new Jsonable.data(new JsonObject.fromMap(
      {"type": "Wheat", "id": 20}));
    Wheat w  = new Wheat();
    w.id = 20;
    Expect.isTrue(jsonWheat.equals(w),
        "Expected wheat from Jsonable and new() constructor to be equal");

    List<String> l = new List<String>();
    l.add(null);
    Expect.equals(1, l.length,"list length 1");
  }
}
class ResourceListMuTest {
  void test() {
    /* simple cost check */
    ResourceListMu hand = new ResourceListMu();
    hand.add(new Wheat());
    hand.add(new Ore());
    hand.add(new Sheep());
    Expect.isTrue(hand.hasAtLeast(new DevelopmentCardCost()));
    Expect.isFalse(hand.hasAtLeast(new RoadCost()), "Cant pay for road");

    /* Testing event firing */
    Ore ore = new Ore();
    int firedOnRemove = 0;
    int firedOnAdd = 0;
    hand.onRemoved((Resource e)  {
      firedOnRemove ++;
      Expect.equals(ore, e, "Unexpected removed item in event");
    });
    hand.onAdded((Resource r) {
      firedOnAdd ++;
      Expect.equals(ore, r, "Unexpected removed item in event");
    });

    hand.add(ore);
    hand.remove(ore);
    Expect.equals(1, firedOnRemove, "removed event not received");
    Expect.equals(1, firedOnAdd, "add event not received");
  }
}