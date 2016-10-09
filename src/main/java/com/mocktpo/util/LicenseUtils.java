package com.mocktpo.util;

import com.mocktpo.util.constants.GlobalConstants;
import com.verhas.licensor.License;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;

public class LicenseUtils {

    protected static final Logger logger = LogManager.getLogger();

    private LicenseUtils() {
    }

    public static void encode(String out, String plain, String secring, String key, String password) {
        String path = LicenseUtils.class.getResource(GlobalConstants.KEYRINGS_DIR).getPath();
        try {
            File f = new File(path + out);
            boolean created = f.createNewFile();
            OutputStream os = new FileOutputStream(f);
            os.write((new License().setLicense(new File(path + plain)).loadKey(path + secring, key).encodeLicense(password)).getBytes("utf-8"));
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void decode(String encoded, String plain, String pubring) {
        String path = LicenseUtils.class.getResource(GlobalConstants.KEYRINGS_DIR).getPath();
        try {
            final License license;
            if ((license = new License()).loadKeyRing(path + pubring, null).setLicenseEncodedFromFile(path + encoded).isVerified()) {
                OutputStream os = System.out;
                if (null != plain) {
                    File f = new File(path + plain);
                    boolean created = f.createNewFile();
                    logger.debug("A new plain license file created:" + created);
                    os = new FileOutputStream(f);
                }
                Writer w = new OutputStreamWriter(os, "utf-8");
                w.write("-----BEGIN PGP MESSAGE-----\n");
                w.flush();
                license.dumpLicense(os);
                os.flush();
                w.write("-----END PGP MESSAGE-----\n\n");
                w.write("Encoding license key id=" + license.getDecodeKeyId() + "L\n\n");
                w.write("-----BEGIN KEYRING DIGEST-----\n");
                w.write(license.dumpPublicKeyRingDigest());
                w.write("-----END KEYRING DIGEST-----\n");
                w.close();
                os.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getEncodedLicense(String plain) {
        String path = LicenseUtils.class.getResource(GlobalConstants.KEYRINGS_DIR).getPath();
        try {
            License lic = new License();
            lic.setLicense(plain);
            return lic.loadKey(path + GlobalConstants.GPG_SECRING_FILE, GlobalConstants.GPG_KEY).encodeLicense(GlobalConstants.GPG_PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
