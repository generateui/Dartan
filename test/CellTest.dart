class CellTest {
  static test() {
    Cell c = new Cell(0, 0);
    Expect.equals(6, c.cells.length, "Each cell should have 6 neighbours");
    //Expect.equals(new Cell(-1, 0), c.cells[0]);
    Cell copy = new Cell(0,0);
    Expect.equals(c.hashCode(), copy.hashCode(), "equal hashes");
    //Expect.equals(c, c2, "Should be equal instances");
    Expect.isTrue(c.equals(copy), "Should be equal instances");
    Expect.isTrue(c == copy, "Should be equal instances");
    
    Cell c1 = new Cell(1, 0);
    Cell c2 = new Cell(0, 1);
    Expect.isFalse(c1 == c2, "Different cells on ==");
    Expect.isFalse(c1.equals(c2), "Different cells on equals");
    Expect.notEquals(c1.hashCode(), c2.hashCode(), "Different cells, different hashcode");
  }
}