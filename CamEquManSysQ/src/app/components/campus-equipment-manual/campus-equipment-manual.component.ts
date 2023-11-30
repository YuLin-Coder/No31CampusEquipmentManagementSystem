import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UserServiceService } from 'src/app/service/user-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-campus-equipment-manual',
  templateUrl: './campus-equipment-manual.component.html',
  styleUrls: ['./campus-equipment-manual.component.css']
})
export class CampusEquipmentManualComponent implements OnInit {
  constructor(
    private message:NzMessageService,
    private sanitizer: DomSanitizer,
    private userService: UserServiceService,//更改设备的 doto。。。
  ) { }
  public datastatus ="加载中....."
  public data:any =[];
  loading = true;
  //每页数目
  pageSize ="15"
  pageSizeOptions = [ 5, 10, 20];
  //模态框显示
  isVisible = false;
  //模态框内容显示控制
  showModaType:any;
  //二维码路径
  qrcodePath:any;
  //pdf文件路径
  manualFilePath:any;
  modalTitle:any;
  public equipmentName;
  isShowPdf=false;
  ngOnInit(): void {
    this.initDat();
  }
  public initDat(){
    this.userService.myGet("/equipment/getAll").subscribe(res=>{
      if(res.data.length != 0){
        this.data = res.data
      }else{
        this.datastatus = "无数据";
        this.message.error("无数据")
      }
    })
  }
  public openFram(id,name){
    this.equipmentName =name;   
    this.isVisible = true;
      this.showModaType = 1;
      this.qrcodePath= this.userService.qrpath + name + "_" + id + ".jpg";
      this.modalTitle = name + "二维码信息"

  }
  public showPdf(id,name,userguidefile){
    if(userguidefile){
      this.isShowPdf = true;
      this.manualFilePath = userguidefile;
      this.manualFilePath = "assets/file/manual_file/6cbbb6dd-9424-421c-b43b-2a0e211036fe_电脑使用手册.pdf";
    }else{
      this.message.info("无操作手册pdf");
    }
  }
  public closePdf(){
    this.isShowPdf = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
