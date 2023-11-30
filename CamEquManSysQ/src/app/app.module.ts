import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { LoginComponent } from './components/login/login.component';
registerLocaleData(zh);
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserServiceService } from './service/user-service.service';
import { EquipmentClassificationComponent } from './components/equipment-classification/equipment-classification.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterComponent } from './components/register/register.component';
import { PageComponent } from './components/page/page.component';
import { CampusEquipmentManualComponent } from './components/campus-equipment-manual/campus-equipment-manual.component';
import { CampusEquipmentIntroductionComponent } from './components/campus-equipment-introduction/campus-equipment-introduction.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PurchaseComponent } from './components/equipment-record/purchase/purchase.component';
import { ServicingComponent } from './components/equipment-record/servicing/servicing.component';
import { RecoveryComponent } from './components/equipment-record/recovery/recovery.component';
import { DiscardComponent } from './components/equipment-record/discard/discard.component';
import { ModifyPasswordComponent } from './components/modify-password/modify-password.component';
import { UseEquimentComponent } from './components/equipment-record/use-equiment/use-equiment.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EquipmentClassificationComponent,
    MainPageComponent,
    RegisterComponent,
    PageComponent,
    CampusEquipmentManualComponent,
    CampusEquipmentIntroductionComponent,
    PurchaseComponent,
    ServicingComponent,
    RecoveryComponent,
    DiscardComponent,
    ModifyPasswordComponent,
    UseEquimentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzFormModule,
    ReactiveFormsModule,
    PdfViewerModule
    
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
