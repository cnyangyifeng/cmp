package com.mocktpo.domain;

import com.mocktpo.util.constants.GlobalConstants;

import java.io.Serializable;
import java.util.Date;

public class License implements Serializable {

    private static final long serialVersionUID = 1L;

    private long licenseId;
    private String appName = GlobalConstants.APP_NAME;
    private String edition = GlobalConstants.DEFAULT_EDITION;
    private int majorVersion = GlobalConstants.MAJOR_VERSION;
    private String email;
    private String hardware;
    private String validThrough = GlobalConstants.DEFAULT_VALID_THROUGH;
    private Date dateCreated;
    private Date dateUpdated;

    public long getLicenseId() {
        return licenseId;
    }

    public void setLicenseId(long licenseId) {
        this.licenseId = licenseId;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public int getMajorVersion() {
        return majorVersion;
    }

    public void setMajorVersion(int majorVersion) {
        this.majorVersion = majorVersion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHardware() {
        return hardware;
    }

    public void setHardware(String hardware) {
        this.hardware = hardware;
    }

    public String getValidThrough() {
        return validThrough;
    }

    public void setValidThrough(String validThrough) {
        this.validThrough = validThrough;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    @Override
    public String toString() {
        return "{licenseId:" + this.getLicenseId() + ";appName:" + this.getAppName() + ";edition:" + this.getEdition() + ";majorVersion:" + this.getMajorVersion() + ";email:" + this.getEmail() + ";hardware:" + this.getHardware() + ";validThrough:" + this.getValidThrough() + ";dateCreated:" + this.getDateCreated() + ";dateUpdated:" + this.getDateUpdated() + "}";
    }
}
