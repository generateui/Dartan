part of Dartan;

/** Anything a player may own and place on the board */
abstract class Piece implements Identifyable, Hashable, Copyable, Testable, Jsonable {
  Player player; // Player owning the piece, might be null
  bool get isStock; // If not yet placed on the board, is this piece kept in stock?
  bool get affectsRoad; // When placed on board, recalculate longest road?
  ResourceList get cost; // Cost to buy this piece, might be null
}
class SupportedPieces extends ImmutableL<Piece> {
  SupportedPieces() : super([new Road(), new Town(), new City()]);
}
/** Dispatched calls to add/remove the piece */
abstract class PlayerPiece {
  addToPlayer(Player player);
  removeFromPlayer(Player player);
}
/** A piece producing resources for the player */
abstract class Producer implements Jsonable {
  ResourceList produce(Tile tile);
  Vertice get vertice;
}
/** Piece residing on an edge, e.g. a road, ship or bridge */
abstract class EdgePiece implements Jsonable {
  Edge edge;

  // Assuming the vertice is not occupied by (friendly/non-friendly) VerticePiece
  bool get connectsWithRoad;
  bool get connectsWithShip;
  bool get connectsWithBridge;
}
/** Piece residing on a vertice, e.g. a town or city */
abstract class VerticePiece implements Jsonable {
  Vertice vertice;
}
/** Anything giving the player a point */
abstract class VictoryPointItem implements Jsonable {
  int get points;
}
abstract class RoadData extends JsonObject {
  int id;
  int playerId;
  String type;
  EdgeData edge;
}
class Road implements Piece, EdgePiece, PlayerPiece {
  Player player;
  int id;
  int playerId;
  Edge edge;

  ResourceList get cost => new RoadCost();
  bool get isStock => true;
  bool get affectsRoad => true;
  bool get connectsWithRoad => true;
  bool get connectsWithShip => false;
  bool get connectsWithBridge => true;

  Road();
  Road.fromData(JsonObject json) {
    var data = json;
    id = data.id;
    playerId = data.playerId;
    edge = fromData(data.edge);
  }
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    data.edge = nullOrDataFrom(edge);
    data.playerId = playerId;
    return data;
  }
  Road copy([JsonObject data]) => data == null ?
      new Road() : new Road.fromData(data);

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
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  bool operator ==(other) =>
    id == other.id &&
    playerId == other.playerId &&
    edge == other.edge;

  // Testable
  test() {
    new RoadTest().test();
  }
}
abstract class TownData extends JsonObject {
  int id;
  int playerId;
  String type;
  VerticeData vertice;
}
class Town implements Piece, VerticePiece, Producer, VictoryPointItem, PlayerPiece {
  int playerId;
  int id;
  Player player;
  Vertice vertice;

  ResourceList get cost => new TownCost();
  bool get isStock => true;
  bool get affectsRoad => true;
  int get points => 1;

  Town();
  Town.fromData(JsonObject json) {
    var data = json;
    id = data.id;
    playerId = data.playerId;
    vertice = fromData(data.vertice);
  }

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
  bool operator ==(other) => other.id == id;
  // Copyable
  Town copy([JsonObject data]) => data==null ? new Town() : new Town.fromData(data);
  // Jsonable
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.playerId = playerId;
    data.type = Dartan.name(this);
    data.vertice = nullOrDataFrom(vertice);
    return data;
  }
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  test() {
    new TownTest().test();
  }
}
abstract class CityData extends JsonObject {
  int id;
  int playerId;
  String type;
  VerticeData vertice;
}
class City implements Piece, VerticePiece, Producer, VictoryPointItem, PlayerPiece {
  Player player;
  int id;
  int playerId;
  Vertice vertice;

  ResourceList get cost => new CityCost();
  bool get isStock => true;
  bool get affectsRoad => false;
  int get points => 2;

  City();
  City.fromData(JsonObject json) {
    var data = json;
    id = data.id;
    playerId = data.playerId;
    vertice = fromData(data.vertice);
  }
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
  City copy([JsonObject data]) => data==null ? new City() : new City.fromData(data);
  // Jsonable
  JsonObject get data {
    var data = new JsonObject();
    data.id = id;
    data.playerId = playerId;
    data.type = Dartan.name(this);
    data.playerId = playerId;
    data.vertice = nullOrDataFrom(vertice);
    return data;
  }
  // Hashable
  int get hashCode {
    if (id==null) {
      id = Dartan.generateHashCode(this);
    }
    return id;
  }
  bool operator ==(other) =>
    other.id == id &&
    other.playerId == playerId &&
    other.vertice == vertice;

  test() {
    new CityTest().test();
  }
}