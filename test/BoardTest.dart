class BoardTest {
  void test() {
    //test1KMatrixCollisions();
    
    Cell a = new Cell(-1, 0);
    Cell b = new Cell(-1, 1);
    Cell c = new Cell(0,0);
    Vertice v1 = new Vertice(a, b, c);
    Vertice v2 = new Vertice(a, c, b);
    Vertice v3 = new Vertice(b, a, c);
    Vertice v4 = new Vertice(b, c, a);
    Vertice v5 = new Vertice(c, b, a);
    Vertice v6 = new Vertice(c, a, b);
    
    Expect.isTrue(v1.cells[0] == a, "v1[0] cell should be rearranged");
    Expect.isTrue(v1.cells[1] == b, "v1[1] cell should be rearranged");
    Expect.isTrue(v1.cells[2] == c, "v1[2] cell should be rearranged");

    Expect.isTrue(v2.cells[0] == a, "v2[0] cell should be rearranged");
    Expect.isTrue(v2.cells[1] == b, "v2[1] cell should be rearranged");
    Expect.isTrue(v2.cells[2] == c, "v2[2] cell should be rearranged");
    
    Expect.isTrue(v3.cells[0] == a, "v3[0] cell should be rearranged");
    Expect.isTrue(v3.cells[1] == b, "v3[1] cell should be rearranged");
    Expect.isTrue(v3.cells[2] == c, "v3[2] cell should be rearranged");
    
    Expect.isTrue(v4.cells[0] == a, "v4[0] cell should be rearranged");
    Expect.isTrue(v4.cells[1] == b, "v4[1] cell should be rearranged");
    Expect.isTrue(v4.cells[2] == c, "v4[2] cell should be rearranged");
    
    Expect.isTrue(v5.cells[0] == a, "v5[0] cell should be rearranged");
    Expect.isTrue(v5.cells[1] == b, "v5[1] cell should be rearranged");
    Expect.isTrue(v5.cells[2] == c, "v5[2] cell should be rearranged");
    
    Expect.isTrue(v6.cells[0] == a, "v6[0] cell should be rearranged");
    Expect.isTrue(v6.cells[1] == b, "v6[1] cell should be rearranged");
    Expect.isTrue(v6.cells[2] == c, "v6[2] cell should be rearranged");
    
    testUpperRow1();
    
    
    Expect.equals(v1.hashCode(), v2.hashCode(), "v1, v2 equal vertices");
    Expect.equals(v1.hashCode(), v3.hashCode(), "v1, v3 equal vertices");
    Expect.equals(v1.hashCode(), v4.hashCode(), "v1, v4 equal vertices");
    
    Board b1 = new Board(1,2);
    Expect.equals(2, b1.tiles.length, "1x2 board should have 1x2=2 tiles");
    Expect.equals(11, b1.edges.length, "1x2 board should have 11 edges");
    print (b1.vertices);
    Expect.equals(10, b1.vertices.length, "1x2 board should have 10 vertices");
    
    
    Board b2 = new Board(2, 2);
    Expect.equals(4, b2.tiles.length, "2x2 board should have 2x2=4 tiles");
    Expect.equals(19, b2.edges.length, "2x2 board should have 19 edges");
    Expect.equals(16, b2.vertices.length, "2x2 board should have 16 vertices");
    
  }
  test1KMatrixCollisions() {
    Board large = new Board(100,100);
    Expect.equals(10000, large.tiles.length, "10K tiles expected");
  }
  testUpperRow1() {
    Cell a = new Cell(0, 0);
    Cell b = new Cell(1, 0);
    Cell c = new Cell(1, 1);
    Vertice v1 = new Vertice(a, b, c);
    Vertice v2 = new Vertice(a, c, b);
    Vertice v3 = new Vertice(b, a, c);
    Vertice v4 = new Vertice(b, c, a);
    Vertice v5 = new Vertice(c, b, a);
    Vertice v6 = new Vertice(c, a, b);
    
    Expect.isTrue(v1.cells[0] == a, "v1[0] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v1.cells[1] == b, "v1[1] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v1.cells[2] == c, "v1[2] cell should be rearranged (UpperRow1)");

    Expect.isTrue(v2.cells[0] == a, "v2[0] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v2.cells[1] == b, "v2[1] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v2.cells[2] == c, "v2[2] cell should be rearranged (UpperRow1)");
    
    Expect.isTrue(v3.cells[0] == a, "v3[0] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v3.cells[1] == b, "v3[1] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v3.cells[2] == c, "v3[2] cell should be rearranged (UpperRow1)");
    
    Expect.isTrue(v4.cells[0] == a, "v4[0] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v4.cells[1] == b, "v4[1] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v4.cells[2] == c, "v4[2] cell should be rearranged (UpperRow1)");
    
    Expect.isTrue(v5.cells[0] == a, "v5[0] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v5.cells[1] == b, "v5[1] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v5.cells[2] == c, "v5[2] cell should be rearranged (UpperRow1)");
    
    Expect.isTrue(v6.cells[0] == a, "v6[0] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v6.cells[1] == b, "v6[1] cell should be rearranged (UpperRow1)");
    Expect.isTrue(v6.cells[2] == c, "v6[2] cell should be rearranged (UpperRow1)");
    
    Expect.equals(v1.hashCode(), v2.hashCode(), "v1, v2 equal vertices");
    Expect.equals(v1.hashCode(), v3.hashCode(), "v1, v3 equal vertices");
    Expect.equals(v1.hashCode(), v4.hashCode(), "v1, v4 equal vertices");
  }
}
