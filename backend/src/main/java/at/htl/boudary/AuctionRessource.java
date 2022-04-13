package at.htl.boudary;

import at.htl.ChatSocket;
import at.htl.entity.Auction;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auction")
public class AuctionRessource {

  @GET
  @Path("/running")
  public Response isRunning() {
    return Response.ok(ChatSocket.auction != null).build();
  }


  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public Response addAuction(Auction a) {
    ChatSocket.auction = a;
    return Response.ok().build();
  }

  @GET
  @Produces(MediaType.TEXT_PLAIN)
  public Response stopAuction() {
    if (ChatSocket.auction != null) {
      if (ChatSocket.highestbidder == null && ChatSocket.highestBid == 0.0) {
        String message = "Auction ended! Nobody bidded";
        ChatSocket.auction = null;
        ChatSocket.sessions.clear();
        return Response.ok(message).build();
      } else {
        String message = "Auction ended! Concrats to user " + ChatSocket.highestbidder + "! You obtained " + ChatSocket.auction.name;
        ChatSocket.auction = null;
        ChatSocket.highestBid = 0.0;
        ChatSocket.sessions.clear();
        return Response.ok(message).build();
      }
    } else {
      return Response.status(400).build();
    }

  }

  @GET
  @Path("/auctionDetail")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAuctionDetail() {
      return Response.ok(ChatSocket.auction).build();
  }

  @GET
  @Path("/users")
  @Produces(MediaType.TEXT_PLAIN)
  public Response getUsers() {
    return Response.ok(String.valueOf(ChatSocket.sessions.entrySet().size())).build();
  }
}
