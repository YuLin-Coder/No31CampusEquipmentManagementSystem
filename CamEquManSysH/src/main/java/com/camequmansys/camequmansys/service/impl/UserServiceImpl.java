package com.camequmansys.camequmansys.service.impl;

import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.domain.User;
import com.camequmansys.camequmansys.mapper.UserMapper;
import com.camequmansys.camequmansys.service.UserService;
import com.camequmansys.camequmansys.utils.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


/**
 * @author Administrator
 */

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public List<User> getAll() {
        return userMapper.getAll();
    }

    @Override
    public String register(User user) {
        List<User> list = userMapper.findUserByName(user.getUsername());
        if(list.size() == 0){
            if(userMapper.insert(user) > 0){
                return ResultCode.success;
            }else {
                return ResultCode.unknown_exception;
            }
        }else {
            return ResultCode.username_exist;
        }
    }

    @Override
    public StringObject login(User user) {
        List<User> list = userMapper.findUserByName(user.getUsername());
        StringObject stringObject = new StringObject();
        if(list.size() == 0){
            stringObject.setName(ResultCode.user_not_found);
            stringObject.setObj(null);
           // return ResultCode.user_not_found;
            return stringObject;
        }
        List<User> list1 = userMapper.login(user.getUsername(),user.getPassword(),user.getMajor());
        if(list1.size() == 0){
           // return ResultCode.username_password_exception;
            stringObject.setName(ResultCode.username_password_exception);
            stringObject.setObj(null);
            return stringObject;
        }else {
           // return ResultCode.success;
            stringObject.setName(ResultCode.success);
            stringObject.setObj(list1.get(0));
            return stringObject;
        }
    }

    @Override
    public String modifyPwd(User user) {
        int result = userMapper.modifyPwd(user);
        if(result>=0){
            return ResultCode.success;
        }else {
            return  ResultCode.sql_error;
        }
    }
}
