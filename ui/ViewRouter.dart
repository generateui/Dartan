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
    if (loc == null || loc == "")
      loc = "#Test";
    
    show(views.filter((View v) => v.id == loc).iterator().next());

  }
  
  show(View view) {
    print(view.id);
    if (activeView != null)
      activeView.div.style.display = "none";
    activeView = view;
    activeView.div.style.display = "block";
    document.queryAll(".active").forEach((Element e) { e.classes.clear(); });
    document.query("${activeView.id}li").classes.add("active");
    view.show();
  }
}
/** Intent-like concept to present the user with UI to perform acertain task */
class View {
  String get id() => "#${Dartan.name(this)}";
  DivElement div;
  View() {
    div = document.query(id);
  }
  show() {
    
  }
}
class Intro extends View { }
class Tldr extends View { }
class Play extends View {
  bool rendered = false;
  Play() {

  }
  show() {
    if (!rendered){
      div = document.query(id);
      Lobby lobby = new Lobby();
      LobbyView lobbyView = new LobbyView(lobby);
      
      div.elements.add(lobbyView.toElement());
      
      User user = new ServerUser();
      
      JoinLobby join = new JoinLobby();
      join.user = user;
      lobby.performAction(join);
      
      SayLobby say = new SayLobby();
      say.message = "jeuj";
      say.user = user;
      lobby.performAction(say);
      
      NewGame newGame = new NewGame();
      newGame.user=user;
      lobby.performAction(newGame);
      
      rendered = true;
    }
  }
} 
