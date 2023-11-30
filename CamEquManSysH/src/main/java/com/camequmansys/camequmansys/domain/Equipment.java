package com.camequmansys.camequmansys.domain;

import lombok.Data;

@Data
public class Equipment {
    //名称
    private String name;
    //id
    private String id;
    //价格
    private double price;
    //供应商
    private String supplier;
    //购买者
    private String purchaser;
    //购买日期
    private String purchasedate;
    //二维码地址
    private String qrcode;
    //数量
    private Integer num;
    //描述
    private String description;
    //指导手册
    private String userguidefile;
    //设备介绍
    private String equipintroduction;
    //设备状态
    private String status;
    private String begionusetime;
    //维修时间
    private String servicingtime;
    //回收时间
    private String recoverytime;
    //报废时间
    private String discardtime;
    //库存数量
    private Integer residuenum;
    //类型
    private String type;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getPurchaser() {
        return purchaser;
    }

    public void setPurchaser(String purchaser) {
        this.purchaser = purchaser;
    }

    public String getPurchasedate() {
        return purchasedate;
    }

    public void setPurchasedate(String purchasedate) {
        this.purchasedate = purchasedate;
    }

    public String getQrcode() {
        return qrcode;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserguidefile() {
        return userguidefile;
    }

    public void setUserguidefile(String userguidefile) {
        this.userguidefile = userguidefile;
    }

    public String getEquipintroduction() {
        return equipintroduction;
    }

    public void setEquipintroduction(String equipintroduction) {
        this.equipintroduction = equipintroduction;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBegionusetime() {
        return begionusetime;
    }

    public void setBegionusetime(String begionusetime) {
        this.begionusetime = begionusetime;
    }

    public String getServicingtime() {
        return servicingtime;
    }

    public void setServicingtime(String servicingtime) {
        this.servicingtime = servicingtime;
    }

    public String getRecoverytime() {
        return recoverytime;
    }

    public void setRecoverytime(String recoverytime) {
        this.recoverytime = recoverytime;
    }

    public String getDiscardtime() {
        return discardtime;
    }

    public void setDiscardtime(String discardtime) {
        this.discardtime = discardtime;
    }

    public Integer getResiduenum() {
        return residuenum;
    }

    public void setResiduenum(Integer residuenum) {
        this.residuenum = residuenum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
