import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { isThisISOWeek } from 'date-fns/esm';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public validateForm: FormGroup;
 //注册
 public registerFormData: FormGroup;
 public isVisibleMiddle = false;
 public username = "admin";
 @ViewChild("app_register")
 public registerCompment: any;;
  userNameAsyncValidator: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router,
    private modal: NzModalService,
    private message:NzMessageService
    
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      major: [null],
      remember: [true]
    });
  }

  // 登录
  submitForm(): void {
    let data = this.validateForm.value;
    this.userService.myPost("/user/login",data).subscribe(res=>{
      if(res.code == 0){
        this.message.info("登录成功");    
        this.userService.setUsername(this.username);
        this.router.navigate(["main_page"],{queryParams:{username:this.username,role:res.data.role},skipLocationChange: true})
      }else if(res.code!= 0){
        this.message.error(res.message)
      }else{
        this.message.error("登录失败,未知错误")
      }
    })
   
  }

  // 注册
  public register(){
    this.isVisibleMiddle = true;
    
  }

  handleOkMiddle(): void {
    console.log('点击了确定');
    this.registerCompment.submitForm();

  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  public closeModual(item){
    this.username = item;
    this.handleCancelMiddle();
  }
}


