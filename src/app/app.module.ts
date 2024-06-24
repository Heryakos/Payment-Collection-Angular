import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceComponent } from "./service/service.component";
//import { ServiceRoutingModule } from './service/service-routing.module';
// import { PaymentComponent } from "./service/payment/payment.component";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { NgxSmartModalModule } from "ngx-smart-modal";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { ServiceService } from "./service/service.service";
import { APP_BASE_HREF } from "@angular/common";
import { NotificationsService } from "angular2-notifications";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import "ngx-toastr/toastr.css";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SimpleNotificationsModule } from "angular2-notifications";
import { DialogModule } from "primeng/dialog";
import { environment } from "src/environments/environment";
import { LoadingBarService } from "./loading-bar/loading-bar.service";

import { LoadingBarInterceptor } from "./loading-bar/loading-bar-interceptor";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { LoadingBarcdComponent } from "./loading-bar/loading-barcd/loading-barcd.component";
import { ServiceModule } from "./service/service.module";
import { DemoComponent } from "./service/demo/demo.component";
// import { EmployeeInformationHolderComponent } from "./service/employee-information-holder/employee-information-holder.component";

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    // EmployeeInformationHolderComponent,
    // PaymentComponent,
    LoadingBarComponent,
    LoadingBarcdComponent,
  ],
  // entryComponents: [PaymentComponent],
  exports: [TableModule],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //ServiceRoutingModule
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    DialogModule,
    ServiceModule,
    NgxSmartModalModule.forRoot(),
    CheckboxModule,
    HttpClientModule,
    ConfirmDialogModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      preventDuplicates: true, // Optional: Prevent duplicate toasts
      positionClass: "toast-bottom-right", // Optional: Set the position of the toasts
    }),
  ],
  providers: [
    ServiceService,
    { provide: APP_BASE_HREF, useValue: window["_app_base"] },
    NotificationsService,
    ConfirmationService,
    LoadingBarService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingBarInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.phisicalPath, ".json");
}
