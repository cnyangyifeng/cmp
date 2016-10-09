package com.mocktpo.service;

import com.mocktpo.BaseTest;
import com.mocktpo.domain.Admin;
import com.mocktpo.util.PasswordUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AdminServiceTest extends BaseTest {

    @Autowired
    private AdminService service;

    @Test
    public void testFind() {
        List<Admin> lz = service.find();
        for (Admin a : lz) {
            System.out.println(a);
        }
    }

    @Test
    public void testCreate() {
        Admin a = new Admin();
        a.setAdminName("yangyifeng");
        a.setPassword(PasswordUtils.encode("itdreamer"));
        service.create(a);
    }

    @Test
    public void testUpdate() {
        Admin a = service.find().get(0);
        a.setPassword(PasswordUtils.encode("itdreamer"));
        service.update(a);
    }

    @Test
    public void testDeleteById() {
        Admin a = service.find().get(0);
        service.deleteById(a.getAdminId());
    }
}
