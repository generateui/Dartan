/** basic command handling */
interface Server {
  Lobby lobby;

  perform(Action action);
  sendToLobbyUsers(Action action);
  sendToGameUsers(GameAction action);

  sendData(String data, int userId);
  receiveData(String data);

  connect();
  disconnect();
  message();
  ping();

  sendToUser(Action a, User u);
  sendToAllUsers();
}
/** Maintain a server state on the client */
class LocalServer implements Server { // LocalGameServer
  Lobby lobby; // Lobby of this server

  ServerGame serverGame; // Server-side counterpart of a game
  Game game; // Game being played/watched
  User user; // User watching botgame, testgame
  Player player; // Player playing botgame
  GameClient gameClient;
  int consecutiveGameId = 0;
  int consecutiveLobbyId = 0;

  LocalServer(this.game) {
    lobby = new Lobby();
  }
  doGame(GameAction ga) {
    if (ga == game.id) {
      try {
        ga.id = consecutiveGameId++;
        serverGame.prepare(ga);
        serverGame.performServer(ga);
        serverGame.perform(ga);
      } catch (Exception ex) {
        print("Action exec fail at lokcalServer: ${ga.toText()}");
        throw ex;
      }
    } else {
      throw new Exception("Game with id ${ga.gameId} not found");
    }
  }
  doLobby(LobbyAction la) {
    try {
      la.id = consecutiveLobbyId++;
      la.prepareLobby(lobby);
      la.performAtLobbyServer(lobby);
      la.update(lobby);
      lobby.actions.add(la);
    } catch(Exception ex) {
      print ("Error exec LobbyAction at LocalServer");
      throw ex;
    }
  }

  perform(Action action) {}
  performGame(GameAction ga) { }

  sendData(String data, int userId) {
    // For user... we only have one here
    gameClient.receive(data);
  }
  receiveData(String data) {
    Jsonable jso;
    JsonObject obj;
    try {
      obj = new JsonObject.fromJsonString(data);
      jso = new Jsonable.data(obj);
    } catch (Exception ex) {
      print("merp");
    }
    if (jso != null) {
      if (jso is Action) {
        Action action = jso;
        if (jso.isGame) {
          GameAction ga = action;
          doGame(ga); // update local state
          sendToUser(ga, user); // broadcast back to the clients, so they'll update
        }
        if (jso.isLobby) {
          LobbyAction la = action;
          doLobby(la);
          sendToUser(la, user);
        }
      }
    }
  }

  sendToLobbyUsers(Action action) {}
  sendToGameUsers(GameAction action) {}

  connect() {  }
  disconnect() {}
  message() {}
  ping() {}

  sendToUser(Action a, User u) {
    String s = JSON.stringify(a.data);
    sendData(s, u.id);
  }
  sendToAllUsers() {}
}
class GameClient {
  Server server; // thing to talk strings with
  Lobby lobby;   // Clientside lobby state
  Game /* on */ game; // Current game being played, if one
  Player /* on */ player;

  User user;

  GameClient() {
    lobby = new Lobby();
  }
  connect() {
    server.connect();
  }
  sendAction(Action action) {
    send(action);
  }
  disconnect() { }
  ping() { }
  send(Action action) {
    String strAction = JSON.stringify(action.data);
    print("**${strAction}**");
    server.receiveData(strAction);
  }
  receive(String data) {
    JsonObject obj = new JsonObject.fromJsonString(data);
    Jsonable json = new Jsonable.data(obj);
    if (json != null) {
      if (json is Action) {
        Action a = json;
        if (a.isLobby) {
          LobbyAction la = a;
          la.prepareLobby(lobby);
          la.update(lobby);
          lobby.actions.add(la);
        }
        if (a.isGame) {
          GameAction ga = a;
          ga.prepare(game);
          ga.perform(game);
        }
      }
    }
  }
}

