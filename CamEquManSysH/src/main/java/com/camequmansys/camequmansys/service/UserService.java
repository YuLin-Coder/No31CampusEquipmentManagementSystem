package com.camequmansys.camequmansys.service;

import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.domain.User;
import com.camequmansys.camequmansys.utils.MyResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {
     List<User> getAll();

    /**
     * 注册
     * @param user
     * @return
     */
     String register(User user);

    /**
     * 登录
     * @param user
     * @return
     */
     StringObject login(User user);

    /**
     * 修改密码
     * @param user
     * @return
     */
     String modifyPwd(User user);
}
