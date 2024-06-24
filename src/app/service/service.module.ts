import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ServiceRoutingModule } from "./service-routing.module";
import { ServiceComponent } from "./service.component";
import { ServiceService } from "./service.service";
import { TreeModule } from "primeng/tree";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
// import { AngularFontAwesomeModule } from "angular-font-awesome";
import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { NgxSpinnerModule } from "ngx-spinner";
// import { LoadingComponent } from "../shared/loading/loading.component";
import { SimpleNotificationsModule } from "angular2-notifications";
import { TranslateModule } from "@ngx-translate/core";
// import { SidebarModule } from "ng-sidebar";
import { BrowserModule } from "@angular/platform-browser";
import { FileUploadModule } from "primeng/fileupload";
// import { NgxPaginationModule } from "ngx-pagination";
// import { FormDisplayComponent } from "./form-display/form-display.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
// import { Ng2SearchPipeModule } from "ng2-search-filter";

// import { SurveyComponent } from "./task-layout/layout.component";
// import { DemoComponent } from "./demo/demo.component";

// import { FormNotFoundComponent } from "../shared/form-not-found/form-not-found.component";
// import { PayrollAdditionTypeComponent } from "./payroll-addition-type/payroll-addition-type.component";
// import { PayrollDeductionTypeComponent } from "./payroll-deduction-type/payroll-deduction-type.component";
import { EmployeeInformationComponent } from "./employee-information/employee-information.component";
// import { CerteficateTypeComponent } from "./certeficate-type/certeficate-type.component";
// import { UserComponent } from "./user/user.component";
// import { cEmployeeComponent } from "./cEmployee/cEmployee.component";
// import { jobPositionComponent } from "./jobPosition/jobPosition.component";
// import { EmployeeInformationHolderComponent } from "./employee-information-holder/employee-information-holder.component";
// import { WorkinfoComponent } from "./workinfo/workinfo.component";
// import { SkillComponent } from "./skill/skill.component";
// import { TrainingComponent } from "./training/training.component";
// import { AdvancedComponent } from "./advanced/advanced.component";
// import { MedicalInfoComponent } from "./medical-info/medical-info.component";
// import { StructureComponent } from "./structure/structure.component";
// import { EmployementRequestComponent } from "./employement-request/employement-request.component";
// import { DepartmentComponent } from "./department/department.component";
// import { PayrollAdditionComponent } from "./payroll-addition/payroll-addition.component";
// import { PayrollDeductionComponent } from "./payroll-deduction/payroll-deduction.component";
// import { CourtdeductionComponent } from "./courtdeduction/courtdeduction.component";
// import { PayrolDeductionTypeComponent } from "./payrol-deduction-type/payrol-deduction-type.component";
// import { PayrolAdditionTypeComponent } from "./payrol-addition-type/payrol-addition-type.component";
// import { OrgStructureComponent } from "./org-structure/org-structure.component";
// import { JobPositionComponent } from "./job-position/job-position.component";
// import { DepartmentsComponent } from "./departments/departments.component";
import { DialogModule } from "primeng/dialog";
// import { PositionComponent } from "./position/position.component";
// import { SucessRegisterComponent } from "./sucess-register/sucess-register.component";

import { ProgressSpinnerModule } from "primeng/progressspinner";
// import { NumericDirective } from "./directive/numeric.directive";
// import { JobPositionTabsHolderComponent } from "./job-position-tabs-holder/job-position-tabs-holder.component";
import { NgxSmartModalModule } from "ngx-smart-modal";
// import { AccordionModule, InputTextModule, TabViewModule } from "primeng";
import { DropdownModule } from "primeng/dropdown";
// import { PayrollAdditionPopupComponent } from "./payroll-addition-popup/payroll-addition-popup.component";
// import { PayrollDeductionPopupComponent } from "./payroll-deduction-popup/payroll-deduction-popup.component";
import { ProgressBarModule } from "primeng/progressbar";
// import { EmployeeDocummentComponent } from './employee-documment/employee-documment.component';
// import { EmployeeDocumentDialogboxComponent } from './employee-document-dialogbox/employee-document-dialogbox.component';
// import { DisplayDynamicFormComponent } from './display-dynamic-form/display-dynamic-form.component'
import { StepsModule } from "primeng/steps";
// import { FormWizardModule } from 'angular2-wizard';
import { MatStepperModule } from "@angular/material/stepper";
import { MatIconModule } from "@angular/material/icon";
import { FileuploaderComponent } from "./fileuploader/fileuploader.component";
// import { BsModalService } from "ngx-bootstrap";
// import { DatepickerEthiopianDirective } from './datepicker-ethiopian.directive';
// import { EmployeeAdditionalDocumentsComponent } from './employee-additional-documents/employee-additional-documents.component';
// import { EmployeeDocumentHolderComponent } from './employee-document-holder/employee-document-holder.component';
// import { ProvisionUpgradeComponent } from './provision-upgrade/provision-upgrade.component';
// import { DndDirective } from "../shared/fileUploader/dnd.directive";

