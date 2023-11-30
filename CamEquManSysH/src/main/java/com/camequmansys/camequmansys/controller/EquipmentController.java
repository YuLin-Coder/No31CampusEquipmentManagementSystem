package com.camequmansys.camequmansys.controller;

import com.camequmansys.camequmansys.domain.Equipment;
import com.camequmansys.camequmansys.domain.StringObject;
import com.camequmansys.camequmansys.service.EquipmentService;
import com.camequmansys.camequmansys.utils.MyResult;
import com.camequmansys.camequmansys.utils.ResultCode;
import com.camequmansys.camequmansys.utils.UploadUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping(value = "/equipment",produces = {"application/json;charset=UTF-8"})
public class EquipmentController {
    private static final String path = System.getProperty("user.dir") +"\\src\\main\\resources\\static\\file\\manual_file\\";
    @Autowired
    private EquipmentService equipmentService;

    /**
     * 得到所有设备
     * @return
     */
    @GetMapping("/getAll")
    public MyResult getAll(){
        List<Equipment> list =  equipmentService.getAll();
        MyResult myResult = new MyResult(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage());
        myResult.setData(list);
        return myResult;
    }

    /**
     * 批量增加
     * @param equipmentList
     * @return
     */
    @PostMapping("/addEquipments")
    public MyResult addEquipments(@RequestBody List<Equipment> equipmentList){
        String result =  equipmentService.addEquipments(equipmentList);
        ResultCode resultCode = ResultCode.getResultCode(result);
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        return myResult;
    }

    /**
     * 根据id更新设备
     * @param equipment
     * @return
     */
    @PostMapping("/updateById")
    public MyResult updateById(@RequestBody Equipment equipment){
        String result =  equipmentService.updateById(equipment);
        ResultCode resultCode = ResultCode.getResultCode(result);
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        return myResult;
    }

    /**
     * 上传文件pdf
     * @param file
     * @return
     */
    @PostMapping("/uploadManualFile")
    public MyResult QRCodeDecode(@RequestParam("file") MultipartFile file){
        String fileName = file.getOriginalFilename();
        File fileDir = UploadUtils.getManualDirFile();
        String destPath = fileDir.getAbsolutePath() + File.separator + UUID.randomUUID().toString() +"_" + fileName;
        File dest = new File(destPath);
        MyResult myResult = null;
        String text = null;
        try {
            file.transferTo(dest);

            myResult = new MyResult(ResultCode.SUCCESS.getCode(),ResultCode.SUCCESS.getMessage());
            text = destPath;
        } catch (Exception e) {

            myResult.setCode(-1);
            myResult.setMessage(e.getMessage() +":"+e.getMessage());
        }
        myResult.setData(text);
        return myResult;
    }

    /**
     * 增加设备
     * @param equipment
     * @return
     */
    @PostMapping("/addEquipment")
    public MyResult addEquipment(@RequestBody Equipment equipment){
        String result =  equipmentService.addEquipment(equipment);
        ResultCode resultCode = ResultCode.getResultCode(result);
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        return myResult;
    }

    /**
     * 根据id查询
     * @param id
     * @return
     */
    @GetMapping("/getEquipmentById")
    public MyResult getEquipmentById(@RequestParam("id") String id){
        StringObject result =  equipmentService.getEquipmentById(id);
        ResultCode resultCode = ResultCode.getResultCode(result.getName());
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        myResult.setData(result.getObj());
        return myResult;
    }

    /**
     * 得到所有入库设备
     * @return
     */
    @GetMapping("/getAllRuKu")
    public MyResult getAllRuKu(String status){
        System.out.println(status);
        List<Equipment> list =  equipmentService.getAllRuKu(status);
        MyResult myResult = new MyResult(ResultCode.SUCCESS.getCode(), ResultCode.SUCCESS.getMessage());
        myResult.setData(list);
        return myResult;
    }

    /**
     * 根据id更新设备状态
     * @param equipment
     * @return
     */
    @PostMapping("/updateStatusById")
    public MyResult updateStatusById(@RequestBody Equipment equipment){
        String result =  equipmentService.updateStatusById(equipment);
        ResultCode resultCode = ResultCode.getResultCode(result);
        MyResult myResult = new MyResult(resultCode.getCode(), resultCode.getMessage());
        return myResult;
    }

}
