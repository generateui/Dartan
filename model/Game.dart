class SupportedGames extends ImmutableL<Game> {
  SupportedGames() : super([new Game()]);
}

class Game implements Testable, Observable {
  ObservableHelper observable;
  bool _rules = true;
  
  bool get rules() => _rules;
  void set rules(bool rule) {
    bool old = _rules;
    _rules = rule;
    observable.fire("rules", old, _rules);
  }
  
  Game() :
    observable = new ObservableHelper();
  
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  
  int test() {
    Game g = new Game();
    bool fired = false;
    g.onSetted("rules", (old, newValue) {
      fired = true;
    });
    g.rules = false;
    Expect.isTrue(fired, "Expected rules to be changed");
    
    Game g1 = new Game();
    var l = (old, newValue) {
      Expect.fail("Expected handler to be removed");
    };
    g1.onSetted("rules", l);
    g1.offSetted("rules", l);
    g1.rules = false;
    
    return 2;
  }
}
