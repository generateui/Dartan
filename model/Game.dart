class SupportedGames extends ImmutableL<Game> {
  SupportedGames() : super([new Game()]);
}

class Game implements Testable, Observable {
  ObservableHelper observable;
  static User get serverUser() => new ServerUser();
  
  Date startedDateTime;
  
  Player /* on */ playerOnTurn;
  User host; 
  Board board;
  
  int developmentCardCount = 0; 
  
  ListenableList<User> spectators;
  ListenableList<User> users;
  ListenableList<Action> actions;
  ListenableList<Say> chats;
  ListenableList<Action> queue;
  ListenableList<DevelopmentCard> developmentCards;
  PlayerListMu players;
  ResourceListMu bank;
  
  List<GamePhase> phases;
  Iterator<GamePhase> phasesIterator;
  GamePhase /* on */ currentGamePhase;
  GameStatus /* on */ status;
  ListenableList<Turn> turns;
  Turn /* on */ turn = null;  // init to null, non-null when first time in [TurnsGamePhase]
  
  _init() {
    phases = new List<GamePhase>.from([
      new LobbyPhase(),
      new DetermineFirstPlayerGamePhase(),
      new InitialPlacementGamePhase(),
      new TurnsGamePhase(),
      new EndedGamePhase(),
    ]);
    phasesIterator = phases.iterator();
    status = new Playing();
    turns = new List<Turn>();
    players = new PlayerListMu();
    observable = new ObservableHelper();
    bank = new ResourceListMu();
  }
  
  Game() {
    _init();
  }
  
  start() {
    
  } 
  prepareDevelopmentCards() {
    
  }

  nextPhase() {
    if (phasesIterator.hasNext()) {
      GamePhase old = currentGamePhase;
      currentGamePhase.end(this);
      currentGamePhase = phasesIterator.next();
      currentGamePhase.start(this);
      observable.fire("currentGamePhase", old, currentGamePhase);
    }
  }
  nextTurn() {
    if (currentGamePhase.isTurns) {
      Player oldPlayer = playerOnTurn;
      Turn oldTurn = turn;
      playerOnTurn = players.next(oldPlayer);
      Turn newTurn = new Turn(turns.length+1, playerOnTurn);
      observable.fire("turn", oldTurn, turn);
      observable.fire("playerOnTurn", oldPlayer, playerOnTurn);
    }
  }
  void performAction(Action action) {
    action.perform(this);
    actions.add(action);
  }
  /** Observable */
  void onSetted(String property, PropertyChanged handler) {
    observable.addListener(property, handler);
  }
  void offSetted(String property, PropertyChanged handler) {
    observable.removeListener(property, handler);
  }
  
  test() { }
}
