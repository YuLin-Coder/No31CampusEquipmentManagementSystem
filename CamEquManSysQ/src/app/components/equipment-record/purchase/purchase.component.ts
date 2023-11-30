import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { NzMessageService, UploadFile, UploadChangeParam } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  [x: string]: any;
  fileList: UploadFile[] = [];
  //设备文件地址
  public userguidefile:any ="";
  public url = "/equipment/uploadManualFile";
  public editForm = true;
  loading = false;
 // public resetParam;
  constructor(
    private fb:FormBuilder,
    private userServiceService: UserServiceService,
    private message:NzMessageService
  ) { }

  ngOnInit(): void {
  }
  //表单数据
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
    // begionusetime:[this.begionusetime],
    residuenum:[this.residuenum,Validators.pattern(/[^\s]/)],
    type:[this.type],

  })
  // 提交表单
  submitForm(value): void {
    //更新日期及其现实
    value.purchasedate = this.userServiceService.dateToString(value.purchasedate);
    //value.begionusetime = this.userServiceService.dateToString(new Date());
    value.residuenum = value.num;
    value.userguidefile = this.userguidefile;
    //保存设备信息
    this.userServiceService.myPost("/equipment/addEquipment",value).subscribe(res=>{
      if(res.code == 0){
        this.message.info("设备信息保存成功！")
        this.userguidefile ="";
       // this.resetForm();
      }else{
        this.message.info("设备信息保存失败！" + res.message)
      }
    })
    
    console.log(value);
  }
  resetForm(e: MouseEvent): void {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const temp = file.name.substring(file.name.length -4);
      if(temp!=".pdf"){
        this.message.error('只能上传pdf文件!');
        observer.complete();
        return;
      }
      observer.next(temp==".pdf");
      observer.complete();
    });
  };

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':     
        if(info.file.response.code ==0){
          this.loading = false;   
          this.message.info("上传成功");
          this.userguidefile = info.file.response.data;
        }else{
          this.message.info("上传失败");
        }
        break;
      case 'error':
        this.message.error('请求错误');
        this.loading = false;
        break;
    }
  }
}
