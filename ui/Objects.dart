part of Dartan;

class Objects extends View {
  bool generated = false;
  Objects() {
    div = document.query(id);
  }
  show() {
    if (!generated) {
      writeSummary();
      writeLists();
      writeResourcesTable();
      generated = true;
    }
  }
  writeSummary() {
    AllSupportedLists groups = new AllSupportedLists();
    int i=0;
    int g = 0;
    for (Iterable<Testable> group in groups){
      g++;
      for (Testable t in group) {
        i++;
      }
    }
    String msg = "Supports <strong>${i}</strong> implementations grouped by <strong>${g}</strong> interfaces";
    document.query('#objectsSummary').innerHTML = msg;
  }
  String writeResourceLists() {
    var supp = [new TownCost(), new DevelopmentCardCost(), new RoadCost(), new CityCost(), new MonopolyableResources()];
    StringBuffer msg = new StringBuffer("""
         <table class="table table-striped table-bordered table-condensed">
         <th>name</th> <th>resources</th> <th>summary</th>""");
    for (ResourceList l in new SupportedResourceLists()) {
      msg.add("""
      <tr>
        <td>${Dartan.link(l)}</td>
        <td>${inlineResourceList(l)}</td>
        <td>${l.toSummary()}</td>
      </tr>""");
    }
    msg.add("</table>");
    return msg.toString();
  }
  String writeTiles() {
    var supp = new SupportedTiles();
    StringBuffer msg = new StringBuffer("""
       <table class="table table-striped table-bordered table-condensed">
         <tr style="height: 5em;">
           <th>name</th>
           <th><div class=condensed>robber</div></th>
           <th><div class=condensed>pirate</div></th>
           <th><div class=condensed>can have port</div></th>
           <th><div class=condensed>can have chit</div></th>
           <th><div class=condensed>included on game board</div></th>
           <th><div class=condensed>has chit</div></th>
           <th><div class=condensed>produces resource</div></th>
         </tr>
    """);
    for (Tile t in supp) {
      msg.add("""
      <tr>
        <td>${Dartan.link(t)}</td>
        <td>${Dartan.toHtml(t.isRobberPlaceable)}</td>
        <td>${Dartan.toHtml(t.isPiratePlaceable)}</td>
        <td>${Dartan.toHtml(t.canHavePort)}</td>
        <td>${Dartan.toHtml(t.canHaveChit)}</td>
        <td>${Dartan.toHtml(t.isPartOfGame)}</td>
        <td>${Dartan.toHtml(t.hasChit)}</td>
        <td>${Dartan.toHtml(t.producesResource)}</td>
      </tr>""");
    }
    msg.add("</table>");
    return msg.toString();
  }
  void writeLists() {
    writeResourceLists();
    StringBuffer msg = new StringBuffer();
    for (Iterable<Testable> t in new AllSupportedLists()) {
      msg.add("""
        <h3>${Dartan.supName(t)}</h3>
      """);
      msg.add(toTable(t));
    }
    msg.add(writeResourceLists());
    msg.add(writeTiles());
    document.query('#resourceLists').innerHTML = msg.toString();
  }
  String inlineResourceList(ResourceList resources) {
    StringBuffer msg = new StringBuffer();
    msg.add("<span>");
    for (String t in resources.types())
      if (resources.hasType(t)) {
        for (Resource r in resources.ofType(t)) {
          msg.add(Dartan.smallIcon(r));
      }
        }
    msg.add("</span>");
    return msg.toString();
  }
  String toTable(Iterable list) {
    StringBuffer msg = new StringBuffer();
    msg.add("""
      <table class="table table-striped table-bordered table-condensed">
        <tr  style="height: 8em;">
          <th>name</th>
          <th><div class=condensed>copyable</div</th>
          <th><div class=condensed>hashable</div></th>
          <th><div class=condensed>observable</div></th>
          <th><div class=condensed>testable</div></th>
        </tr>
    """);
    for (Object l in list) {
      msg.add("""
        <tr>
          <td>${Dartan.smallIcon(l)} ${Dartan.name(l)}</td>
          <td>${Dartan.toHtml(l is Copyable)}</td>
          <td>${Dartan.toHtml(l is Hashable)}</td>
          <td>${Dartan.toHtml(l is Observable)}</td>
          <td>${Dartan.toHtml(l is Testable)}</td>
        </tr>
      """);

    }
    msg.add("""
      </table>
    """);
    return msg.toString();
  }
  void writeResourcesTable() {
    Iterable<Resource> supported = new SupportedResources();

    StringBuffer msg = new StringBuffer();
    msg.add("""
      <table class=\"table table-striped table-bordered table-condensed\">
      <th>name</th> <th>tradeable</th> <th>color</th>""");

    for (Resource r in supported) {
      msg.add(""" <tr>
                    <td>${Dartan.link(r)}</td>
                    <td>${Dartan.toHtml(r.isTradeable)}</td>
                    <td><span style="background-color: ${r.color};text-shadow: 0 0 0.4em white;">${r.color}</span></td>
                  </tr>""");
    }
    msg.add("</table>");
    document.query('#resources').innerHTML = msg.toString();
  }
}
