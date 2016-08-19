package com.cnmengma.service;

import com.cnmengma.domain.Tag;
import com.cnmengma.mapper.TagMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    private TagMapper tagMapper;

    public List<Tag> findAll() {
        return tagMapper.findAll();
    }

}
