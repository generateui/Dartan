/** Communicate with a server */
interface GameServer {
  send(Action action);
  Lobby lobby;
}
interface Server {

}
/** Play a game in the browser */
class LocalServer implements GameServer {
  Game game;
  ServerGame serverGame;
  Lobby lobby;
  LocalServer(this.game) {
    serverGame  = new ServerGame(game);
  }
  send(Action action) {
    if (action is GameAction) {
      serverGame.prepare(action);
      serverGame.perform(action);
    }
  }
}