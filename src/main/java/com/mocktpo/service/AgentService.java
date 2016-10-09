package com.mocktpo.service;

import com.mocktpo.domain.Agent;
import com.mocktpo.mapper.AgentMapper;
import com.mocktpo.util.PasswordUtils;
import com.mocktpo.vo.LoginVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    @Autowired
    private AgentMapper mapper;

    public List<Agent> find() {
        return mapper.find();
    }

    public Agent auth(LoginVo loginVo) {
        if (null == loginVo) {
            return null;
        } else {
            String mobile = loginVo.getMobile();
            String password = loginVo.getPassword();
            if (StringUtils.isEmpty(mobile) || StringUtils.isEmpty(password)) {
                return null;
            } else {
                List<Agent> lz = mapper.findByMobileAndPassword(mobile, PasswordUtils.encode(password));
                if (null == lz || 1 != lz.size()) {
                    return null;
                } else {
                    return lz.get(0);
                }
            }
        }
    }

    public void create(Agent agent) {
        mapper.create(agent);
    }

    public void update(Agent agent) {
        mapper.update(agent);
    }

    public void deleteById(long agentId) {
        mapper.deleteById(agentId);
    }
}
