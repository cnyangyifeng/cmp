package com.mocktpo.webmvc;

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

@Controller
public class LicenseViewController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private LicenseService licenseService;

    @RequestMapping(value = "/licenses", method = RequestMethod.GET)
    public ModelAndView showLicensesView() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("licenses");
        return mv;
    }

    @RequestMapping(value = "/licenses/{id}", method = RequestMethod.GET)
    public ModelAndView showLicenseView(@PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        License license = licenseService.findById(id);
        ModelAndView mv = new ModelAndView();
        mv.addObject("license", license);
        mv.setViewName("license");
        return mv;
    }

    @RequestMapping(value = "/licenses/create", method = RequestMethod.GET)
    public ModelAndView showCreateLicenseView() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("create-license");
        return mv;
    }
}
