package com.cnmengma.api;

import com.cnmengma.domain.Category;
import com.cnmengma.service.CategoryService;
import com.cnmengma.util.GlobalConstants;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoriesController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/api/categories", method = RequestMethod.GET)
    public List<Category> findDataOfFirstPage() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return categoryService.find(0, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/categories/from/{offset}", method = RequestMethod.GET)
    public List<Category> find(@PathVariable int offset) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return categoryService.find(offset, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/categories/{id}", method = RequestMethod.GET)
    public Category findById(@PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return categoryService.findById(id);
    }

    @RequestMapping(value = "/api/categories", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody Category category) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        categoryService.create(category);
    }

    @RequestMapping(value = "/api/categories/{id}", method = RequestMethod.PATCH)
    public void update(@RequestBody Category category, @PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        category.setCategoryId(id);
        categoryService.update(category);
    }

    @RequestMapping(value = "/api/categories", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByIds(@RequestBody int[] categoryIds) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        categoryService.deleteByIds(categoryIds);
    }

    @RequestMapping(value = "/api/categories/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        categoryService.deleteById(id);
    }

    @RequestMapping(value = "/api/search/categories", method = RequestMethod.GET)
    public List<Category> searchDataOfFirstPageByName(@RequestParam String q) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return categoryService.searchByName(q, 0, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/search/categories/from/{offset}", method = RequestMethod.GET)
    public List<Category> searchByName(@PathVariable int offset, @RequestParam String q) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return categoryService.searchByName(q, offset, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/categories/count", method = RequestMethod.GET)
    public int findCount() {
        return categoryService.findCount();
    }

    @RequestMapping(value = "/api/search/categories/count", method = RequestMethod.GET)
    public int searchByNameCount(@RequestParam String q) {
        return categoryService.searchByNameCount(q);
    }

}
