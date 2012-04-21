/** A location to put a tile 
   also called coordinate, point, coord */
class Cell implements Hashable, Testable {
  int row, column;  // The meat of it all!
  List<Cell> _cells;
  List<Vertice> _vertices;
  List<Edge> _edges;
  
  // TODO: delegate to hashmap lookup
  Cell(this.row, this.column);

  String toText() => "[${row}, ${column}]";
  bool equals(Cell other) => row == other.row && column == other.column;
  
  bool operator ==(other) { 
    if (other === this) 
      return true;
    if (other == null)
      return false;
    return this.equals(other);
  }
  Edge edgeByDegrees(int verticePosition) => new Edge(cells[verticePosition], this);

  int hashCode() {
    int hash = 1;
    hash = hash * 31 + row;
    hash = hash * 31 + column;
    hash = hash * 31; 
    return hash;
  }
  
  /** Returns a list containing 6 HexLocations starting with deg0 and ending with deg300 */
  List<Cell> get cells() {
    if (_cells == null) { // Lazy init
      _cells = new List<Cell>();
      int offset = row % 2 == 0 ? 0 : -1;  // offset for uneven rows
      _cells.add(new Cell(row - 1, column + 1 + offset));
      _cells.add(new Cell(row, column +1));
      _cells.add(new Cell(row + 1, column + 1  + offset));
      _cells.add(new Cell(row + 1, column + offset));
      _cells.add(new Cell(row, column - 1));
      _cells.add(new Cell(row - 1, column + offset));
    }
    return _cells;
  }
  /** Neighbouring 6 vertices of this cell. */
  List<Vertice> get vertices() {
    if (_vertices == null) { // Lazy init
       _vertices = new List<Vertice>();
      
       for (int i = 0; i < 6; i++) {
         int j = i == 0 ? 5 : i - 1;
         _vertices.add(new Vertice(this, cells[j], cells[i]));
       }
    }
    return _vertices;
  }
  
  void test() {
    CellTest.test();
  }
  /** Returns all 6 edges of this cell. */
  List<Edge> get edges() {
    if (_edges == null) { // lazy init
      _edges = new List<Edge>();
      for (Cell n in cells)
        _edges.add(new Edge(this, n));
    }
    return _edges;
  }
}