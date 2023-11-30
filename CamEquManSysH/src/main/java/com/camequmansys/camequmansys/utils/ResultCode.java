package com.camequmansys.camequmansys.utils;

import org.springframework.expression.spel.ast.Operator;

import java.awt.image.RescaleOp;

/**
 * @author Administrator
 */

public enum ResultCode {

    SUCCESS(0, "请求成功"),
    UNKNOWN_EXCEPTION(-1, "未知异常"),
    USER_NOT_FOUND(10001, "没有找到此用户"),
    DATA_IS_NULL(10002, "数据为空"),
    USERNAME_EXIST(10003, "用户名已经存在"),
    GENERATE_RQCODE_FAILED(10004, "设备二维码生成错误"),
    SQL_ERROR(10005, "操作数据库失败"),
    PHONE_EXIST(10008, "手机号已经存在"),
    USERNAME_PASSWORD_EXCEPTION(10011, "用户名或者密码,专业错误");

    public static final String success = "SUCCESS";
    public static final String unknown_exception = "UNKNOWN_EXCEPTION";
    public static final String username_exist = "USERNAME_EXIST";
    public static final String user_not_found = "USER_NOT_FOUND";
    public static final String username_password_exception = "USERNAME_PASSWORD_EXCEPTION";
    public static final String data_is_null = "DATA_IS_NULL";
    public static final String generate_rqcode_failed = "GENERATE_RQCODE_FAILED";
    public static final String sql_error = "SQL_ERROR";
    private int code;
    private String message;

    ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }
    public static ResultCode getResultCode(String codeName){
        ResultCode  resultCode = Enum.valueOf(ResultCode.class, codeName);
        return resultCode;
    }

    public String getMessage() {
        return message;
    }

}
