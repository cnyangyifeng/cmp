package com.mocktpo.mapper;

import com.mocktpo.domain.Admin;

import java.util.List;

public interface AdminMapper {

    List<Admin> find();

    void create(Admin admin);

    void update(Admin admin);

    void deleteById(long adminId);
}
