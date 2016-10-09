package com.mocktpo.mapper;

import com.mocktpo.domain.Agent;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AgentMapper {

    List<Agent> find();

    List<Agent> findByMobileAndPassword(@Param("mobile") String mobile, @Param("password") String password);

    void create(Agent agent);

    void update(Agent agent);

    void deleteById(long agentId);
}
