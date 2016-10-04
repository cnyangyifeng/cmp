package com.mocktpo.mapper;

import com.mocktpo.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {

    List<User> find(@Param("offset") int offset, @Param("limit") int limit);

    User findById(int userId);

    void create(User user);

    void update(User user);

    void deleteByIds(int[] userIds);

    void deleteById(int userId);

    List<User> searchByName(@Param("q") String q, @Param("offset") int offset, @Param("limit") int limit);

    int findCount();

    int searchByNameCount(String q);

}
