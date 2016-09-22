package com.cnmengma.service;

import com.cnmengma.domain.Group;
import com.cnmengma.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupMapper groupMapper;

    public List<Group> find(int offset, int limit) {
        return groupMapper.find(offset, limit);
    }

    public Group findById(int groupId) {
        return groupMapper.findById(groupId);
    }

    public void create(Group group) {
        groupMapper.create(group);
    }

    public void update(Group group) {
        groupMapper.update(group);
    }

    public void deleteByIds(int[] groupIds) {
        groupMapper.deleteByIds(groupIds);
    }

    public void deleteById(int groupId) {
        groupMapper.deleteById(groupId);
    }

    public List<Group> searchByName(String q, int offset, int limit) {
        return groupMapper.searchByName(q, offset, limit);
    }

    public int findCount() {
        return groupMapper.findCount();
    }

    public int searchByNameCount(String q) {
        return groupMapper.searchByNameCount(q);
    }

}
