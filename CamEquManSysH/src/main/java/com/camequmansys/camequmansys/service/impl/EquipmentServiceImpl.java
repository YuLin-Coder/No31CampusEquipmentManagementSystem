package com.camequmansys.camequmansys.service.impl;

import com.camequmansys.camequmansys.domain.Equipment;
import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.mapper.EquipmentMapper;
import com.camequmansys.camequmansys.service.EquipmentService;
import com.camequmansys.camequmansys.utils.ResultCode;
import com.camequmansys.camequmansys.utils.qrcode.QRCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EquipmentServiceImpl implements EquipmentService {
    @Autowired
    private EquipmentMapper equipmentMapper;

    @Override
    public List<Equipment> getAll() {
        return equipmentMapper.getAll();
    }

    @Override
    public List<Equipment> getAllRuKu(String status) {
        return equipmentMapper.getAllRuKu(status);
    }

    @Override
    public String addEquipments(List<Equipment> equipmentList) {
        if(equipmentList.size() == 0){
            return ResultCode.data_is_null;
        }
        int res;
        for (int i = 0; i < equipmentList.size(); i++) {
            equipmentList.get(i).setId(UUID.randomUUID().toString().replace("-",""));
            res = equipmentMapper.insert(equipmentList.get(i));
            if(res != 1){
                return ResultCode.unknown_exception;
            }
        }
//        int result = equipmentMapper.insertEquipments(equipmentList);
//        if(result > 0){
//            return ResultCode.success;
//        }else {
//            return ResultCode.unknown_exception;
//        }
        return ResultCode.success;
    }

    @Override
    public String updateById(Equipment equipment) {
        int result = equipmentMapper.updateById(equipment);
        if(result >=0){
            return ResultCode.success;
        }else {
            return ResultCode.unknown_exception;
        }
    }

    @Override
    public String updateStatusById(Equipment equipment) {
        int result = equipmentMapper.updateStatusById(equipment);
        if(result >=0){
            return ResultCode.success;
        }else {
            return ResultCode.unknown_exception;
        }
    }

    @Override
    public String addEquipment(Equipment equipment) {
        List<Equipment> equipmentList = new ArrayList<>();
        //购买数量
        int num = equipment.getNum();
        // 循环遍历设备，入库设备，每一个设备一个二维码
        for (int i = 0; i < num; i++) {
            Equipment equipment1 = new Equipment();
            //设备id
            equipment1.setId(UUID.randomUUID().toString());
            equipment1.setName(equipment.getName());
            equipment1.setNum(equipment.getNum());
            equipment1.setResiduenum(equipment.getResiduenum());
            equipment1.setBegionusetime(equipment.getBegionusetime());
            equipment1.setDescription(equipment.getDescription());
            equipment1.setEquipintroduction(equipment.getEquipintroduction());
            equipment1.setPrice(equipment.getPrice());
            equipment1.setPurchasedate(equipment.getPurchasedate());
            equipment1.setPurchaser(equipment.getPurchaser());
            equipment1.setSupplier(equipment.getSupplier());
            equipment1.setType(equipment.getType());
            equipment1.setStatus(equipment.getStatus());
            equipment1.setUserguidefile(equipment.getUserguidefile());
            String text = "设备id：" + equipment1.getId() +"\n"+
                    "设备名称：" + equipment1.getName() + "\n " +
                    "设备供应商：" + equipment1.getSupplier()+"\n"+
                    "设备描述：" + equipment.getDescription() +"\n" +
                    "设备简介：" + equipment.getEquipintroduction() +"\n" +
                    "设备价格：" + equipment.getPrice() +"\n" +
                    "设备类型：" + equipment.getType() +"\n" +
                    "设备入库数量：" + equipment.getNum()+"\n" +
                    "同类设备库存：" + equipment.getResiduenum() +"\n" +
                    "设备购买时间：" + equipment.getPurchasedate() +"\n";
            //根据equipment1生成二维码
            String QRPath = QRCodeUtil.QRCodeEncode(text, equipment.getName() + "_" + equipment1.getId());
            if(QRPath==null){
                //设备二维码生成错误
                return ResultCode.generate_rqcode_failed;
            }else{
                //设备二维码生成功
                equipment1.setQrcode(QRPath);
                equipmentList.add(equipment1);
            }
        }
        //批量插入
        int result = equipmentMapper.insertEquipments(equipmentList);
        if(result >0){
            return ResultCode.success;
        }else{
            return ResultCode.sql_error;
        }
    }

    @Override
    public StringObject getEquipmentById(String id) {
        List<Equipment> equipment = equipmentMapper.findEquipmentByid(id);
        StringObject stringObject = new StringObject();
        if(equipment!=null){
            stringObject.setName(ResultCode.success);
            stringObject.setObj(equipment.get(0));
        }else {
            stringObject.setName(ResultCode.sql_error);
            stringObject.setObj(null);
        }
        return stringObject;
    }
}
