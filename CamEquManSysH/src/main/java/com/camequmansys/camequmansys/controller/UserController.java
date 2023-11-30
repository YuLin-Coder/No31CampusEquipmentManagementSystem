package com.camequmansys.camequmansys.controller;

import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.domain.User;
import com.camequmansys.camequmansys.service.UserService;
import com.camequmansys.camequmansys.utils.MyResult;
import com.camequmansys.camequmansys.utils.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @author Administrator
 */
@RestController
@RequestMapping(value = "/user",produces = {"application/json;charset=UTF-8"})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public MyResult login(@RequestBody User user){
        StringObject result = userService.login(user);
        ResultCode resultCode = ResultCode.getResultCode(result.getName());
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        myResult.setData(result.getObj());
        return myResult;
    }

    @GetMapping("/getAll")
    public MyResult getAll(){
        List<User> list =  userService.getAll();
        MyResult myResult = new MyResult(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage());
        myResult.setData(list);
        return myResult;
    }

    @PostMapping("/register")
    public MyResult register(@RequestBody User user){
       String result =  userService.register(user);
       ResultCode resultCode = ResultCode.getResultCode(result);
       MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
       return myResult;
    }
    @PostMapping("/modifyPwd")
    public MyResult modifyPwd(@RequestBody User user){
        String result =  userService.modifyPwd(user);
        ResultCode resultCode = ResultCode.getResultCode(result);
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        return myResult;
    }
}
