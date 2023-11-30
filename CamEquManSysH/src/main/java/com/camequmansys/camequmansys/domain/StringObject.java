package com.camequmansys.camequmansys.domain;

import lombok.Data;

@Data
public class StringObject {
    private String name;
    private Object obj;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }
}
