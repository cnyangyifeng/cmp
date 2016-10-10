package com.mocktpo.util;

import org.junit.Test;

public class ActivationCodeUtilsTest {

    @Test
    public void testEncode() {
        String plain = "plain.lic";
        String encoded = "encoded.lic";
        ActivationCodeUtils.encode(encoded, plain);
    }

    @Test
    public void printActivationCode() {
        String plain = "hello, world.";
        System.out.println(ActivationCodeUtils.encode(plain));
    }

    @Test
    public void testDecode() {
        String encoded = "encoded.lic";
        ActivationCodeUtils.decode(encoded, null);
    }
}
