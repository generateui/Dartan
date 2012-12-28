part of Dartan;

class VerticeTest {
  test() {
    Cell c1 = new Cell(0,0);
    Cell c2 = new Cell(1,0);
    Cell c3 = new Cell(1,1);
    Vertice v1 = new Vertice(c1, c2, c3);
    Vertice copy = copyJsonable(v1);
    Expect.isTrue(copy == v1, "Expected equal instance of vertice");
    Expect.isTrue(copy.equals(v1), "Expected equal instance of vertice");
  }
}
