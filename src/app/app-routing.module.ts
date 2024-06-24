import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeInformationComponent } from "./service/employee-information/employee-information.component";

const routes: Routes = [
  // Other routes...
  { path: "**", component: EmployeeInformationComponent },
  // Other routes...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
