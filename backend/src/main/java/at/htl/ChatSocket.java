package at.htl;

import at.htl.entity.Auction;
import at.htl.entity.Person;

import javax.enterprise.context.ApplicationScoped;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
@ServerEndpoint("/bid/{username}/{spendinglimit}")
public final class ChatSocket {

    public static final Map<Person, Session> sessions = new ConcurrentHashMap<>();
    public static Double highestBid = 0.0;
    public static Auction auction = null;
    public static String highestbidder = null;

    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username, @PathParam("spendinglimit") Double spendinglimit) {
        if(auction != null) {
            boolean included = false;
            Person person = new Person(username, spendinglimit);
            for (Map.Entry<Person, Session> entry : sessions.entrySet()) {
                if (entry.getKey().hashCode() == person.hashCode()) {
                    included = true;
                }
            }

            if (!included) {
                sessions.put(new Person(username, spendinglimit), session);
                broadcast("User " + username + " joined with limit: " + spendinglimit);
            }
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("username") String username, @PathParam("spendinglimit") Double spendinglimit) {
        if(auction != null) {
            Person person = new Person(username, spendinglimit);
            System.out.println(person.hashCode());
            for (Map.Entry<Person, Session> entry : sessions.entrySet()) {
                if (entry.getKey().hashCode() == person.hashCode()) {
                    sessions.remove(entry.getKey());
                    broadcast("Bidder " + username + " left the auction");
                    break;
                }
            }
        }
    }

    @OnError
    public void onError(Session session, @PathParam("username") String username, @PathParam("spendinglimit") Double spendinglimit ,Throwable throwable) {
        if(auction != null) {
            Person person = new Person(username, spendinglimit);
            for (Map.Entry<Person, Session> entry : sessions.entrySet()) {
                if (entry.getKey().hashCode() == person.hashCode()) {
                    sessions.remove(entry.getKey());
                    broadcast("Bidder " + username + " left with an error");
                    break;
                }
            }
        }
    }

    @OnMessage
    public void onMessage(String message, @PathParam("username") String username, @PathParam("spendinglimit") Double spendinglimit ) {
        if(auction != null) {
            if (message.equalsIgnoreCase("_ready_")) {
                broadcast("User " + username + " joined with limit: " + spendinglimit);
            } else {//bid
                if (Double.parseDouble(message) > highestBid) {
                    if (Double.parseDouble(message) <= spendinglimit && Double.parseDouble(message) >= auction.startprice) {
                        highestBid = Double.parseDouble(message);
                        highestbidder = username;
                        broadcast(">> " + username + " bid: " + message);
                    }
                }
            }
        }
    }

    private void broadcast(String message) {
        sessions.values().forEach(s -> {
            s.getAsyncRemote().sendObject(message, result -> {
                if (result.getException() != null) {
                    System.out.println("Unable to send message: " + result.getException());
                }
            });
        });
    }
}
