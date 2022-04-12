package at.htl.entity;

public class Auction {
        public String name;
        public String desc;
        public Double startprice;

    public Auction() {
    }

    public Auction(String desc, Double startprice) {
        this.desc = desc;
        this.startprice = startprice;
    }
}
