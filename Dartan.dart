#library('Dartan');

#import('dart:html');
#import('dart:coreimpl');
#import('dart:json');

#source('SeeAllTested.dart');

#source('ImmutableL.dart');
#source('Observable.dart');
#source('Testable.dart');
#source('JsonObject.dart');
#source('Oracle.dart');
#source('Jsonable.dart');
#source('Identifyable.dart');
#source('Copyable.dart');

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

/** Instances of all collections containing instances of supported objects
    One day, AllSupportedLists can add itself to itself. Or look in a mirror. */
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
     new DefaultJsonable(),
     new User(),
     new GameSettings(),
     new Player(),
     new Robber(),
     new LongestRoad(),
     new LargestArmy(),
     new Stock()
   ]);
}
class Dartan {
  static String check = "<span class=checkOk>&#10004</span>";
  static String noCheck = "&#10006";
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