// import { ProgressComponent } from "../shared/fileUploader/progress/progress.component";
// import { EmployeeEvaluationComponent } from './employee-evaluation/employee-evaluation.component';

@NgModule({
  imports: [
    MatIconModule,
    MatStepperModule,
    // FormWizardModule,
    ProgressBarModule,
    StepsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceRoutingModule,
    NgxSmartModalModule.forChild(),
    // AngularFontAwesomeModule,
    TreeModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    TabsModule.forRoot(),
    CheckboxModule,
    ToastModule,
    MatDialogModule,
    ProgressSpinnerModule,
    MatButtonModule,
    // NgxPaginationModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forChild({}),
    // SidebarModule.forRoot(),
    // NgxSpinnerModule,
    FileUploadModule,
    // Ng2SearchPipeModule,

    DropdownModule,
    // TabViewModule ,
    // AccordionModule
  ],
  declarations: [
    FileuploaderComponent,
    // ProgressComponent,
    // DndDirective,
    // PayrollAdditionPopupComponent,
    ServiceComponent,
    // NumericDirective,
    // SurveyComponent,
    // LoadingComponent,
    // EmployementRequestComponent,
    // FormNotFoundComponent,
    // FormDisplayComponent,
    // DemoComponent,
    // PayrollAdditionTypeComponent,
    // PayrollDeductionTypeComponent,
    EmployeeInformationComponent,
    // StructureComponent,
    // DepartmentComponent,
    // CerteficateTypeComponent,
    // UserComponent,
    // cEmployeeComponent,
    // jobPositionComponent,
    // EmployeeInformationHolderComponent,
    // WorkinfoComponent,
    // SkillComponent,
    // TrainingComponent,
    // AdvancedComponent,
    // MedicalInfoComponent,
    // PayrollAdditionComponent,
    // PayrollDeductionComponent,
    // CourtdeductionComponent,
    // PayrolDeductionTypeComponent,
    // PayrolAdditionTypeComponent,
    // OrgStructureComponent,
    // JobPositionComponent,
    // DepartmentsComponent,
    // PositionComponent,
    // SucessRegisterComponent,
    // JobPositionTabsHolderComponent,
    // PayrollDeductionPopupComponent,
    // EmployeeDocummentComponent,
    // EmployeeDocumentDialogboxComponent,
    // DisplayDynamicFormComponent,
    // DatepickerEthiopianDirective,
    // EmployeeAdditionalDocumentsComponent,
    // EmployeeDocumentHolderComponent,
    // ProvisionUpgradeComponent,
    // EmployeeEvaluationComponent
  ],
  providers: [ServiceService, MessageService, ConfirmationService],
  entryComponents: [
    // PayrollDeductionPopupComponent,
    // PayrollAdditionPopupComponent,
    // PayrollDeductionTypeComponent,
    // PayrollAdditionTypeComponent,
    // UserComponent,
    // cEmployeeComponent,
    // jobPositionComponent,
    // EmployementRequestComponent,
    // DepartmentComponent,
    // StructureComponent,
    // PayrollAdditionComponent,
    // PayrollDeductionComponent,
    // DepartmentsComponent,
    // PositionComponent,
    // SucessRegisterComponent,
    // BsModalService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ServiceModule {}
