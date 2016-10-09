package com.mocktpo.api;

import com.mocktpo.domain.Agent;
import com.mocktpo.service.AgentService;
import com.mocktpo.vo.LoginVo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;

import javax.servlet.http.HttpSession;

@RestController
public class AgentApiController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private AgentService service;

    @RequestMapping(value = "/api/agents/auth", method = RequestMethod.POST)
    public void auth(HttpSession session, @RequestBody LoginVo loginVo) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = service.auth(loginVo);
        if (null == agent) {
            throw new HttpServerErrorException(HttpStatus.UNAUTHORIZED);
        } else {
            session.setAttribute("agent", agent);
        }
    }

    @RequestMapping(value = "/api/agents/auth", method = RequestMethod.DELETE)
    public void logout(HttpSession session) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        if (null == session) {
            throw new HttpSessionRequiredException("");
        } else {
            session.removeAttribute("agent");
        }
    }
}
