//#library('ZetTown');

#import('dart:html');
#import('dart:coreimpl');
#import('dart:json');

#source('Observable.dart');
#source('Testable.dart');
#source('JsonObject.dart');
#source('Oracle.dart');

// Model
#source('model/Resource.dart');
#source('model/Resources.dart');
#source('model/Game.dart');
#source('model/Board.dart');
#source('model/Vertice.dart');
#source('model/Edge.dart');
#source('model/Cell.dart');
#source('model/Port.dart');
#source('model/PortList.dart');
#source('model/Chit.dart');
#source('model/Territory.dart');
#source('model/Tile.dart');
#source('model/GamePhase.dart');
#source('model/GameStatus.dart');
#source('model/DevelopmentCard.dart');
#source('model/TurnPhase.dart');
#source('model/Turn.dart');
#source('model/Player.dart');
#source('model/action/Action.dart');
#source('model/ServerGame.dart');
#source('model/Dice.dart');
#source('model/Random.dart');
#source('model/action/TradeAction.dart');
#source('model/action/GameAction.dart');
#source('model/action/LobbyAction.dart');
#source('model/GameServer.dart');
#source('model/Lobby.dart');
#source('model/Piece.dart');
#source('model/Stock.dart');
#source('model/Robber.dart');
#source('model/LongestRoad.dart');
#source('model/Route.dart');
#source('model/LargestArmy.dart');
#source('model/GameSetting.dart');


// UI
#source('ui/BoardState.dart');
#source('ui/BoardEditor.dart');
#source('ui/TileInfoView.dart');
#source('ui/ViewRouter.dart');
#source('ui/Objects.dart');
#source('ui/Views.dart');
#source('ui/CellNeighboursView.dart');
#source('ui/TileMeasurementInfo.dart');
#source('ui/ResourcePicker.dart');
#source('ui/ResourcesView.dart');
#source('ui/GameView.dart');
#source('ui/LobbyView.dart');
#source('ui/BoardViewer.dart');

// Visual
#source('ui/visual/BoardVisual.dart');
#source('ui/visual/ChitVisual.dart');
#source('ui/visual/EdgeVisual.dart');
#source('ui/visual/VerticeVisual.dart');
#source('ui/visual/TileVisual.dart');
#source('ui/visual/PortPickerVisual.dart');
#source('ui/visual/TerritoryVisual.dart');
#source('ui/visual/PortVisual.dart');
#source('ui/visual/TownVisual.dart');
#source('ui/visual/Visual.dart');

// Test
#source('test/ResourcesTest.dart');
#source('test/Test.dart');
#source('test/EdgeTest.dart');
#source('test/BoardTest.dart');
#source('test/CellTest.dart');
#source('test/ListenableListTest.dart');
#source('test/PortTest.dart');
#source('test/RandomTest.dart');
#source('test/GameTest.dart');
#source('test/TownTest.dart');
#source('test/CityTest.dart');
#source('test/RoadTest.dart');
#source('test/JsonableTest.dart');
#source('test/VerticeTest.dart');

#resource('zettown.css');

/** global unique id
To ensure the server and client are talkin' about the same thing, each supported
interface extends [Identifyable]. Implementors should assume the thing is first
instantiated serverside (which may be on the client for local games), and assigned a fresh
GUID.
*/
interface Identifyable {
  int get id();
}
/** Allow classes to be (de)serialized from/to json */
interface Jsonable
  extends Copyable
  default Oracle {

  Jsonable.data(JsonObject json);
  Jsonable.type(String type);
  JsonObject get data();
}
interface DefaultJsonableData extends JsonObject {
  int id;
  String type;
}
/** Provides a default implementation for all interfaces.
Not to be used for any purpose other then copy/pasting code and testing
Jsonable interface test code.  */
class DefaultJsonable
  implements
  Copyable,
  Testable,
  Identifyable,
  Hashable,
  Jsonable {

  int id = 0;
  DefaultJsonable();
  DefaultJsonable.data(JsonObject json) {
    DefaultJsonableData data = json;
    id = data.id;
  }
  JsonObject get data() {
    DefaultJsonableData data = new JsonObject();
    data.id = id;
    data.type = Dartan.name(this);
    return data;
  }
  // Hashable
  int hashCode() {
    if (id==null)
      id = Dartan.generateHashCode(this);
    return id;
  }
  DefaultJsonable copy([JsonObject data]) =>
      data == null ? new DefaultJsonable() : new DefaultJsonable.data(data);
  bool equals(other) => other.id == id;
  test() {
    new JsonableTest().test();
  }
}

/** Mirror kitteh sees wall - No mirrors detected.
Each object requires:
- Object.data(JsonObject json) constructor
- copy instance method defaulting on Object() or Object.data(json) e.g.
  ObjectName copy([JsonObject data]) => data == null ?
    new ObjectName() : new ObjectName.data(data);

*/
interface Copyable {
  Dynamic copy([JsonObject data]);
}
/** I'd like to be able to declare immutable collection types, not
necesarily instances with const. */
class ImmutableL<T> implements Iterable<T> {
  List<T> wrapped;
  ImmutableL(Iterable<T> list) {
    wrapped = new List<T>();
    for (T t in list) {
      wrapped.add(t);
    }
  }
  Iterator<T> iterator() {
    return wrapped.iterator();
  }
}

