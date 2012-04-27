interface GameServer {
  send(Action action);
}
/** Play a game in the browser */
class LocalServer implements GameServer {
  Game game;
  ServerGame serverGame;
  LocalServer() {
    serverGame  = new ServerGame(game);
  }
  send(Action action) {
    if (action.isGame) {
      serverGame.prepare(action);
      serverGame.perform(action);
      
    }
  }
}