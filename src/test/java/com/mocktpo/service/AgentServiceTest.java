package com.mocktpo.service;

import com.mocktpo.BaseTest;
import com.mocktpo.domain.Agent;
import com.mocktpo.util.PasswordUtils;
import com.mocktpo.vo.LoginVo;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AgentServiceTest extends BaseTest {

    @Autowired
    private AgentService service;

    @Test
    public void testFind() {
        List<Agent> lz = service.find();
        for (Agent a : lz) {
            System.out.println(a);
        }
    }

    @Test
    public void testAuth() {
        LoginVo loginVo = new LoginVo();
        loginVo.setMobile("13581651017");
        loginVo.setPassword("one_password");
        System.out.println(service.auth(loginVo));
    }

    @Test
    public void testCreate() {
        Agent a = new Agent();
        a.setAgentName("yangyifeng");
        a.setMobile("13581651017");
        a.setEmail("165239796@qq.com");
        a.setPassword(PasswordUtils.encode("one_password"));
        service.create(a);
    }

    @Test
    public void testUpdate() {
        Agent a = service.find().get(0);
        a.setPassword(PasswordUtils.encode("another_password"));
        service.update(a);
    }

    @Test
    public void testDeleteById() {
        Agent a = service.find().get(0);
        service.deleteById(a.getAgentId());
    }
}
