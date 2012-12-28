part of Dartan;

/** Displays buttons to pick resources and a list showing picked resources */
class ResourcePicker {
  final ResourceList pickable;
  int _maxPicks;
  ResourceListMu _picked;
  Element root;
  DivElement _pickedContainer;
  SpanElement _pickedSummary;
  Map<Resource, ButtonElement> _buttons;
  Map<Resource, ImageElement> _icons;

  int get maxPicks => _maxPicks;

  ResourcePicker(this.pickable, [this._maxPicks]) {
    _picked = new ResourceListMu();
    _buttons = new Map<Resource, ButtonElement>();
    _icons = new Map<Resource, ImageElement>();
    root = document.query("#ResourcePicker");

    Map<String, Resource> buttons = new Map<String, Resource>();

    DivElement buttonContainer = new Element.html("<div class=navbar></div>");
    for (Resource r in pickable) {
      ButtonElement b = new Element.html("""<button class="btn${Dartan.name(r)} PickerButton" type="submit">${Dartan.smallIcon(r)} ${Dartan.name(r)}</button>""");
      b.on.click.add((Event ev) => addResource(r));
      _buttons[r] = b;
      buttonContainer.children.add(b);
    }
    root.children.add(buttonContainer);

    _pickedContainer = new Element.html("<div class=smallIconList></div>");
    root.children.add(_pickedContainer);

    _pickedSummary = new Element.html("<span></span>");
    root.children.add(_pickedSummary);

    updateSummary();
  }

  Element toElement(Resource r) {
    return new Element.html(Dartan.smallIcon(r));
  }
  void addResource(Resource r) {
    Resource copy = r.copy();
    if (_maxPicks == null || _maxPicks > _picked.length) {
      Element el = toElement(copy);
      el.on.click.add((Event ev) => removeResource(copy));
      _icons[copy]= el;
      _pickedContainer.children.add(el);
      _picked.add(copy);
      updateSummary();
    }
    if (_maxPicks != null && _maxPicks == _picked.length) {
      toggleEnabled(false);
    }
  }
  void toggleEnabled(bool enable) {
    for (ButtonElement b in _buttons.values) {
      b.disabled = !enable;
    }
  }
  void removeResource(Resource r) {
    Element toRemove = _icons[r];
    _picked.remove(r);
    _icons.remove(r);
    toRemove.remove();
    updateSummary();
    if (_maxPicks != null) {
      toggleEnabled(true);
    }
  }
  void updateSummary() {
    _pickedSummary.innerHTML = _picked.toSummary();
  }
}
