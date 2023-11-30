import { Component, OnInit } from '@angular/core';
import { PDFProgressData } from 'pdfjs-dist';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
     private fb:FormBuilder,
      private userService: UserServiceService,
  ) { }
  //pdfSrc="../../../assets/测试.pdf";
 
  onProgress(progressData:PDFProgressData){

  }
  pageRendered(e: CustomEvent){

  }
  pdfSrc
  ngOnInit(): void {
   // this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    //this.pdfSrc = "../../../assets/file/测试.pdf"
    this.initData();
    this.createOrEdit();
    this.creatForm();


  }
  offsetTop = 10;
  nzOffsetBottom = 10;

  setOffsetTop(): void {
    this.offsetTop += 10;
  }

public data;
  public initData(){
    this.userService.myGet("/equipment/getEquipmentById?id=6644f64f-688b-4f84-bf53-5d157c5f7206").subscribe(res=>{
      if(res.code ==0){
        this.data = res.data;
      }
    })
  }
  
  
createOrEdit(){
    if(this.isEdit){ // 如果是编辑的时候，就禁用掉该输入框
    this.isDisabled = true;
    return;
  }
    this.isDisabled = false;
    this.creatForm();
}

private isEdit: boolean = true;
private isDisabled = true;
private myForm: FormGroup;

creatForm() {
    this.myForm = this.fb.group({
      roleName:[{ value:this.roleParams.roleName,disabled:this.isDisabled}]
    });
  }

  public  roleParams = {
roleName:'',
items:['全部权限']
}

}
