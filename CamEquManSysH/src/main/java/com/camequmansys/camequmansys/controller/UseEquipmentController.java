package com.camequmansys.camequmansys.controller;

import com.camequmansys.camequmansys.domain.Equipment;
import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.domain.UseEquipment;
import com.camequmansys.camequmansys.service.UseEquipmentService;
import com.camequmansys.camequmansys.utils.MyResult;
import com.camequmansys.camequmansys.utils.ResultCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/useEquipment",produces = {"application/json;charset=UTF-8"})
public class UseEquipmentController {
    @Autowired
    private UseEquipmentService useEquipmentService;

    /**
     * 得到所有设备
     * @return
     */
    @GetMapping("/getAll")
    public MyResult getAll(){
        StringObject result =  useEquipmentService.getAll();
        MyResult myResult = new MyResult(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage());
        myResult.setData(result.getObj());
        return myResult;
    }

    /**
     * 增加设备
     * @param equipment
     * @return
     */
    @PostMapping("/addUseEquipment")
    public MyResult addEquipment(@RequestBody UseEquipment equipment){
        String result =  useEquipmentService.insert(equipment);
        ResultCode resultCode = ResultCode.getResultCode(result);
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        return myResult;
    }

}
