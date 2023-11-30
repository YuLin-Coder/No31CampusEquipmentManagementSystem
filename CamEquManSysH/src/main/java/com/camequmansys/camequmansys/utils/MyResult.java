package com.camequmansys.camequmansys.utils;

/**
 * @author Administrator
 */
public class MyResult<T> {
    private int code;
    private String message;
    private T data;

    public MyResult(){

    }

    public MyResult(int code, String message, T data) {
        this(code, message);
        this.data = data;
    }

    public MyResult(int code, String message) {
        this.code = code;
        this.message = message;
    }
    public MyResult(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
