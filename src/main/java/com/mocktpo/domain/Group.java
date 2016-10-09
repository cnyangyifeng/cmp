package com.mocktpo.domain;

import java.io.Serializable;

public class Group implements Serializable {

    private static final long serialVersionUID = 1L;

    private long groupId;
    private String groupName;
    private long serialNumber;

    public long getGroupId() {
        return groupId;
    }

    public void setGroupId(long groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public long getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(long serialNumber) {
        this.serialNumber = serialNumber;
    }

    @Override
    public String toString() {
        return "{groupId:" + this.getGroupId() + ";groupName:" + this.getGroupName() + ";serialNumber:" + this.getSerialNumber() + "}";
    }
}
