package com.camequmansys.camequmansys.mapper;

import com.camequmansys.camequmansys.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * @author Administrator
 */
@Repository
public interface UserMapper {
    /**
     * 通过用户名查询
     * @param username
     * @return
     */
    List<User> findUserByName(String username);

    /**
     * 查询所有
     * @return
     */
    List<User> getAll();

    /**
     * 插入数据
     * @param user
     * @return
     */
    int insert(User user);

    /**
     * 登陆
     * @param username
     * @param password
     * @return
     */
    List<User> login(String username,String password,String major);

    /**
     * x修改密码
     * @param user
     * @return
     */
    int modifyPwd(User user);

}
