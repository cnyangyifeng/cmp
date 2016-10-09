package com.mocktpo.domain;

import java.io.Serializable;

public class Agent implements Serializable {

    private static final long serialVersionUID = 1L;

    private long agentId;
    private String agentName;
    private String mobile;
    private String email;
    private String password;

    public long getAgentId() {
        return agentId;
    }

    public void setAgentId(long agentId) {
        this.agentId = agentId;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "{adminId:" + this.getAgentId() + ";adminName:" + this.getAgentName() + ";mobile:" + this.getMobile()  + ";password:" + this.getPassword() + "}";
    }
}