/** Instances of all collections containing instances of supported objects
    One day, AllSupportedLists can add itself to itself. */
class AllSupportedLists extends ImmutableL<Iterable<Testable>> {
  AllSupportedLists() : super([
   new SupportedGames(),
   new SupportedResources(),
   new SupportedResourceLists(),
   new SupportedTiles(),
   new SupportedVariouss(),
   new SupportedPorts(),
   new SupportedChits(),
   new SupportedTerritories(),
   new SupportedGamePhases(),
   new SupportedTurnPhases(),
   new SupportedGameStatuses(),
   new SupportedDevelopmentCards(),
   new SupportedRandoms(),
   new SupportedGameActions(),
   new SupportedLobbyActions(),
   new SupportedActions(),
   new SupportedDices(),
   new SupportedPieces(),
   new SupportedListenableLists()]);
}
/** Various ungrouped implementations */
class SupportedVariouss extends ImmutableL<Testable> {
  SupportedVariouss() : super([
     new Cell(0,0),
     new Edge(new Cell(0,0), new Cell(0,1)),
     new Vertice(new Cell(0,0), new Cell(1,0), new Cell(1,1)),
     new Board(),
     new DefaultJsonable()
     //new Vertice(new Cell(0,0),
     ]);
}
void main() {
  new Dartan();
}
bool valueEquals(Jsonable first, Jsonable second) {
  if (first != null && second != null) {
    return first.data.equals(second.data);
  }
  if (first == null && second == null) {
    return false;
  }
}
Jsonable fromData(JsonObject json) {
  if (json == null) {
    return null;
  } else {
    return new Jsonable.data(json);
  }
}
ListenableList<Jsonable> llFrom(Iterable<Jsonable> jsonables) {
  if (jsonables == null) {
    return new ListenableList();
  } else {
    return new ListenableList.from(Oracle.toDataList(jsonables));
  }
}
List<Jsonable> listFrom(Iterable<JsonObject> jsonObjects) {
  if (jsonObjects == null) {
    return new List();
  } else {
    List l = new List();
    for (JsonObject json in jsonObjects) {
      Jsonable newJsonable = new Jsonable.data(json);
      l.add(newJsonable);
    }
    return l;
  }
}
List<JsonObject> nullOrDataListFrom(Iterable<Jsonable> jsonables) {
  if (jsonables == null) {
    return null;
  }
  return Oracle.toDataList(jsonables);
}
JsonObject nullOrDataFrom(Jsonable json) {
  if (json == null) {
    return null;
  }
  return json.data;
}
bool isNullOrEmpty(List l) => l == null || l.isEmpty();
List copiesOf(Copyable c, int amount) {
  var l = new List();
  for (int i=0; i<amount; i++) {
    l.add(c.copy());
  }
  return l;
}
Identifyable byId(int theid, Collection<Identifyable> withIds) =>
    withIds.filter((Identifyable hasId) => hasId.id == theid).iterator().next();

class Dartan {
  static String check = "<span class=checkOk>&#10004</span>";
  static String noCheck = "&#10006";
  ViewRouter viewRouter;
  Dartan() {
    viewRouter = new ViewRouter();
  }

  /* ಠ_ಠ */
  static String name(obj) {
    if (obj != null) {
      String temp = obj.toString().substring(13);
      return temp.substring(0,temp.length - 1);
    } else {
      return "null";
    }
  }
  /** Free random hashcodes for all! */
  static int generateHashCode(var obj) => (Math.random()* 10000000).toInt();
  static String supName(var obj) {
    String temp = Dartan.name(obj).substring(9);
    temp = temp.substring(0,temp.length - 1);
    if (temp.endsWith("ie")) { // Territory
      temp = "${temp.substring(0, temp.length - 2)}y";
    }
    if (temp.endsWith("se")) { // GameStatus
      temp = temp.substring(0,temp.length - 1);
    }
    return temp;
  }
  static String toHtml(bool b) {
    return b ? check : noCheck;
  }

  String toIconList(Iterable<Object> objectz) {
    StringBuffer result = new StringBuffer();
    for (Object o in objectz)
      result.add(smallIcon(o));
    return result.toString();
  }

  static String link(var obj) {
    return """<span>${smallIcon(obj)} <a href="${name(obj)}.html">${name(obj)}</a></span>""";
  }

  static String smallIcon(var obj) {
    String n = obj is String ? obj : name(obj);
    if (n.startsWith("Abstract")) {
      return "<img src=\"img/icon16/Abstract.png\">";
    }
    return "<img src=\"img/icon16/${name(obj)}.png\">";
  }
}