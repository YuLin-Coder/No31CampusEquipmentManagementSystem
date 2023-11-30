import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-campus-equipment-introduction',
  templateUrl: './campus-equipment-introduction.component.html',
  styleUrls: ['./campus-equipment-introduction.component.css']
})
export class CampusEquipmentIntroductionComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  public datastatus ="加载中....."
  constructor(
    private message:NzMessageService,
    private userService: UserServiceService,//更改设备的 doto。。。
  ) { }
  pdfSrc;
  ngOnInit(): void {
    //初始化
    this.initEquipmentData(); 
  }

  //初始化数据
  initEquipmentData(){
    this.userService.myGet("/equipment/getAll").subscribe(res=>{
      if(res.data.length != 0){
        this.listOfData = res.data
        this.updateEditCache();
      }else{
        this.datastatus = "无数据";
        this.message.error("无数据")
      }
    })
  }
  startEdit(index: string): void {
    this.editCache[index].edit = true;
  }

  cancelEdit(index: string): void {
    this.editCache[index] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }
  //保存
  saveEdit(index: string): void {
    this.userService.myPost("/equipment/updateById",this.editCache[index].data).subscribe(res=>{
      if(res.code =="0"){
        this.message.info("设备简介修改成功！")
      }else{
        this.message.error("设备简介修改失败！\n" + res.message )
      }
    })
    Object.assign(this.listOfData[index], this.editCache[index].data);

    this.editCache[index].edit = false;
  }
  updateEditCache(): void {
    let i = 0;
    this.listOfData.forEach(item => {
      this.editCache[i] = {
        edit: false,
        data: { ...item }
      };
      i++;
    });
  }

  //过滤
  equipFilter()
  {

  }    
  pageRendered(item){
    this.message.info("pdf加载完成")
    console.log("")
  }
}




//表格数据展示接口
interface ItemData {
  id: string;
  name: string;
  equipintroduction:string ,
}
