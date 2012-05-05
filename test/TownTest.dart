class TownTest {
  test() {
    User user = new ServerUser();
    Player testPlayer = new Player(user);
    Town town = new Town();
    testPlayer.stock.towns.add(town);
    Expect.isTrue(testPlayer.totalPoints() == 0, "Player shouldn't have any points");
    Expect.isTrue(testPlayer.stock.towns.length == 1, "Player should have one stock town");
    town.addToPlayer(testPlayer);
    Expect.isTrue(testPlayer.totalPoints() == 1, "Player got a town, should have 1 point");
    Expect.isTrue(testPlayer.towns.length == 1, "Player got a town, should have 1 town");
    Expect.isTrue(testPlayer.victoryPoints.length == 1, "Player should have 1 victoryPointItem");
    Expect.isTrue(testPlayer.stock.towns.length == 0, "Player shouldn't have any stock towns");
    Expect.isTrue(testPlayer.verticePieces.length == 1, "Player should have one verticePiece in his verticePiece collection");
  }
}
