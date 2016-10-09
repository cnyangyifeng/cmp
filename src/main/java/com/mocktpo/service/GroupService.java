package com.mocktpo.service;

import com.mocktpo.domain.Group;
import com.mocktpo.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupMapper groupMapper;

    public List<Group> find(long offset, long limit) {
        return groupMapper.find(offset, limit);
    }

    public Group findById(long groupId) {
        return groupMapper.findById(groupId);
    }

    public void create(Group group) {
        groupMapper.create(group);
    }

    public void update(Group group) {
        groupMapper.update(group);
    }

    public void deleteByIds(long[] groupIds) {
        groupMapper.deleteByIds(groupIds);
    }

    public void deleteById(long groupId) {
        groupMapper.deleteById(groupId);
    }

    public List<Group> searchByName(String q, long offset, long limit) {
        return groupMapper.searchByName(q, offset, limit);
    }

    public long findCount() {
        return groupMapper.findCount();
    }

    public long searchByNameCount(String q) {
        return groupMapper.searchByNameCount(q);
    }
}
