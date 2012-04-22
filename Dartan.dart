//#library('ZetTown');

#import('dart:html');
#import('dart:coreimpl');
#import('dart:json');

#source('Observable.dart');
#source('Testable.dart');
#source('model/Player.dart');

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

// Test
#source('test/ResourcesTest.dart');
#source('test/Test.dart');
#source('test/EdgeTest.dart');
#source('test/BoardTest.dart');
#source('test/CellTest.dart');
#source('test/ListenableListTest.dart');
#source('test/PortTest.dart');

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
/** Mirror kitteh sees wall */
interface Copyable {
  Dynamic copy();
}

interface EditorWidget<T> {
  
}
interface TTest<T> {
  test();
}
interface ViewWidget<T> {
  
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
  new Dartan().run();
}

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
  /** Needs refactoring */
  static Object grabRandom(List<Object> from) {
    if (from.length == 0) {
      return null;
    } else if (from.length == 0) {
      return from.iterator().next();
    } else {
      double rnd = Math.random();
      //rnd *= 10;
      double rndl = rnd * from.length.toDouble();
      print ("r:${rnd}, rndl: ${rndl}");
      int r = rndl.toInt();
      return from[r];
    }
  }
  void run() {
    new BoardInfoView(new Board(10,10));
  }
  static String supName(var obj) {
    String temp = Dartan.name(obj).substring(9);
    return temp.substring(0,temp.length - 1);
  }
  static void swap(Dynamic first, Dynamic second) {
    Dynamic temp = first;
    first = second;
    second = temp;
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