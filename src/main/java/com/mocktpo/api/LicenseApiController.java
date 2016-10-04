package com.mocktpo.api;

import com.mocktpo.domain.License;
import com.mocktpo.service.LicenseService;
import com.mocktpo.util.GlobalConstants;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class LicenseApiController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private LicenseService licenseService;

    @RequestMapping(value = "/api/licenses", method = RequestMethod.GET)
    public List<License> findDataOfFirstPage() {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return licenseService.find(0, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/licenses/from/{offset}", method = RequestMethod.GET)
    public List<License> find(@PathVariable int offset) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return licenseService.find(offset, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/licenses/{id}", method = RequestMethod.GET)
    public License findById(@PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return licenseService.findById(id);
    }

    @RequestMapping(value = "/api/licenses", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody License license) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Date date = new Date();
        license.setDateCreated(date);
        license.setDateUpdated(date);
        licenseService.create(license);
    }

    @RequestMapping(value = "/api/licenses/{id}", method = RequestMethod.PATCH)
    public void update(@RequestBody License license, @PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        license.setLicenseId(id);
        licenseService.update(license);
    }

    @RequestMapping(value = "/api/licenses", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByIds(@RequestBody int[] licenseIds) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        licenseService.deleteByIds(licenseIds);
    }

    @RequestMapping(value = "/api/licenses/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable int id) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        licenseService.deleteById(id);
    }

    @RequestMapping(value = "/api/search/licenses", method = RequestMethod.GET)
    public List<License> searchDataOfFirstPageByName(@RequestParam String q) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return licenseService.searchByName(q, 0, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/search/licenses/from/{offset}", method = RequestMethod.GET)
    public List<License> searchByName(@PathVariable int offset, @RequestParam String q) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        return licenseService.searchByName(q, offset, GlobalConstants.PAGINATION_LIMIT);
    }

    @RequestMapping(value = "/api/licenses/count", method = RequestMethod.GET)
    public int findCount() {
        return licenseService.findCount();
    }

    @RequestMapping(value = "/api/search/licenses/count", method = RequestMethod.GET)
    public int searchByNameCount(@RequestParam String q) {
        return licenseService.searchByNameCount(q);
    }

}
