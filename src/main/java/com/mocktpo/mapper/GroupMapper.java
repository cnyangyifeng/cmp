package com.mocktpo.mapper;

import com.mocktpo.domain.Group;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GroupMapper {

    List<Group> find(@Param("offset") long offset, @Param("limit") long limit);

    Group findById(long groupId);

    void create(Group group);

    void update(Group group);

    void deleteByIds(long[] groupIds);

    void deleteById(long groupId);

    List<Group> searchByName(@Param("q") String q, @Param("offset") long offset, @Param("limit") long limit);

    long findCount();

    long searchByNameCount(String q);
}
