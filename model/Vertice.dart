interface VerticeData extends JsonObject{
  CellData c1;
  CellData c2;
  CellData c3;
  String type;
}
/**
 Position on hexagon
          TopMiddle,
              ^
    TopLeft  /  \  TopRight
            |    |
            |    |
 BottomLeft  \  /  BottomRight
               +
         BottomMiddle            */
class VerticePosition {
  static int TopMiddle = 0;
  static int TopRight= 1;
  static int BottomRight= 2;
  static int BottomMiddle= 3;
  static int BottomLeft= 4;
  static int TopLeft= 5;
}
/** Either with 1 cell on the upper row, or 2 cells at the upper row */
class VerticeType {
  static int UpperRow1 = 0;  // the cell has 2 hexes on the highest row (1 on lowest)
  static int UpperRow2 = 1;  // the cell has 1 hex on the highest row (2 on lowest)
}

/** A vertice of a tile */
class Vertice implements Hashable, Jsonable, Testable {
  Cell c1, c2, c3, _topMost;

  int _type = -1;
  List<Cell> _cells;       // c1, c2 and c3 as a collection
  Set<Vertice> _vertices; // neighbouring vertices
  Set<Edge> _edges;       // the three edges

  int hashCode() => c1.hashCode() * c2.hashCode() * c3.hashCode();
  bool equals(o) => hashCode() == o.hashCode();
  String toText() => "Vertice [cell1: ${c1.toString()}, cell2: ${c2.toString()}, cell3: ${c3.toString()}]\n";
  bool hasCell(Cell c) => c1 == c || c2 == c || c3 == c;

  bool operator ==(other) {
    if (other === this)
      return true;
    if (other == null)
      return false;
    return this.equals(other);
  }
  Vertice(this.c1, this.c2, this.c3){
    _swapCellsIfNecesary();
  }
  Vertice.data(JsonObject json) {
    VerticeData data = json;
    c1 = new Cell.data(data.c1);
    c2 = new Cell.data(data.c2);
    c3 = new Cell.data(data.c3);
    _swapCellsIfNecesary();
  }
  Vertice.coords(c1row, c1col, c2row, c2col, c3row, c3col) :
    this(new Cell(c1row, c1col), new Cell(c2row, c2col), new Cell(c3row, c3col));

  Vertice.fromEdges(Edge e1, Edge e2) {
    List<Cell> allCells= new List<Cell>.from([e1.c1, e1.c2, e2.c1, e2.c2]);

    // Find the Cell used by both edges, remove it
    Cell equalCell = null;
    if (e1.c1 == e2.c1)
      equalCell = e1.c1;
    if (e1.c1 == e2.c2)
      equalCell = e1.c1;
    allCells.removeRange(allCells.indexOf(equalCell), 1);

    c1 = allCells[0];
    c2 = allCells[1];
    c3 = allCells[2];
  }
  JsonObject get data() {
    VerticeData data = new JsonObject();
    data.c1 = c1.data;
    data.c2 = c2.data;
    data.c3 = c3.data;
    data.type = Dartan.name(this);
    return data;
  }
  test() {
    new VerticeTest().test();
  }

  /** Ensures c1 is always on highest (lowest in number) row and leftmost,
  c2 next to c1 on the right if on same row */
  void _swapCellsIfNecesary() {
    List<Cell> cs = new List<Cell>.from([c1, c2, c3]);
    Cell leftTop = c1;
    Cell second, third;

    // Determine lefttop cell & remove from list
    for (int i = 0; i<3; i++) {
      if (cs[i].row < leftTop.row) {
        leftTop = cs[i];
      }
      if (cs[i].row == leftTop.row && cs[i].column < leftTop.column) {
        leftTop = cs[i];
      }
    }
    cs.removeRange(cs.indexOf(leftTop), 1);

    if (type == VerticeType.UpperRow1) {
      if (cs[0].column < cs[1].column) { // 2 other cells on the same, lower rows
        second=cs[0];
        third=cs[1];
      } else {
        second = cs[1];
        third=cs[0];
      }
    } else { // decide on row, 2 other cells on different row
      if (cs[0].row < cs[1].row) {
        second = cs[0];
        third=cs[1];
      } else {
        second = cs[1];
        third=cs[0];
      }
    }
    c1=leftTop;
    c2=second;
    c3=third;
  }
//  Vertice.fromPositionOnCell(this.c1, int relativePosition) {
//    // we must assume hex comes from a uneven row, and
//    // relative position on the hex is never the two left positions
//
//    if (relativePosition == VerticePosition.TopMiddle) {
//        c2 = new Cell(c1.row - 1, c1.column - 1);
//        c3 = new Cell(c1.row, c1.column - 1);
//    }
//    if (relativePosition == VerticePosition.TopRight) {
//        c2 = new Cell(c1.row, c1.column - 1);
//        c3 = new Cell(c1.row + 1, c1.column);
//    }
//    if (relativePosition == VerticePosition.BottomRight) {
//        c2 = new Cell(c1.row + 1, c1.column);
//        c3 = new Cell(c1.row, c1.column + 1);
//    }
//    if (relativePosition == VerticePosition.BottomMiddle) {
//        c2 = new Cell(c1.row, c1.column + 1);
//        c3 = new Cell(c1.row - 1, c1.column + 1);
//    }
//  }
  /** Returns a list of neighbours, with the given neighbour excluded */
  List<Vertice> otherNeighbours(Vertice ignore) =>
      neighbours.filter((Vertice v) => v != ignore);

