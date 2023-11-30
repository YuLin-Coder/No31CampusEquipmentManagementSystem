import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NzSafeAny, NzMessageService } from 'ng-zorro-antd';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {
  validateForm: FormGroup;
  @Output() closeModual = new EventEmitter();
  @Input()
  public username;
  constructor(private fb: FormBuilder,
    private userService: UserServiceService,
    private message: NzMessageService) {
    const { required } = MyValidators;
    this.validateForm = this.fb.group({
      username: [''],
      password: ['', [required]],
      confirm: ['', [this.confirmValidator]]
    });
  }

  ngOnInit(): void {
  }

 //修改
  submitForm(): void {
    console.log(this.validateForm.value);
    let param = {
        "username": this.validateForm.value.username,
        "password": this.validateForm.value.password
   };
    this.userService.myPost("/user/modifyPwd",JSON.stringify(param)).subscribe(res=>{
      if(res.code == 0){
        this.message.info("用户密码修改成功！");
        this.closeModual.emit(this.validateForm.value.username);
      }else{
        this.message.error("用户密码修改失败！")
      }
    })
  }
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

   validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
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
