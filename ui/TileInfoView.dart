class TileInfoView {
  Element root;
  TileInfoView(){
    root = document.query("#tileInfoView");
  }
  setTile(Tile t) {
    StringBuffer msg = new StringBuffer();
    msg.add("""
      ${cellHtml(t.cell)}
      <p>neighbours: ${cellHtml(t.cell.cells[0])},  ${cellHtml(t.cell.cells[1])},${cellHtml(t.cell.cells[2])},${cellHtml(t.cell.cells[3])},${cellHtml(t.cell.cells[4])},${cellHtml(t.cell.cells[5])},</p>
      <p></p>
      <p></p>
      <p></p>
    """);
    
    root.innerHTML = msg.toString();
  }
  String cellHtml(Cell c) {
    return "<p>row: ${c.row}, column: ${c.column}</p>";
  }
}