package com.camequmansys.camequmansys.service.impl;

import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.domain.UseEquipment;
import com.camequmansys.camequmansys.mapper.UseEquipmentMapper;
import com.camequmansys.camequmansys.service.UseEquipmentService;
import com.camequmansys.camequmansys.utils.ResultCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UseEquipmentServiceImpl implements UseEquipmentService {

    @Autowired
    private UseEquipmentMapper useEquipmentMapper;
    @Override
    public StringObject getAll() {
        List<UseEquipment> equipment = useEquipmentMapper.getAll();
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

    @Override
    public String insert(UseEquipment useEquipment) {
        int result = useEquipmentMapper.insert(useEquipment);
        if(result > 0){
            return ResultCode.success;
        }else {
            return ResultCode.unknown_exception;
        }
    }
}
