class CityTest {
  test() {
    User user = new ServerUser();
    Player testPlayer = new Player(user);
    City city = new City();
    testPlayer.stock.cities.add(city);
    Expect.isTrue(testPlayer.totalPoints() == 0, "Player shouldn't have any points");
    Expect.isTrue(testPlayer.stock.cities.length == 1, "Player should have one stock city");
    city.addToPlayer(testPlayer);
    Expect.isTrue(testPlayer.totalPoints() == 2, "Player got a city, should have 2 points");
    Expect.isTrue(testPlayer.cities.length == 1, "Player got a city, should have 1 city");
    Expect.isTrue(testPlayer.victoryPoints.length == 1, "Player should have 1 victoryPointItem");
    Expect.isTrue(testPlayer.stock.cities.length == 0, "Player shouldn't have any stock cities");
    Expect.isTrue(testPlayer.verticePieces.length == 1, "Player should have one verticePiece in his verticePiece collection");
  }
}
