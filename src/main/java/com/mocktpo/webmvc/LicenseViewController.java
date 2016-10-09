package com.mocktpo.webmvc;

import com.mocktpo.domain.Agent;
import com.mocktpo.domain.License;
import com.mocktpo.service.LicenseService;
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
public class LicenseViewController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private LicenseService licenseService;

    @RequestMapping(value = "/licenses", method = RequestMethod.GET)
    public ModelAndView showLicensesView(HttpSession session) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            mv.setViewName("licenses");
        }
        return mv;
    }

    @RequestMapping(value = "/licenses/{id}", method = RequestMethod.GET)
    public ModelAndView showLicenseView(HttpSession session, @PathVariable long id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            License license = licenseService.findById(id);
            mv.addObject("license", license);
            mv.setViewName("license");
        }
        return mv;
    }

    @RequestMapping(value = "/licenses/create", method = RequestMethod.GET)
    public ModelAndView showCreateLicenseView(HttpSession session) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            mv.setViewName("login");
        } else {
            mv.setViewName("create-license");
        }
        return mv;
    }
}
