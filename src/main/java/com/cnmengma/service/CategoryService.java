package com.cnmengma.service;

import com.cnmengma.domain.Category;
import com.cnmengma.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    public List<Category> find(int offset, int limit) {
        return categoryMapper.find(offset, limit);
    }

    public Category findById(int categoryId) {
        return categoryMapper.findById(categoryId);
    }

    public void create(Category category) {
        categoryMapper.create(category);
    }

    public void update(Category category) {
        categoryMapper.update(category);
    }

    public void deleteByIds(int[] categoryIds) {
        categoryMapper.deleteByIds(categoryIds);
    }

    public void deleteById(int categoryId) {
        categoryMapper.deleteById(categoryId);
    }

    public List<Category> searchByName(String q, int offset, int limit) {
        return categoryMapper.searchByName(q, offset, limit);
    }

    public int findCount() {
        return categoryMapper.findCount();
    }

    public int searchByNameCount(String q) {
        return categoryMapper.searchByNameCount(q);
    }

}
