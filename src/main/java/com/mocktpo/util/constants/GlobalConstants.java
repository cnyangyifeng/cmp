package com.mocktpo.util.constants;

public interface GlobalConstants {

    String APP_NAME = "MockTPO";

    String COMMUNITY_EDITION = "A";
    String COMMERCIAL_EDITION = "B";
    String DEFAULT_EDITION = COMMUNITY_EDITION;

    int MAJOR_VERSION = 1;

    String DEFAULT_VALID_THROUGH = "99999999";

    //====================

    String SMTP_HOST = "smtp.163.com";
    String SMTP_SENDER_EMAIL = "cnyangyifeng@163.com";
    String SMTP_SENDER_PASSWORD = "yyf262300@BJ";
    String LICENSE_EMAIL_SUBJECT = "MockTPO Activation Code";

    //====================

    String KEYRINGS_DIR = "/keyrings/";
    String GPG_PUBRING_FILE = "pubring.gpg";
    String GPG_SECRING_FILE = "secring.gpg";
    String GPG_KEY = "cnyangyifeng";
    String GPG_PASSWORD = "Yyf19851128";

    //====================

    int PAGINATION_LIMIT = 10;
}
