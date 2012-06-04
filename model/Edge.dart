interface EdgeData extends JsonObject{
  CellData c1;
  CellData c2;
}
/** Direction the edge is pointing towards from the left */
class EdgeDirection {
  static int SlopeUp = 0;    //  /
  static int SlopeDown = 1;  //  \
  static int Vertical = 2;   //  |
}
/** The *edges' position* is different then the Vertice's position */
class EdgePosition {
  static int Deg060 = 0; // Start at 0, end at 60 deg
  static int Deg60120 = 1; // et cetera
  static int Deg120180 = 2;
  static int Deg180240 = 3;
  static int Deg240300 = 4;
  static int Deg3000 = 5;
}
/** A side of an hexagon, defined by 2 [Cell]s or 2 [Vertice]s */
class Edge implements Hashable, Jsonable {
  Cell c1; // On instantiation, c1 is guaranteed to be on top row, or leftmost if c1 and c2 on the same row */
  Cell c2;
  Vertice v1, v2;

  int _direction = -1;

  List<Vertice> nieghbourVertices;
  List<Cell> _neighbourCells; // TODO impl
  List<Edge> _neighbourEdges; // TODO impl

  Edge.data(JsonObject json) {
    EdgeData data = json;
    c1 = new Cell.data(data.c1);
    c2 = new Cell.data(data.c2);
    _calculateVertices();
  }

  Edge(this.c1, this.c2) { _calculateVertices(); }
  Edge.fromVertices(this.v1, this.v2) { _calculateCells(); }

  JsonObject get data() {
    EdgeData data = new JsonObject();
    data.c1 = c1.data;
    data.c2 = c2.data;
    return data;
  }
  int hashCode() => c1.hashCode() * c2.hashCode();

  String toString() => "c1: {$c1}, c2: ${c2}, hash: ${hashCode()}";

  bool operator ==(other) {
    if (other === this)
      return true;
    if (other == null)
      return false;
    return this.equals(other);
  }

  Cell otherCell(Cell c) => c == c1 ? c2 : c1;
  Vertice otherVertice(Vertice v) => v == v1 ? v2 : v1;

  bool hasCell(Cell check) =>  c1 == check || c2 == check;

  bool equals(other) => c1.equals(other.c1) && c2.equals(other.c2);

  /** Ensures left- or topmost cell becomes c1 */
  void _swapCellsIfNecesary() {
    if (c1== null || c2 == null) {
      print ("whoops");
    }
    if (c1.row == c2.row) {
      if (c2.column < c1.column) swap();
    } else {
      if(c2.row < c1.row) swap();
    }
  }
  void swap() {
    Cell temp = c1;
    c1 = c2;
    c2 = temp;
  }

  /** Creates two HexPoints, each consisting of three HexLocations. TODO: copy+paste image
   * reference from paper */
  _calculateVertices() {
    _swapCellsIfNecesary();
    Cell loc1, loc2;
    Cell lefttop = highestOrLeftestCell();
    int offset = lefttop.row % 2 == 0 ? 1 : 0;

    if (direction == EdgeDirection.Vertical) {
      loc1 = new Cell(lefttop.row - 1, offset + lefttop.column - 1);
      loc2 = new Cell(lefttop.row + 1, offset + lefttop.column + 1);
    } else if (_direction == EdgeDirection.SlopeDown) {
      loc1 = new Cell(lefttop.row + 1, offset + lefttop.column);
      loc2 = new Cell(lefttop.row, lefttop.column -1);
    } else if (_direction == EdgeDirection.SlopeUp) {
      loc1 = new Cell(lefttop.row, lefttop.column  + 1);
      loc2 = new Cell(lefttop.row + 1, lefttop.column - 1 + offset);
    }
    v1 = new Vertice(c1, c2, loc1);
    v2 = new Vertice(c1, c2, loc2);
  }
  /** Creates the two [Cell]s this HexSide is primarily represented by */
  _calculateCells() {
    List<Cell> locations = new List<Cell>.from(
      [v1.c1, v1.c2, v1.c3,    v2.c1, v2.c2, v2.c3]);
    c1 = locations[0];
    c2 = locations[5];
  }
  /** Highest if single cell on highest row, when 2 cells on highest row, returns leftest */
  Cell highestOrLeftestCell() => c1;

  /** Returns the direction this side is pointing to */
  int get direction() {
    if (_direction == -1) { // lazy init
      if (c1.row == c2.row)  // both cells are on the same row, vertical edge
        return EdgeDirection.Vertical;

      if (highestOrLeftestCell().row % 2 == 0) {  // even rows
        if (c1.column == c2.column)
          _direction = EdgeDirection.SlopeDown;
        else
          _direction = EdgeDirection.SlopeUp;
      } else { // uneven rows
        if (c1.column == c2.column)
          _direction = EdgeDirection.SlopeUp;
        else
          _direction = EdgeDirection.SlopeDown;
      }
    }
    return _direction;
  }
  // Copyable
  copy([JsonObject data]) =>
      data == null ? new Edge(c1, c2) : new Edge.data(data);
}