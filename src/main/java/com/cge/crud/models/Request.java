package com.cge.crud.models;

public class Request {
    private String username;
    private String password;

    public Request() {
    }

    public Request(String username, String password) {
        this.username = username;
        this.password = password;
    }


    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
