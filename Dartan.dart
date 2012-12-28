library Dartan;

import 'dart:html';
import 'dart:json';
import 'dart:svg' as svg;
import 'dart:math' as Math;
import "dart:mirrors" as mirrors;
import 'package:json_object/json_object.dart';

part 'SeeAllTested.dart';

part 'ImmutableL.dart';
part 'Observable.dart';
part 'Testable.dart';
part 'Oracle.dart';
part 'Jsonable.dart';
part 'Identifyable.dart';
part 'Copyable.dart';

// Model
part 'model/Resource.dart';
part 'model/Resources.dart';
part 'model/Game.dart';
part 'model/Board.dart';
part 'model/Vertice.dart';
part 'model/Edge.dart';
part 'model/Cell.dart';
part 'model/Port.dart';
part 'model/PortList.dart';
part 'model/Chit.dart';
part 'model/Territory.dart';
part 'model/Tile.dart';
part 'model/GamePhase.dart';
part 'model/GameStatus.dart';
part 'model/DevelopmentCard.dart';
part 'model/TurnPhase.dart';
part 'model/Turn.dart';
part 'model/Player.dart';
part 'model/action/Action.dart';
part 'model/ServerGame.dart';
part 'model/Dice.dart';
part 'model/Random.dart';
part 'model/action/TradeAction.dart';
part 'model/action/GameAction.dart';
part 'model/action/LobbyAction.dart';
part 'model/GameServer.dart';
part 'model/Lobby.dart';
part 'model/Piece.dart';
part 'model/Stock.dart';
part 'model/Robber.dart';
part 'model/LongestRoad.dart';
part 'model/Route.dart';
part 'model/LargestArmy.dart';
part 'model/GameSetting.dart';

// UI
part 'ui/BoardState.dart';
part 'ui/BoardEditor.dart';
part 'ui/TileInfoView.dart';
part 'ui/ViewRouter.dart';
part 'ui/Objects.dart';
part 'ui/Views.dart';
part 'ui/CellNeighboursView.dart';
part 'ui/TileMeasurementInfo.dart';
part 'ui/ResourcePicker.dart';
part 'ui/ResourcesView.dart';
part 'ui/GameView.dart';
part 'ui/LobbyView.dart';
part 'ui/BoardViewer.dart';

// Visual
part 'ui/visual/BoardVisual.dart';
part 'ui/visual/ChitVisual.dart';
part 'ui/visual/EdgeVisual.dart';
part 'ui/visual/VerticeVisual.dart';
part 'ui/visual/TileVisual.dart';
part 'ui/visual/PortPickerVisual.dart';
part 'ui/visual/TerritoryVisual.dart';
part 'ui/visual/PortVisual.dart';
part 'ui/visual/TownVisual.dart';
part 'ui/visual/Visual.dart';

// Test
part 'test/ResourcesTest.dart';
part 'test/Test.dart';
part 'test/EdgeTest.dart';
part 'test/BoardTest.dart';
part 'test/CellTest.dart';
part 'test/ListenableListTest.dart';
part 'test/PortTest.dart';
part 'test/RandomTest.dart';
part 'test/GameTest.dart';
part 'test/TownTest.dart';
part 'test/CityTest.dart';
part 'test/RoadTest.dart';
part 'test/JsonableTest.dart';
part 'test/VerticeTest.dart';

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
  static int generateHashCode(var obj) {
    Math.Random r = new Math.Random();
    return r.nextInt(10000000).toInt();
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
    for (Object o in objectz) {
      result.add(smallIcon(o));
    }
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