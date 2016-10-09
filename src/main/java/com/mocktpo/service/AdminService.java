package com.mocktpo.service;

import com.mocktpo.domain.Admin;
import com.mocktpo.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminMapper mapper;

    public List<Admin> find() {
        return mapper.find();
    }

    public void create(Admin admin) {
        mapper.create(admin);
    }

    public void update(Admin admin) {
        mapper.update(admin);
    }

    public void deleteById(long adminId) {
        mapper.deleteById(adminId);
    }
}
