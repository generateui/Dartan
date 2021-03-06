part of Dartan;

/** Simple cycle presenter for main views. The name of the [View] implementor
is used as unique identification */
class ViewRouter {
  List<View> views;
  View activeView;
  ViewRouter() {
    views = new List.from([
      new Test(),
      new BoardEditor(),
      new Intro(),
      new Tldr(),
      new Play(),
      new Views(),
      new Objects()
    ]);
    for (View view in views) {
      document.query("${view.id}Link").on.click.add((Event e) {
        show(view);
      });
    }
    String loc = window.location.hash;
    if (loc == null || loc == "") {
      loc = "#Intro";
    }

    show(views.filter((View v) => v.id == loc).iterator().next());

  }

  show(View view) {
    print(view.id);
    if (activeView != null) {
      activeView.div.style.display = "none";
    }
    activeView = view;
    activeView.div.style.display = "block";
    document.queryAll(".active").forEach((Element e) { e.classes.clear(); });
    document.query("${activeView.id}li").classes.add("active");
    view.show();
  }
}
/** Intent-like concept to present the user with UI to perform acertain task */
class View {
  String get id => "#${Dartan.name(this)}";
  DivElement div;
  View() {
    div = document.query(id);
  }
  show() {

  }
}
class Intro extends View {
  bool rendered = false;
  show() {
    if (!rendered) {
      rendered=true;

      Element beEl = document.query("#welcomeEditor");
      BoardsViewer bv = new BoardsViewer();
      beEl.children.add(bv.element);
    }
  }
}
class Tldr extends View { }
class Play extends View {
  bool rendered = false;
  Play() {

  }
  show() {
    if (!rendered){
      div = document.query(id);

      ScriptedGameTest sgt = new GameTest();
      GameTester gt = new GameTester.manual(sgt);
      LobbyView lobbyView = new LobbyView(sgt.clientLobby);
      ActsView actsView = new ActsView(gt);
      div.children.add(actsView.element);
      div.children.add(lobbyView.toElement());

      rendered = true;
    }
  }
}
