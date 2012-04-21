/* Displays a target ResoucesMu using icons from a Resource */
class ResourcesView {
  DivElement _root;
  DivElement _imgs;
  SpanElement _summary;
  ResourceListMu _res;
  HashMap<Resource, Element> _elements;
  
  ResourcesView(ResourceListMu res, DivElement r) {
    _res = res;
    _root = r;
    _summary = new Element.html("""<span class="smallIconList"></span>""");
    _imgs = new Element.html("""<div class="smallIconList"></div>""");
    _root.elements.add(_summary);
    _root.elements.add(_imgs);
    _elements = new HashMap<Resource, Element>();
    
    for (Resource r in res) 
      _add(r);
    
    res.onRemoved((Resource e) {
      Element elToRemove = _elements[e];
      Expect.isNotNull(elToRemove);
      elToRemove.remove();
    });
    res.onAdded(_add);
    res.onChanged(() { 
      _summary.innerHTML = _res.toSummary(); 
    });
  }
  
  _add(Resource r) {
    ImageElement el = new Element.html(Dartan.smallIcon(r));
    _imgs.elements.add(el);
    _elements[r]=el;
  }
}