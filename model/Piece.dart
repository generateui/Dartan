/** Anything a player may own and place on the board */
interface Piece extends Identifyable, Hashable, Copyable, Testable {
  Player player; // Player owning the piece, might be null
  bool get isStock(); // If not yet placed on the board, is this piece kept in stock?
  bool get affectsRoad(); // When placed on board, recalculate longest road?
  ResourceList get cost(); // Cost to buy this piece, might be null

  // Dispatched calls to add/remove the piece
  addToPlayer(Player player); 
  removeFromPlayer(Player player);
}
class SupportedPieces extends ImmutableL<Piece> {
  SupportedPieces() : super([new Road(), new Town(), new City()]);
}
/** A piece producing resources for the player */
interface Producer {
  ResourceList produce(Tile tile);
  Vertice get vertice();
}
/** Piece residing on an edge, e.g. a road, ship or bridge */
interface EdgePiece {
  Edge edge;
  
  // Assuming the vertice is not occupied by (friendly/non-friendly) VerticePiece
  bool get connectsWithRoad();
  bool get connectsWithShip();
  bool get connectsWithBridge();
}
/** Piece residing on a vertice, e.g. a town or city */
interface VerticePiece {
  Vertice vertice;
}
/** Anything giving the player a point */
interface VictoryPointItem {
  int get points();
}
class Road implements Piece, EdgePiece {
  Player player;
  int id;
  Edge edge;
  ResourceList get cost() => new RoadCost();
  bool get isStock() => true;
  bool get affectsRoad() => true;
  bool get connectsWithRoad() => true;
  bool get connectsWithShip() => false;
  bool get connectsWithBridge() => true;
  addToPlayer(Player p) {
    p.roads.add(this);
    p.stock.roads.remove(this);
    p.edgePieces.add(this);
  }
  removeFromPlayer(Player p) {
    p.roads.remove(this);
    p.stock.roads.add(this);
    p.edgePieces.remove(this);
  }
  // Copyable
  Road copy() {
    Road copyy = new Road();
    copyy.player = player;
    return copyy;
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  // Testable
  test() {
    new RoadTest().test();
  }
}
class Town implements Piece, VerticePiece, Producer, VictoryPointItem {
  Player player;
  int id;
  Vertice vertice;
  ResourceList get cost() => new TownCost();
  bool get isStock() => true;
  bool get affectsRoad() => true;
  int get points() => 1;
  addToPlayer(Player p) {
    p.towns.add(this);
    p.stock.towns.remove(this);
    p.victoryPoints.add(this);
    p.verticePieces.add(this);
    p.producers.add(this);
  }
  removeFromPlayer(Player p) {
    p.towns.remove(this);
    p.stock.towns.add(this);
    p.victoryPoints.remove(this); 
    p.verticePieces.remove(this); 
    p.producers.remove(this);
  }
  ResourceList produce(Tile tile) {
    // TODO: implement
  }
  // Copyable
  Town copy() {
    Town copyy = new Town();
    copyy.player = player;
    return copyy;
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  test() {
    new TownTest().test();
  }
}
class City implements Piece, VerticePiece, Producer, VictoryPointItem { 
  Player player;
  int id;
  Vertice vertice;
  ResourceList get cost() => new CityCost();
  bool get isStock() => true;
  bool get affectsRoad() => false;
  int get points() => 2;
  addToPlayer(Player p) {
    p.cities.add(this);
    p.stock.cities.remove(this);
    p.victoryPoints.add(this);
    p.verticePieces.add(this);
    p.producers.add(this);
  }
  removeFromPlayer(Player p) {
    p.cities.remove(this);
    p.stock.cities.add(this);
    p.victoryPoints.remove(this);
    p.verticePieces.remove(this);
    p.producers.remove(this);
  }
  ResourceList produce(Tile tile) {
    // TODO: implement
  }
  // Copyable
  City copy() {
    City copyy = new City();
    copyy.player = player;
    return copyy;
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  test() {
    new CityTest().test();
  }
}