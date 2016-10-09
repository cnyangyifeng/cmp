package com.mocktpo.service;

import com.mocktpo.domain.License;
import com.mocktpo.mapper.LicenseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LicenseService {

    @Autowired
    private LicenseMapper mapper;

    public List<License> find(long offset, long limit) {
        return mapper.find(offset, limit);
    }

    public License findById(long licenseId) {
        return mapper.findById(licenseId);
    }

    public List<License> findByEmail(String email) {
        return mapper.findByEmail(email);
    }

    public List<License> findByHardware(String hardware) {
        return mapper.findByHardware(hardware);
    }

    public List<License> findByEmailAndHardware(String email, String hardware) {
        return mapper.findByEmailAndHardware(email, hardware);
    }

    public void create(License license) {
        mapper.create(license);
    }

    public void update(License license) {
        mapper.update(license);
    }

    public void deleteByIds(long[] licenseIds) {
        mapper.deleteByIds(licenseIds);
    }

    public void deleteById(long licenseId) {
        mapper.deleteById(licenseId);
    }

    public List<License> searchByName(String q, long offset, long limit) {
        return mapper.searchByName(q, offset, limit);
    }

    public long findCount() {
        return mapper.findCount();
    }

    public long searchByNameCount(String q) {
        return mapper.searchByNameCount(q);
    }
}
