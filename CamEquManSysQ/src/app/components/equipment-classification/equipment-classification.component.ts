import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { UserServiceService } from 'src/app/service/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-equipment-classification',
  templateUrl: './equipment-classification.component.html',
  styleUrls: ['./equipment-classification.component.css']
})
export class EquipmentClassificationComponent implements OnInit {

  public url = "/QRCode/analysisEquipmentQRCode";
  public status;
  public username = "未知";
  public role ="未知";
  //二维码信息
  public equipmentQRCodeMsg:any;
  constructor(
    private msg: NzMessageService,
    private userService: UserServiceService,
    private fb:FormBuilder,
    private activatedRoute: ActivatedRoute,
    ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res=>{
      if(res.username){
        this.username = res.username;
        this.role = res.role;
        this.initMenus(this.role);
      }else{
        this.router.navigate(["cems_login"])
      }
    })
  }
  loading = false;
  avatarUrl: string;
  //是否展示编辑表单
  public showEditTable=false;
  public data;
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  //文件上传
  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':     
        if(info.file.response.code ==0){
          this.loading = false;
          this.getBase64(info.file!.originFileObj!, (img: string) => {
            this.loading = false;
            this.avatarUrl = img;
          });
          this.msg.info("解析成功");
          this.equipmentQRCodeMsg = info.file.response.data;
          this.showEditTable = true;
          this.initModifyEquipmentData(this.equipmentQRCodeMsg);
        }else{
          this.msg.info("解析失败！请确认二维码无误");
        }
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  //根据返回的二维码信息展示修改的设备信息
  public initModifyEquipmentData(equipmentQRCodeMsg){
    // 获取id 
    let id = equipmentQRCodeMsg.split("\n")[0].substring(5);
    this.userService.myGet("/equipment/getEquipmentById?id="+id).subscribe(res=>{
      if(res.code ==0){
        this.msg.info("根据二维码获取数据成功");
        this.data = res.data;
        this.status = this.data.status;
      }
    })
  }

  [x: string]: any;
  public validateForm = this.fb.group({
    name:[this.name,[Validators.required,Validators.pattern(/[^\s]/)]],
    supplier:[this.supplier,Validators.pattern(/[^\s]/)],
    price:[this.price],
    purchaser:[this.purchaser,Validators.pattern(/[^\s]/)],
    purchasedate:[this.purchasedate],
    num:[this.num],
    description:[this.description,Validators.pattern(/[^\s]/)],
    equipintroduction:[this.equipintroduction],
    status:[this.status,Validators.pattern(/[^\s]/)],
    begionusetime:[this.begionusetime],
    residuenum:[this.residuenum,Validators.pattern(/[^\s]/)],
    type:[this.type],

  })

  submitForm(value){
    //才能入库到使用
    let creatdate = this.userService.dateToString(new Date());
    value.id = this.data.id;
    if(this.status != value.status){   
      switch(value.status){
        case "使用":
          value.servicingtime=creatdate;
          break;
          case "维修":
          value.begionusetime=creatdate;
          break;
           case "回收":
          value.recoverytime=creatdate;
          break;
           default:
          value.discardtime=creatdate;
          break;
      }
      if(this.status =="入库"){
          value.residuenum = value.residuenum - 1;
      }
    }
    value.userguidefile =this.data.value;
    //更新设备二维码
    // let text = `设备id:{value.id}
    //             设备名称:{value.name  }
    //             设备供应商:{value.supplier}
    //             设备描述:{value.descriptio}n 
    //             设备简介:{value.equipintro}duction 
    //             设备价格:{value.price }
    //             设备类型:{value.type }
    //             设备入库数量:{value.num}
    //             同类设备库存:{value.residuenum }
    //             设备购买时间:{value.purchasedate} 
    //             设备状态:{value.status }
    //             设备状态更新时间:{creatdate}`
    let text = "设备id：" + value.id +"\n"+
                "设备名称：" + value.name + "\n " +
                "设备供应商：" + value.supplier+"\n"+
                "设备描述：" + value.description +"\n" +
                "设备简介：" + value.equipintroduction +"\n" +
                "设备价格：" + value.price +"\n" +
                "设备类型：" + value.type +"\n" +
                "设备入库数量：" + value.num+"\n" +
                "同类设备库存：" + value.residuenum +"\n" +
                "设备购买时间：" + value.purchasedate +"\n" +
                "设备状态：" + value.status +"\n" +
                "设备状态更新时间：" + creatdate +"\n";
    let pictureName = value.name + "_" + value.id;
    this.userService.myGet("/QRCode/createEquipmentQRCode?text="+text+"&pictureName="+pictureName).subscribe(res=>{
        if (res.code == 0) {
          value.qrcode= res.data;
          console.log(value)
          this.userService.myPost("/equipment/updateById",value).subscribe(res=>{
            if(res.code == 0){
              this.msg.info("设备信息更新成功")
            }else{
              this.msg.error("设备信息更新失败!" + res.message)
            }
          })
        }else{
          this.msg.error("设备信息更新失败!")
        }
    })
  }
  resetForm(e: MouseEvent): void {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
}
