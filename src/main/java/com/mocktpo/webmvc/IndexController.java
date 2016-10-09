package com.mocktpo.webmvc;

import com.mocktpo.domain.Agent;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class IndexController {

    private static final Logger logger = LogManager.getLogger();

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView showIndexView(HttpSession session) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            mv.setViewName("index");
        }
        return mv;
    }
}
