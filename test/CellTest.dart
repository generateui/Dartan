part of Dartan;

class CellTest {
  static test() {
    Cell c = new Cell(0, 0);
    Expect.equals(6, c.cells.length, "A cell should have 6 neighbours");
    Cell copy = new Cell(0,0);
    Expect.equals(c.hashCode, copy.hashCode, "equal hashes");
    Expect.isTrue(c.equals(copy), "Should be equal instances");
    Expect.isTrue(c == copy, "Should be equal instances");

    Cell c1 = new Cell(1, 0);
    Cell c2 = new Cell(0, 1);
    Expect.isFalse(c1 == c2, "Different cells on ==");
    Expect.isFalse(c1.equals(c2), "Different cells on equals");
    Expect.notEquals(c1.hashCode, c2.hashCode, "Different cells, different hashcode");

    Cell jsonCopy = copyJsonable(c1);
    Expect.equals(c1.hashCode, jsonCopy.hashCode, "equal hashes");
    Expect.isTrue(c1.equals(jsonCopy), "Should be equal instances");
    Expect.isTrue(c1 == jsonCopy, "Should be equal instances");
  }
}
