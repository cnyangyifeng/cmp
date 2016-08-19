package com.cnmengma.webmvc;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ResetPasswordController {

    private static final Logger logger = LogManager.getLogger();

    @RequestMapping(value = "/reset-password", method = RequestMethod.GET)
    public ModelAndView view() {
        logger.debug("{} accessed.", this.getClass().getSimpleName());

        ModelAndView mv = new ModelAndView();
        mv.setViewName("reset-password");

        return mv;
    }

}
