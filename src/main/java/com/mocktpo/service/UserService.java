package com.mocktpo.service;

import com.mocktpo.domain.User;
import com.mocktpo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<User> find(long offset, long limit) {
        return userMapper.find(offset, limit);
    }

    public User findById(long userId) {
        return userMapper.findById(userId);
    }

    public void create(User user) {
        userMapper.create(user);
    }

    public void update(User user) {
        userMapper.update(user);
    }

    public void deleteByIds(long[] userIds) {
        userMapper.deleteByIds(userIds);
    }

    public void deleteById(long userId) {
        userMapper.deleteById(userId);
    }

    public List<User> searchByName(String q, long offset, long limit) {
        return userMapper.searchByName(q, offset, limit);
    }

    public long findCount() {
        return userMapper.findCount();
    }

    public long searchByNameCount(String q) {
        return userMapper.searchByNameCount(q);
    }
}
