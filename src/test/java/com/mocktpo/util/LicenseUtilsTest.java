package com.mocktpo.util;

import org.junit.Test;

public class LicenseUtilsTest {

    @Test
    public void testEncode() {
        String encoded = "encoded.lic";
        String plain = "plain.lic";
        String secring = "secring.gpg";
        String key = "cnyangyifeng";
        String password = "Yyf19851128";
        LicenseUtils.encode(encoded, plain, secring, key, password);
    }

    @Test
    public void testDecode() {
        String encoded = "encoded.lic";
        String pubring = "pubring.gpg";
        LicenseUtils.decode(encoded, null, pubring);
    }

    @Test
    public void testGetEncodedLicense() {
        String plain = "hello";
        System.out.println(LicenseUtils.getEncodedLicense(plain));
    }
}
