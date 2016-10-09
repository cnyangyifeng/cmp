package com.mocktpo.service;

import com.mocktpo.BaseTest;
import com.mocktpo.domain.License;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class LicenseServiceTest extends BaseTest {

    private String email = "165239796@qq.com";
    private String hardware = "62082dc5-d8c4-3eb2-a507-211bc3d0832e";

    @Autowired
    private LicenseService service;

    @Test
    public void testFind() {
        List<License> lz = service.find(0, 10);
        for (License l : lz) {
            System.out.println(l);
        }
    }

    @Test
    public void testFindByEmail() {
        System.out.println(service.findByEmail(email));
    }

    @Test
    public void testFindByHardware() {
        System.out.println(service.findByHardware(hardware));
    }

    @Test
    public void testFindByEmailAndHardware() {
        System.out.println(service.findByEmailAndHardware(email, hardware));
    }

    @Test
    public void testCreate() {
        License l = new License();
        l.setEmail(email);
        // Hardware may be left as blank
        Date date = new Date();
        l.setDateCreated(date);
        l.setDateUpdated(date);
        service.create(l);
    }

    @Test
    public void testUpdate() {
        License l = service.find(0, 10).get(0);
        l.setEmail("another_email@whatever.com");
        service.update(l);
    }

    @Test
    public void testDeleteById() {
        License l = service.find(0, 10).get(0);
        service.deleteById(l.getLicenseId());
    }
}
