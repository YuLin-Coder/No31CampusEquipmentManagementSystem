import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public isVisibleMiddle = false;
   array = [1, 2, 3, 4];
  public username = "未知";
  public role ="未知";
  public isCollapsed = false;
  public menu:any;
  //当前显示的内容
  public curShowContenPage =undefined;
  //面包屑
  public breadcrumbs = [];
  @ViewChild("modifyPwdCompment")
 public modifyPwdCompment: any;;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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

  //初始化菜单
  public initMenus(role){
    if(role == 0){
      //学生[]
      this.menu = [
        {
          name:"设备日常管理功能",
          icon:"user",
          isLeaf:true,
          url:"app-equipment-classification",
        },
        { 
          name:"校园设备简介",
          icon:"user",
          isLeaf:true,
          url:"app-campus-equipment-introduction",
        },
        { 
          name:"校园设备使用手册",
          icon:"user",
          isLeaf:true,
          url:"app-campus-equipment-manual",
        },
        // {
        //   name:"台账功能",
        //   icon:"user",
        //   isLeaf:false,
        //   children:[
        //     {
        //       name:"购置功能",
        //       icon:"user",
        //       isLeaf:true,
        //       url:"app-purchase",
        //     },
        //     {
        //       name:"使用功能",
        //       icon:"user",
        //       isLeaf:true,
        //       url:"app-use-equiment",
        //     },
        //     {
        //       name:"维修功能",
        //       icon:"user",
        //       isLeaf:true,
        //       url:"",
        //     }
        //   ]
        // }
      ]
    }
    if(role == 1){
       this.menu = [
        {
          name:"设备日常管理功能",
          icon:"user",
          isLeaf:true,
          url:"app-equipment-classification",
        },
        { 
          name:"校园设备简介",
          icon:"user",
          isLeaf:true,
          url:"app-campus-equipment-introduction",
        },
        { 
          name:"校园设备使用手册",
          icon:"user",
          isLeaf:true,
          url:"app-campus-equipment-manual",
        },
        {
          name:"台账功能",
          icon:"user",
          isLeaf:false,
          children:[
            // {
            //   name:"购置功能",
            //   icon:"user",
            //   isLeaf:true,
            //   url:"app-purchase",
            // },
            {
              name:"使用功能",
              icon:"user",
              isLeaf:true,
              url:"app-use-equiment",
            },
            // {
            //   name:"维修功能",
            //   icon:"user",
            //   isLeaf:true,
            //   url:"",
            // }
          ]
        }
      ]
    }
    if(role ==2){
      this.menu = [
       {
         name:"设备日常管理功能",
         icon:"user",
         isLeaf:true,
         url:"app-equipment-classification",
       },
       { 
         name:"校园设备简介",
         icon:"user",
         isLeaf:true,
         url:"app-campus-equipment-introduction",
       },
       { 
         name:"校园设备使用手册",
         icon:"user",
         isLeaf:true,
         url:"app-campus-equipment-manual",
       },
       {
         name:"台账功能",
         icon:"user",
         isLeaf:false,
         children:[
           {
             name:"购置功能",
             icon:"user",
             isLeaf:true,
             url:"app-purchase",
           },
           {
             name:"使用功能",
             icon:"user",
             isLeaf:true,
             url:"app-use-equiment",
           },
           {
             name:"维修功能",
             icon:"user",
             isLeaf:true,
             url:"app-servicing",
           },
           {
             name:"报废功能",
             icon:"user",
             isLeaf:true,
             url:"app-discard",
           },
           {
             name:"回收功能",
             icon:"user",
             isLeaf:true,
             url:"app-recovery",
           }
         ]
       }
     ]
   }

   if(role ==3){
    this.menu = [
    
     {
       name:"台账功能",
       icon:"user",
       isLeaf:false,
       children:[
         {
           name:"维修功能",
           icon:"user",
           isLeaf:true,
           url:"app-servicing",
         },
         {
           name:"报废功能",
           icon:"user",
           isLeaf:true,
           url:"app-discard",
         },
         {
           name:"回收功能",
           icon:"user",
           isLeaf:true,
           url:"app-recovery",
         }
       ]
     }
   ]
 }

 if(role ==4){
  this.menu = [
   {
     name:"设备日常管理功能",
     icon:"user",
     isLeaf:true,
     url:"app-equipment-classification",
   },
   
   {
     name:"台账功能",
     icon:"user",
     isLeaf:false,
     children:[
       {
         name:"购置功能",
         icon:"user",
         isLeaf:true,
         url:"app-purchase",
       },
       {
         name:"使用功能",
         icon:"user",
         isLeaf:true,
         url:"app-use-equiment",
       },
       {
         name:"维修功能",
         icon:"user",
         isLeaf:true,
         url:"app-servicing",
       },
       {
         name:"报废功能",
         icon:"user",
         isLeaf:true,
         url:"app-discard",
       },
       {
         name:"回收功能",
         icon:"user",
         isLeaf:true,
         url:"app-recovery",
       }
     ]
   }
 ]
}


  }
  //根据名称获取二级菜单
  public getChildList(index){
    //有子节点
    if(!this.menu[index].isLeaf){
      return this.menu[index].children
    }
  }
  //退出系统
  public exit(){
    this.username = undefined;
    this.router.navigate(["cems_login"]);
  }

  //菜单点击展示页面
  public showPage(item,isLeaf){
    if(isLeaf){
      this.curShowContenPage = item.url;
      if(this.breadcrumbs.length > 0){
        this.breadcrumbs.pop();
      }
      this.breadcrumbs.push({name:item.name})
    }
  }

   // 修改密码
  public modifyPwd(){
    this.isVisibleMiddle = true;
  }

  handleOkMiddle(): void {
    this.modifyPwdCompment.submitForm();
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  public closeModual(item){
    this.handleCancelMiddle();
  }

}
