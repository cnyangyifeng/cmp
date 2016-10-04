package com.mocktpo.service;

import com.mocktpo.domain.License;
import com.mocktpo.mapper.LicenseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LicenseService {

    @Autowired
    private LicenseMapper licenseMapper;

    public List<License> find(int offset, int limit) {
        return licenseMapper.find(offset, limit);
    }

    public License findById(int licenseId) {
        return licenseMapper.findById(licenseId);
    }

    public void create(License license) {
        licenseMapper.create(license);
    }

    public void update(License license) {
        licenseMapper.update(license);
    }

    public void deleteByIds(int[] licenseIds) {
        licenseMapper.deleteByIds(licenseIds);
    }

    public void deleteById(int licenseId) {
        licenseMapper.deleteById(licenseId);
    }

    public List<License> searchByName(String q, int offset, int limit) {
        return licenseMapper.searchByName(q, offset, limit);
    }

    public int findCount() {
        return licenseMapper.findCount();
    }

    public int searchByNameCount(String q) {
        return licenseMapper.searchByNameCount(q);
    }

}
