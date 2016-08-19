package com.cnmengma.webmvc;

import com.cnmengma.domain.Category;
import com.cnmengma.service.CategoryService;
import com.cnmengma.util.GlobalConstants;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class CategoriesViewController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/views/categories", method = RequestMethod.GET)
    public ModelAndView showCategoriesOfFirstPageView() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("categories");
        return mv;
    }

    @RequestMapping(value = "/views/categories/{id}", method = RequestMethod.GET)
    public ModelAndView showCategoryView(@PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Category category = categoryService.findById(id);
        ModelAndView mv = new ModelAndView();
        mv.addObject("category", category);
        mv.setViewName("category");
        return mv;
    }

    @RequestMapping(value = "/views/categories/create", method = RequestMethod.GET)
    public ModelAndView showCreateCategoryView() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        ModelAndView mv = new ModelAndView();
        mv.setViewName("create-category");
        return mv;
    }

}
