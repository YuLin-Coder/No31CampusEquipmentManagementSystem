package com.camequmansys.camequmansys.utils;

import java.io.File;

public class UploadUtils {
    //二维码路径
    public final static String QRCODE_PATH = "static/assets/image/QRcode/";
    //操作手册路径
    public final static String MANUAL_FILE_PATH = "static/assets/file/manual_file/";
    public final static String TEMP_FILE_PATH = "static/assets/file/temp/";

    /**
     * 生成二维码文件地址
     * @return
     */
    public static File getImgDirFile(){
    // 构建上传文件的存放 “文件夹” 路径
        String fileDirPath = "src/main/resources/" + QRCODE_PATH;
        File fileDir = new File(fileDirPath);
        if(!fileDir.exists()){
        // 递归生成文件夹
            fileDir.mkdirs();
        }
        return fileDir;
    }
    /**
     * 生成操作手册文件地址
     * @return
     */
    public static File getManualDirFile(){
        // 构建上传文件的存放 “文件夹” 路径
        String fileDirPath = "src/main/resources/" + MANUAL_FILE_PATH;
        File fileDir = new File(fileDirPath);
        if(!fileDir.exists()){
            // 递归生成文件夹
            fileDir.mkdirs();
        }
        return fileDir;
    }
    /**
     * 生成操作手册文件地址
     * @return
     */
    public static File getTempDirFile(){
        // 构建上传文件的存放 “文件夹” 路径
        String fileDirPath = "src/main/resources/" + TEMP_FILE_PATH;
        File fileDir = new File(fileDirPath);
        if(!fileDir.exists()){
            // 递归生成文件夹
            fileDir.mkdirs();
        }
        return fileDir;
    }
}
