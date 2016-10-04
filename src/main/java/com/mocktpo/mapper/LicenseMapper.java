package com.mocktpo.mapper;

import com.mocktpo.domain.License;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LicenseMapper {

    List<License> find(@Param("offset") int offset, @Param("limit") int limit);

    License findById(int licenseId);

    void create(License license);

    void update(License license);

    void deleteByIds(int[] licenseIds);

    void deleteById(int licenseId);

    List<License> searchByName(@Param("q") String q, @Param("offset") int offset, @Param("limit") int limit);

    int findCount();

    int searchByNameCount(String q);

}
