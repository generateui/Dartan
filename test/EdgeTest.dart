class EdgeTest {
  test() {
    Cell c = new Cell(0,0);
    Cell c1 = new Cell(0,1);
    Edge e = new Edge(c, c1);

    Edge copy = copyJsonable(e);
    Expect.isTrue(copy == e, "Expected equal instance of edge");
    Expect.isTrue(copy.equals(e), "Expected equal instance of edge");
  }
}
