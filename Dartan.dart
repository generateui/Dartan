//#library('ZetTown');

#import('dart:html');
#import('dart:coreimpl');
#import('dart:json');

#source('Observable.dart');
#source('Testable.dart');
#source('JsonObject.dart');

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
#source('ui/Visual.dart');
#source('ui/GameView.dart');
#source('ui/LobbyView.dart');
#source('ui/BoardViewer.dart');

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
interface Jsonable extends Copyable default Oracle {
  Jsonable.data(JsonObject json);
  JsonObject get data();
}
class JsonableFactory {
  factory Jsonable.data(JsonObject json) { return null; }
}
class Oracle implements Jsonable {
  static Map<String, Map<String, Copyable>> mapOfMaps;
  static Map<String, Iterable<Copyable>> mapOfSupportedTypes;
  static ensureMap() {
    if (mapOfMaps == null) {
      mapOfMaps = new HashMap<String, Map<String, Copyable>>();
      mapOfSupportedTypes = new HashMap<String, Collection<Copyable>>();
      mapOfSupportedTypes["Resource"] = new SupportedResources();
      mapOfSupportedTypes["Chit"] = new SupportedChits();

      for (String type in mapOfSupportedTypes.getKeys()) {
        HashMap<String, Copyable> map = new HashMap();
        for (Copyable c in mapOfSupportedTypes[type]) {
          map[Dartan.name(c)] = c;
        }
        mapOfMaps[type] = map;
      }
    }
  }

  static List<Copyable> fromDataList(List<JsonObject> dataList) {
    List<Copyable> instantiated = new List();
    for (JsonObject json in dataList) {
      instantiated.add(new Jsonable.data(json));
    }
    return instantiated;
  }
  factory Resource.data(JsonObject json) {
    ResourceData rd = json;
    Resource r = new Resource.type(rd.type);
    r.id = rd.id;
    return r;
  }
  factory Resource.type(String type) => instanceOf("Resource", type);

  factory Dice.data(JsonObject json) {
    DiceData rd = json;
    Dice r = new Dice.type(rd.type);
    return r;
  }
  factory Dice.type(String type) => instanceOf("Dice", type);
  static Copyable instanceOf(String interfaceName, String concreteName){
    ensureMap();
    return mapOfMaps[interfaceName][concreteName].copy();
  }
  static newChitByType(String type) => instanceOf("Chit", type);
  factory DevelopmentCard.type(String type) => instanceOf("DevelopmentCard", type);
  factory Port.type(String type) => instanceOf("Port", type);
  factory Port.data(JsonObject json) {
    Port p = new Port.type(json["type"]);
    return p.copy(json);
  }
  factory Territory.type(String type) => instanceOf("Territory", type);
  factory Territory.data(JsonObject json) {
    Port p = new Port.type(json["type"]);
    return p.copy(json);
  }
  factory TurnPhase.type(String type) => instanceOf("TurnPhase", type);
  factory TurnPhase.data(JsonObject json) {
    // TODO: implement
  }

  factory Oracle.data(JsonObject data) {
    //Empty
  }
  /** Creates new list with data objects from a list of jsonables */
  static List<JsonObject> toDataList(Iterable<Jsonable> jsonables) {
    List<JsonObject> result = new List<JsonObject>();
    for (Jsonable json in jsonables) {
      result.add(json.data);
    }
    return result;
  }
  Dynamic copy([JsonObject data]) { throw new NotImplementedException();}
  JsonObject get data() => null;
}
/** Mirror kitteh sees wall */
interface Copyable {
  Dynamic copy([JsonObject data]);
}

interface EditorWidget<T> {

}
interface TTest<T> {
  test();
}
interface ViewWidget<T> {
  T model;
  Element text(T item); // ToString
  Element html(T item);
  Element icon(T item);
  Element debug(T item); // a widget showing details of instance
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
   new SupportedTradeActions(),
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
     new Board(),
     //new Vertice(new Cell(0,0),
     ]);
}
void main() {
  new Dartan();
}

List copiesOf(Copyable c, int amount) {
  var l = new List();
  for (int i=0; i<amount; i++) {
    l.add(c.copy());
  }
  return l;
}
Identifyable byId(int theid, List<Identifyable> withIds) =>
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
  static int generateHashCode(var obj) {
    return (Math.random()* 10000000).toInt();
  }
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
    String n = name(obj);
    if (n.startsWith("Abstract")) {
      return "<img src=\"img/icon16/Abstract.png\">";
    }
    return "<img src=\"img/icon16/${name(obj)}.png\">";
  }
}