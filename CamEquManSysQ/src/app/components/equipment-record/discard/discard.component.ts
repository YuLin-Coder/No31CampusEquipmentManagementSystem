import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UserServiceService } from 'src/app/service/user-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-discard',
  templateUrl: './discard.component.html',
  styleUrls: ['./discard.component.css']
})
export class DiscardComponent implements OnInit {

 constructor(
    private message:NzMessageService,
    private sanitizer: DomSanitizer,
    private userService: UserServiceService,//更改设备的 doto。。。
  ) { }
  public listOfData:any =[];
   @Input() public username;
  loading = true;
    public datastatus ="加载中....."
  //每页数目
  pageSize ="15"
  pageSizeOptions = [ 5, 10, 20];
  ngOnInit(): void {
     this.initDat();
  }

  public initDat(){
    this.userService.myGet("/equipment/getAllRuKu?status=报废").subscribe(res=>{
      if(res.data.length != 0){
        this.listOfData = res.data
        this.updateEditCache();
      }else{
        this.datastatus = "无入库状态数据";
        this.message.error("无入库状态数据")
      }
    })
  }




  editCache: { [key: string]: { edit: boolean; data: any; address:any}} = {};
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }
   cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
      address:"ssss"
    };
  }
  //保存
  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id].data.begionusetime = this.userService.dateToString(this.editCache[id].data.begionusetime);
    let param ={
      begionusetime:this.editCache[id].data.begionusetime,
      residuenum:this.editCache[id].data.residuenum -1,
      status:this.editCache[id].data.status
    }
   this.userService.myPost("/equipment/updateStatusById",JSON.stringify(param)).subscribe(res=>{
      if(res.code == 0){
        let equUseMsgParam = {
          id:this.editCache[id].data.id,
          username:this.userService.getUsername(),
          begintime:this.editCache[id].data.begionusetime,
          address:this.editCache[id].data.address,
          equipmentname:this.editCache[id].data.name
        }
        console.log(equUseMsgParam)
        this.userService.myPost("/useEquipment/addUseEquipment",equUseMsgParam).subscribe(res=>{
          if(res.code ==0){
            this.message.info("设备使用信息更新！");
          }else{
            this.message.info("设备使用信息更新失败！" + res.message);
          }
        })
      }else{
        this.message.error("设备使用信息更新失败！")
      }
    })
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
        address:""
      };
    });
  }

}
