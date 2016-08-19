package com.cnmengma.webmvc;

import com.cnmengma.domain.Category;
import com.cnmengma.domain.Tag;
import com.cnmengma.service.CategoryService;
import com.cnmengma.service.TagService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class TagsViewController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private TagService tagService;
    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/views/tags", method = RequestMethod.GET)
    public ModelAndView toTagsView() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        List<Tag> tags = tagService.findAll();
        List<Category> categories = categoryService.find(0, 10);
        ModelAndView mv = new ModelAndView();
        mv.addObject("tags", tags);
        mv.addObject("categories", categories);
        mv.setViewName("tags");
        return mv;
    }

}
