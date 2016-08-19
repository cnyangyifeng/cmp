package com.cnmengma.mapper;

import com.cnmengma.domain.Category;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CategoryMapper {

    List<Category> find(@Param("offset") int offset, @Param("limit") int limit);

    Category findById(int categoryId);

    void create(Category category);

    void update(Category category);

    void deleteByIds(int[] categoryIds);

    void deleteById(int categoryId);

    List<Category> searchByName(@Param("q") String q, @Param("offset") int offset, @Param("limit") int limit);

    int findCount();

    int searchByNameCount(String q);
}
