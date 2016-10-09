package com.mocktpo.api;

import com.mocktpo.domain.Agent;
import com.mocktpo.domain.License;
import com.mocktpo.service.LicenseService;
import com.mocktpo.util.EmailUtils;
import com.mocktpo.util.constants.GlobalConstants;
import com.mocktpo.vo.RequireLicenseVo;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
public class LicenseApiController {

    private static final Logger logger = LogManager.getLogger();

    @Autowired
    private LicenseService service;


    @RequestMapping(value = "/api/licenses/require", method = RequestMethod.POST)
    public ResponseEntity<Void> require(@RequestBody RequireLicenseVo vo) {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        String email = vo.getEmail();
        String hardware = vo.getHardware();
        List<License> lz = service.findByEmail(email);
        if (null != lz && lz.size() > 0) { // email exists, filled in by agents previously.
            License lic = lz.get(0);
            String licensedHardware = lic.getHardware();
            if (StringUtils.isEmpty(licensedHardware)) { // hardware remains blank
                lic.setHardware(hardware);
                Date date = new Date();
                lic.setDateUpdated(date);
                service.update(lic);
                EmailUtils.sendLicense(lic);
                return ResponseEntity.ok().build();
            } else {
                if (licensedHardware.equals(hardware)) { // same hardware registered
                    EmailUtils.sendLicense(lic);
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.status(HttpStatus.CONFLICT).build(); // different hardware registered
                }
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // email never exists
        }
    }

    @RequestMapping(value = "/api/licenses/from/{offset}", method = RequestMethod.GET)
    public List<License> find(HttpSession session, @PathVariable long offset) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            return service.find(offset, GlobalConstants.PAGINATION_LIMIT);
        }
    }

    @RequestMapping(value = "/api/licenses/{id}", method = RequestMethod.GET)
    public License findById(HttpSession session, @PathVariable long id) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            return service.findById(id);
        }
    }

    @RequestMapping(value = "/api/licenses", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(HttpSession session, @RequestBody License license) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            Date date = new Date();
            license.setDateCreated(date);
            license.setDateUpdated(date);
            service.create(license);
        }
    }

    @RequestMapping(value = "/api/licenses/{id}", method = RequestMethod.PATCH)
    public void update(HttpSession session, @RequestBody License license, @PathVariable long id) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            license.setLicenseId(id);
            Date date = new Date();
            license.setDateUpdated(date);
            service.update(license);
        }
    }

    @RequestMapping(value = "/api/licenses", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteByIds(HttpSession session, @RequestBody long[] licenseIds) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            service.deleteByIds(licenseIds);
        }
    }

    @RequestMapping(value = "/api/licenses/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(HttpSession session, @PathVariable long id) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            service.deleteById(id);
        }
    }

    @RequestMapping(value = "/api/search/licenses", method = RequestMethod.GET)
    public List<License> searchDataOfFirstPageByName(HttpSession session, @RequestParam String q) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            return service.searchByName(q, 0, GlobalConstants.PAGINATION_LIMIT);
        }
    }

    @RequestMapping(value = "/api/search/licenses/from/{offset}", method = RequestMethod.GET)
    public List<License> searchByName(HttpSession session, @PathVariable long offset, @RequestParam String q) throws Exception {
        logger.debug("{}.{}() accessed.", this.getClass().getSimpleName(), Thread.currentThread().getStackTrace()[1].getMethodName());
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            return service.searchByName(q, offset, GlobalConstants.PAGINATION_LIMIT);
        }
    }

    @RequestMapping(value = "/api/licenses/count", method = RequestMethod.GET)
    public long findCount(HttpSession session) throws Exception {
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            return service.findCount();
        }
    }

    @RequestMapping(value = "/api/search/licenses/count", method = RequestMethod.GET)
    public long searchByNameCount(HttpSession session, @RequestParam String q) throws Exception {
        Agent agent = (Agent) session.getAttribute("agent");
        if (null == agent) {
            throw new HttpSessionRequiredException("");
        } else {
            return service.searchByNameCount(q);
        }
    }
}
