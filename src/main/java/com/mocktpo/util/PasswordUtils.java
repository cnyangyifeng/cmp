package com.mocktpo.util;

import sun.misc.BASE64Encoder;

import java.security.MessageDigest;

public class PasswordUtils {

    private PasswordUtils() {
    }

    public static String encode(String plain) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            BASE64Encoder encoder = new BASE64Encoder();
            return encoder.encode(md.digest(plain.getBytes("utf-8")));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
