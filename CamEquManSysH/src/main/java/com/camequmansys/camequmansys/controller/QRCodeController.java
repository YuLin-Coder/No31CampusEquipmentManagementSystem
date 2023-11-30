package com.camequmansys.camequmansys.controller;

import com.camequmansys.camequmansys.utils.MyResult;
import com.camequmansys.camequmansys.utils.ResultCode;
import com.camequmansys.camequmansys.utils.UploadUtils;
import com.camequmansys.camequmansys.utils.qrcode.QRCodeUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/**
 * @author Administrator
 */
@Slf4j
@RestController
@RequestMapping(value="/QRCode",produces = {"application/json;charset=UTF-8"})
public class QRCodeController {
    /**
     * 生成二维码
     */
    @GetMapping("/createEquipmentQRCode")
    public MyResult QRCodeEncode(@RequestParam("text") String text, @RequestParam("pictureName") String pictureName){
        File fileDir = UploadUtils.getImgDirFile();
        String imgPath = fileDir.getAbsolutePath() + File.separator + "my.jpg";
        String destPath = fileDir.getAbsolutePath() + File.separator  + pictureName + ".jpg";
        MyResult myResult;
        try {
            QRCodeUtil.encode(text, imgPath, destPath, false);
            myResult = new MyResult(ResultCode.SUCCESS.getCode(),ResultCode.SUCCESS.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            myResult = new MyResult(-1,e.getMessage());
        }
        return myResult;
    }

//    @GetMapping("/analysisEquipmentQRCode ")
//    public MyResult QRCodeDecode(@RequestParam("pictureName") String pictureName){
//        String destPath = path + pictureName + ".jpg";
//        MyResult myResult = new MyResult(ResultCode.SUCCESS.getCode(),ResultCode.SUCCESS.getMessage());
//        String text = null;
//        try {
//            text = QRCodeUtil.decode(destPath);
//        } catch (Exception e) {
//            e.printStackTrace();
//            myResult.setCode(-1);
//            myResult.setMessage(e.getMessage());
//        }
//        myResult.setData(text);
//        return myResult;
//    }
    /**
     * 解析二维码
     * @param
     * @return
     */
    @PostMapping("/analysisEquipmentQRCode")
    public MyResult QRCodeDecode(@RequestParam("fileName") MultipartFile file){
        String fileName = file.getOriginalFilename();
        File fileDir = UploadUtils.getTempDirFile();
        String destPath = fileDir.getAbsolutePath() + File.separator + fileName;
        File dest = new File(destPath);
        MyResult myResult = null;
        String text = null;
        try {
            file.transferTo(dest);
            myResult = new MyResult(ResultCode.SUCCESS.getCode(),ResultCode.SUCCESS.getMessage());
            text = QRCodeUtil.decode(destPath);
        } catch (Exception e) {
            myResult.setCode(-1);
            myResult.setMessage(e.getMessage() +":"+e.getMessage());
        }
        myResult.setData(text);
        return myResult;
    }
}
