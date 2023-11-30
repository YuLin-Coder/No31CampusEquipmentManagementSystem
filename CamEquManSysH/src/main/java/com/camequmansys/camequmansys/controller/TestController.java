package com.camequmansys.camequmansys.controller;

import com.camequmansys.camequmansys.utils.MyResult;
import com.camequmansys.camequmansys.utils.ResultCode;
import com.camequmansys.camequmansys.utils.qrcode.QRCodeUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Administrator
 */
@RestController
@RequestMapping(value="/test")
public class TestController {
    private static final String path = System.getProperty("user.dir") +"\\src\\main\\resources\\static\\image\\QRcode\\";
    /**
     * 生成二维码
     */
    @GetMapping("/e")
    public MyResult QRCodeEncode(@RequestParam("text") String text,@RequestParam("pictureName") String pictureName){
        String imgPath = path + "my.jpg";
        String destPath = path + pictureName + ".jpg";
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
    @GetMapping("/d")
    public MyResult QRCodeDecode(@RequestParam("pictureName") String pictureName){
        String destPath = path + pictureName + ".jpg";
        MyResult myResult = new MyResult(ResultCode.SUCCESS.getCode(),ResultCode.SUCCESS.getMessage());
        String text = null;
        try {
            text = QRCodeUtil.decode(destPath);
        } catch (Exception e) {
            e.printStackTrace();
            myResult.setCode(-1);
            myResult.setMessage(e.getMessage());
        }
        myResult.setData(text);
        return myResult;
    }

}
