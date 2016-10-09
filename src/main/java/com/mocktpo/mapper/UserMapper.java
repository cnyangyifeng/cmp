package com.mocktpo.mapper;

import com.mocktpo.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {

    List<User> find(@Param("offset") long offset, @Param("limit") long limit);

    User findById(long userId);

    void create(User user);

    void update(User user);

    void deleteByIds(long[] userIds);

    void deleteById(long userId);

    List<User> searchByName(@Param("q") String q, @Param("offset") long offset, @Param("limit") long limit);

    long findCount();

    long searchByNameCount(String q);
}
