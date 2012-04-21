/** Displays all known views which are allowed to be tested in a sandbox */
class Views extends View {
  bool isRendered = false;
  Views() {
    div = document.query(id);
  }
  show() {
    if (!isRendered) {
      //makeTestPicker();
    }
  }
  void makeTestPicker() {
    div = new Element.html("<div id=testPicker>");
    document.body.elements.add(div);
    new ResourcePicker(new MonopolyableResources(), 2);
    ResourceListMu mu = new ResourceListMu();
    new ResourcesView(mu, div);
    
    for (ResourceList l in new SupportedResourceLists()) {
      ButtonElement addListButton = new Element.html("<button>${Dartan.smallIcon(l)} ${Dartan.name(l)}</button>");
      addListButton.on.click.add((Event e) {
        l.forEach((f) { mu.add(f.copy()); });
      });
      div.elements.add(addListButton);
    }
    ButtonElement removeRandom = new Element.html("<button><span class=failure>${Dartan.noCheck}</span> Remove</button>");
    removeRandom.on.click.add((Event e) {
      mu.removeLast();
    });
    mu.onChanged(() { removeRandom.disabled = mu.length == 0; });
    div.elements.add(removeRandom);
    document.query("#resourcesView").elements.add(div);
  }
}
