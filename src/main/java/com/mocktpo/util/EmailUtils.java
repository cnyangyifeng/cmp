package com.mocktpo.util;

import com.mocktpo.domain.License;
import com.mocktpo.util.constants.GlobalConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.internet.MimeMessage;

public class EmailUtils {

    private static final Logger logger = LogManager.getLogger();

    private EmailUtils() {
    }

    public static void sendActivationCode(License lic) {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setHost(GlobalConstants.SMTP_HOST);
        sender.setUsername(GlobalConstants.SMTP_SENDER_EMAIL);
        sender.setPassword(GlobalConstants.SMTP_SENDER_PASSWORD);
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom(GlobalConstants.SMTP_SENDER_EMAIL);
            helper.setBcc(GlobalConstants.SMTP_SENDER_EMAIL);
            helper.setTo(lic.getEmail());
            helper.setSubject(GlobalConstants.LICENSE_EMAIL_SUBJECT);
            helper.setText(getActivationCode(lic));
        } catch (Exception e) {
            e.printStackTrace();
        }
        sender.send(message);
    }

    private static String getActivationCode(License lic) {
        String plain = prepareActivationCode(lic);
        String encoded = ActivationCodeUtils.encode(plain);
        encoded = StringUtils.replace(encoded, "-----BEGIN PGP MESSAGE-----\nVersion: BCPG v1.52", "-----BEGIN MOCKTPO ACTIVATION CODE-----");
        encoded = StringUtils.replace(encoded, "-----END PGP MESSAGE-----", "\n-----END MOCKTPO ACTIVATION CODE-----");
        return encoded;
    }

    private static String prepareActivationCode(License lic) {
        StringBuilder sb = new StringBuilder();
        sb.append("app_name=");
        sb.append(lic.getAppName());
        sb.append("\nedition=");
        sb.append(lic.getEdition());
        sb.append("\nmajor_version=");
        sb.append(lic.getMajorVersion());
        sb.append("\nemail=");
        sb.append(lic.getEmail());
        sb.append("\nhardware=");
        sb.append(lic.getHardware());
        sb.append("\nvalid_through=");
        sb.append(lic.getValidThrough());
        return sb.toString();
    }
}
