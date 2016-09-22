package com.cnmengma.service;

import com.cnmengma.domain.User;
import com.cnmengma.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<User> find(int offset, int limit) {
        return userMapper.find(offset, limit);
    }

    public User findById(int userId) {
        return userMapper.findById(userId);
    }

    public void create(User user) {
        userMapper.create(user);
    }

    public void update(User user) {
        userMapper.update(user);
    }

    public void deleteByIds(int[] userIds) {
        userMapper.deleteByIds(userIds);
    }

    public void deleteById(int userId) {
        userMapper.deleteById(userId);
    }

    public List<User> searchByName(String q, int offset, int limit) {
        return userMapper.searchByName(q, offset, limit);
    }

    public int findCount() {
        return userMapper.findCount();
    }

    public int searchByNameCount(String q) {
        return userMapper.searchByNameCount(q);
    }

}