  /** The three cells in a set */
  List<Cell> get cells() {
    if (_cells == null) // lazy init
      _cells = new List<Cell>.from([c1, c2, c3]);

    return _cells;
  }
  /** Returns the type of the hex: one or two Hexes on the upper row */
  int get type() {
    if (_type == -1) { // lazy init
      List<Cell> cells = new List<Cell>.from([c1, c2, c3]);
      int rmax = 220; //arbitrary high number
      for (Cell c in cells)
        if (c.row < rmax)
          rmax = c.row;

      int count = 0;
      for (Cell c in cells)
        if (c.row == rmax)
          count++;

      _type = count == 1 ? VerticeType.UpperRow1 : VerticeType.UpperRow2;
    }
    return _type;
  }
  /** Returns position on of this point on the top or top left most Cell */
  int hexPositionOnTopLeftMost() {
    return type == VerticeType.UpperRow1 ? VerticePosition.BottomMiddle : VerticePosition.BottomRight;
  }
  /** Returns a list of the three [Edge]s adjacent to this point */
  Set<Edge> get edges() {
    if (_edges == null) { // lazy init
      _edges = new HashSet<Edge>.from([
         new Edge(c1, c2),
         new Edge(c1, c3),
         new Edge(c2, c3)
      ]);
    }
    return _edges;
  }
  /** All edges except specified [Edge], which must be contained by this [this] */
  Set<Edge> otherEdges(Edge ignore) => edges.filter((Edge e) => e != ignore);

  /** Returns the topmost hex of the three hexes */
  Cell topMost() {
    if (_topMost == null) {
      List<Cell> cells = new List<Cell>.from([c1, c2, c3]);
      int maxr = 220;
      int maxc = 220;
      for (Cell c in cells) {
        if (c.row < maxr)
          maxr = c.row;
        if (c.column < maxc)
          maxc = c.column;
      }
      List<Cell> res = new List<Cell>();
      if (c1.column == maxc)
        res.add(c1);
      if (c2.column == maxc)
        res.add(c2);
      if (c3.column == maxc)
        res.add(c3);
      if (res.length == 1) {
        return res[0];
      } else {
        if (res.length == 2)
        {
          Cell l = res[0];
          if (l.row < res[0].row)
            return l;
          else
            return res[1];
        }
      }
    }
    return null;
  }

  /** Returns a list of neighbour points */
  List<Vertice> get neighbours() {
    List<Vertice> result = new List<Vertice>();
    Cell topmost = topMost();
    if (topmost.column % 2 == 0) {
      // even rows
      if (type == VerticeType.UpperRow1) {
        Vertice p1 = new Vertice(
          topmost,
          new Cell(topmost.row - 1, topmost.column),
          new Cell(topmost.row, topmost.column + 1));
        result.add(p1);

        Vertice p2 = new Vertice(
          new Cell(topmost.row + 1, topmost.column + 1),
          new Cell(topmost.row, topmost.column + 1),
          new Cell(topmost.row,topmost.column + 2));
        result.add(p2);

        Vertice p3 = new Vertice(topmost,
          new Cell(topmost.row + 1, topmost.column + 1),
          new Cell(topmost.row + 1, topmost.column));
        result.add(p3);
      } else {
        Vertice p1 = new Vertice(topmost,
          new Cell(topmost.row + 1, topmost.column),
          new Cell(topmost.row + 1, topmost.column - 1));
        result.add(p1);
        Vertice p2 = new Vertice(
          new Cell(topmost.row + 2, topmost.column + 1),
          new Cell(topmost.row + 1, topmost.column + 1),
          new Cell(topmost.row + 1, topmost.column));
        result.add(p2);
        Vertice p3 = new Vertice(topmost,
          new Cell(topmost.row + 1, topmost.column + 1),
          new Cell(topmost.row,topmost.column + 1));
        result.add(p3);
      }
    } else {
      // uneven rows
      if (type == VerticeType.UpperRow1) {
        Vertice p1 = new Vertice(topmost,
          new Cell(topmost.row - 1, topmost.column + 1),
          new Cell(topmost.row - 1, topmost.column));
        result.add(p1);

        Vertice p2 = new Vertice(
          new Cell(topmost.row, topmost.column + 1),
          new Cell(topmost.row - 1, topmost.column + 1),
          new Cell(topmost.row, topmost.column + 2));
        result.add(p2);

        Vertice p3 = new Vertice(topmost,
          new Cell(topmost.row, topmost.column + 1),
          new Cell(topmost.row + 1, topmost.column));
        result.add(p3);

      } else {
        Vertice p1 = new Vertice(topmost,
          new Cell(topmost.row, topmost.column - 1),
          new Cell(topmost.row + 1, topmost.column));
        result.add(p1);

        Vertice p2 = new Vertice(
          new Cell(topmost.row + 1,topmost.column),
          new Cell(topmost.row + 1, topmost.column + 1),
          new Cell(topmost.row, topmost.column + 1));
        result.add(p2);

        Vertice p3 = new Vertice(topmost,
          new Cell(topmost.row, topmost.column + 1),
          new Cell(topmost.row - 1, topmost.column + 1));
        result.add(p3);
      }
    }
    return result;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new Vertice(c1, c2, c3) : new Vertice.data(data);
}
