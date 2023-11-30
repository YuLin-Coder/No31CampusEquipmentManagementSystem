import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NzSafeAny, NzMessageService } from 'ng-zorro-antd';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() closeModual = new EventEmitter();
  ngOnInit(): void {
  }

  validateForm: FormGroup;

  // current locale is key of the nzAutoTips
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
      email: '邮箱格式不正确'
    },
    en: {
      required: 'Input is required',
      email: 'The input is not valid email'
    }
  };

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private message: NzMessageService) {
    const { required, maxLength, minLength, email, phone } = MyValidators;
    this.validateForm = this.fb.group({
      username: ['', [required, maxLength(12), minLength(3)]],
      phone: ['', [required, phone]],
      role:['', [required]],
      email: ['', [required, email]],
      password: ['', [required]],
      major:[''],
      confirm: ['', [this.confirmValidator]]
    });
  }

  //注册
  submitForm(): void {
    console.log(this.validateForm.value);
    this.userService.myPost("/user/register",JSON.stringify(this.validateForm.value)).subscribe(res=>{
      if(res.code == 0){
        this.message.info("用户注册成功！");
        this.closeModual.emit(this.validateForm.value.username);
      }else if(res.code == 10003){
        this.message.error("用户名已经存在，请重新输入！",{nzDuration:3})
      }else{
        this.message.error("注册失败！")
      }
    })
   // this.userService.httpPost("/user/register",this.validateForm.value,this,"register");
  }
}


export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'zh-cn': `最小长度为 ${minLength}`, en: `MinLength is ${minLength}` } };
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'zh-cn': `最大长度为 ${maxLength}`, en: `MaxLength is ${maxLength}` } };
    };
  }

  static phone(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value) ? null : { phone: { 'zh-cn': `手机号码格式不正确`, en: `phone phone number is not valid` } };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value: string): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}