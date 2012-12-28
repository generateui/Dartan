part of Dartan;

class RoadTest {
  test() {
    User user = new ServerUser();
    Player testPlayer = new Player(user);
    Road road = new Road();
    testPlayer.stock.roads.add(road);
    Expect.isTrue(testPlayer.roads.length == 0, "Player should have no roads");
    Expect.isTrue(testPlayer.stock.roads.length == 1, "Player should have one road in stock");
    Expect.isTrue(testPlayer.totalPoints() == 0, "Player should have 0 points");
    road.addToPlayer(testPlayer);
    Expect.isTrue(testPlayer.roads.length == 1, "Player should have 1 road");
    Expect.isTrue(testPlayer.stock.roads.length == 0, "Player should have no roads in stock");
    Expect.isTrue(testPlayer.edgePieces.length == 1, "Player should have one edgePiece");

    Road r = new Road();
    r.id = 1;
    r.playerId = 1;
    r.edge = new Edge(new Cell(0, 0), new Cell(0, 1));
    expectEqualCopy(r);
  }
}
