package com.mocktpo.mapper;

import com.mocktpo.domain.License;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LicenseMapper {

    List<License> find(@Param("offset") long offset, @Param("limit") long limit);

    License findById(long licenseId);

    List<License> findByEmail(@Param("email") String email);

    List<License> findByHardware(@Param("hardware") String hardware);

    List<License> findByEmailAndHardware(@Param("email") String email, @Param("hardware") String hardware);

    void create(License license);

    void update(License license);

    void deleteByIds(long[] licenseIds);

    void deleteById(long licenseId);

    List<License> searchByName(@Param("q") String q, @Param("offset") long offset, @Param("limit") long limit);

    long findCount();

    long searchByNameCount(String q);
}
