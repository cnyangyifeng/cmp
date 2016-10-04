package com.mocktpo.mapper;

import com.mocktpo.domain.Group;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GroupMapper {

    List<Group> find(@Param("offset") int offset, @Param("limit") int limit);

    Group findById(int groupId);

    void create(Group group);

    void update(Group group);

    void deleteByIds(int[] groupIds);

    void deleteById(int groupId);

    List<Group> searchByName(@Param("q") String q, @Param("offset") int offset, @Param("limit") int limit);

    int findCount();

    int searchByNameCount(String q);

}
