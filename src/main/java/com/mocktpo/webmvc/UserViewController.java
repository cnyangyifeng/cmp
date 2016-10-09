package com.mocktpo.webmvc;

import com.mocktpo.domain.Agent;
import com.mocktpo.domain.User;
import com.mocktpo.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class UserViewController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ModelAndView showUsersView(HttpSession session) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            mv.setViewName("users");
        }
        return mv;
    }

    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
    public ModelAndView showUserView(HttpSession session, @PathVariable long id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        User user = userService.findById(id);
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            mv.addObject("user", user);
            mv.setViewName("user");
        }
        return mv;
    }

    @RequestMapping(value = "/users/create", method = RequestMethod.GET)
    public ModelAndView showCreateUserView(HttpSession session) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            mv.setViewName("create-user");
        }
        return mv;
    }
}
