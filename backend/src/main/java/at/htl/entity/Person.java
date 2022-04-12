package at.htl.entity;

public class Person {
    //public static Integer count = 0;
    public String username;
    public Double spendinglimit;

    public Person() {
        //count++;
    }

    public Person(String username, Double spendinglimit) {
        this();
        this.username = username;
        this.spendinglimit = spendinglimit;
    }

    @Override
    public int hashCode() {
        //bei db -> id
        //return count;
        int hash = 0;
        for (char c: username.toCharArray()) {
            hash += Character.getNumericValue(c);
        }
        hash += spendinglimit.intValue();
        return hash;
    }
}
