import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectorRef,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
// import { UserComponent } from "../user/user.component";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { ConfirmationService } from "primeng/api";
import { environment } from "src/environments/environment";
import { ServiceService } from "../service.service";
// import { UserComponent } from "../user/user.component";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
// import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { ThrowStmt } from "@angular/compiler";
import { DatePipe } from "@angular/common";
import { ProgressSpinnerModule } from "primeng/progressspinner";
// import { EmployeeDocumentService } from "../employee-document-service/employee-document.service";
// import {
//   convertToGC,
//   toEthiopianDateString,
//   toEthiopianMonthString,
//   toEthiopianDayString,
//   convertToGCtest,
//   convertYearToGC,
// } from "../../../gc-to-ethiopian-calendar";
import { Router } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { DomSanitizer } from "@angular/platform-browser";
// import { log } from "console";
@Component({
  selector: "app-employee-information",
  templateUrl: "./employee-information.component.html",
  styleUrls: ["./employee-information.component.css"],
  providers: [DatePipe],
})
export class EmployeeInformationComponent implements OnInit {
  @Output() fileuploadactive: EventEmitter<any> = new EventEmitter();
  @Output() GetEmployeeID: EventEmitter<any> = new EventEmitter();

  loadings: boolean = true;
  Gender: any;
  martialStatus: any;
  currentYear: number = new Date().getFullYear() - 8;
  EmployeeForUpdate: Employee;
  empList: any;
  public id: string;
  operation: boolean = false;
  trainAppId: string;
  emp: any;
  empID: any;
  Spbank: any;
  Orderid: any;
  photoModal: BsModalRef;
  trainAppStatus: any;
  appCode: string;
  ServID: string;
  taskID: string;
  orgID: string;
  username: string;
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;
  docID: string;
  todoID: string;
  servCode: string;
  vendorList: any;
  AppNo: string;
  servName: string;
  licenceService;
  licenceData: any;
  hrUser: any;
  ID: any;
  savedstatus: boolean = false;
  photovalid: boolean = true;
  data: [][];
  public selectedImage: any;
  public bstrrr = "";
  public bstrrrr = "";
  nationalityList: any;
  Employee: Employee = {} as Employee;
  // Workinfo: Workinfo = {} as Workinfo;
  EmployementTypes: any;
  config: any = {
    itemsPerPage: 1,
    currentPage: 1,
  };
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: "<<",
    nextLabel: ">>",
    screenReaderPaginationLabel: "Pagination",
    screenReaderPageLabel: "page",
    screenReaderCurrentLabel: `You're on page`,
  };
  aa: number;
  result: {}[];
  unfinished: number;
  finished: number;
  getno: any;
  aaa: any;
  success: number;
  empListt: any;
  failed: number;
  hidden: boolean = false;
  abc: {}[];
  employee: {
    orderid: any;
    trans_initate_time: any;
    top_short_code: any;
    short_code: any;
    biz_org_name: any;
    trans_status: any;
    debit_party_mnemonic: any;
    credit_party_mnemonic: any;
    amount: any;
    billReferenceNumber: any;
    bank_name: any;
    isdupl: any;
    // isred: any;
  }[];
  dept: any;
  workinfolist: any;
  getnoo: any;
  successs: number;
  failled: number;
  aab: any;
  workinfolistt: any;
  loading: boolean;

  display: boolean;
  temp: any;
  showAllError: boolean = false;
  showItemError: boolean = false;
  recordNotFound: boolean = false;
  Employee_ID: any;
  showError: boolean;
  worktemp: any;
  empListtemp: any;
  displayu: boolean = false;

  validwheninsert: boolean = true;
  valid: boolean = false;
  deparmentAlllist: any;
  structure: any;
  file: any;
  searchresult: boolean;
  BankName: any;
  mimeType: any;
  fileupload: string;
  uploadedDocumnet: boolean;
  uploadcontract: boolean;
  documentupload: any = null;
  EmployementTypesPostingGroup: any;
  leaveyear3: any = 0;
  leaveyear2: any = 0;
  leaveyear1: any = 0;
  selectedRows: number[] = [];
  uniqueEmployees: any[] = [];
  C_Bank: any[] = [];
  duplicateEmployees: any[] = [];
  displayDialog: boolean = false;
  isInBank: { [key: string]: boolean } = {};
  test: any[];
  oCbank: boolean;
  bankname: any[] = [];
  displayCheckBankDialog: boolean = false;
  searchForm: FormGroup;
  sortField: string;
  sortOrder: number;
  selectedRowsForpay: any = [];
  constructor(
    private cdr: ChangeDetectorRef,
    public serviceService: ServiceService,
    private dialog: MatDialog,
    // private modalService: BsModalService,
    private datepipe: DatePipe,
    private confirmationService: ConfirmationService,
    public notificationsService: NotificationsService,
    // private empService: EmployeeDocumentService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.serviceService.disableBrowserBackButton();
    // this.searchForm = this.fb.group({
    //   searchTerm: [""],
    // });
  }

  ngOnInit() {
    // this.CheckBank();
  }
  highlightColumn(event: any) {
    const headers = document.querySelectorAll("th");
    headers.forEach((header) => header.classList.remove("highlight"));

    if (event.column) {
      event.column.headerElement.classList.add("highlight");
    }
  }

  sortColumn(event: any) {
    this.sortField = event.field;
    this.sortOrder = this.sortOrder === 1 ? -1 : 1;
    this.highlightColumn(event);
  }

  isEmployeeInBank(employee: any) {
    this.C_Bank.filter((bankEntry) => bankEntry.orderid === employee.orderid);
    console.log("tests", this.C_Bank);
  }
  checkDis(isdiabled) {
    if (isdiabled.disabled == true) {
      const toast = this.notificationsService.warn(
        "warning!",
        "This is Already inside the C-Bank Table",
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        }
      );

      console.log("checkDis(isdiabled)", "can not select it");
    } else {
      console.log("checkDis(isdiabled)", "you can  select it");
    }
  }
  checkleavenumber(event: any) {
    const value = event.target.value;
    if (value < 0) {
      event.target.value = "1";
      this.serviceService.AddEmployee.controls["leave"].setValue(1); // Update the model value as well
    }
  }
  showDialog() {
    this.display = true;
  }
  exportSingle() {
    this.exportToExcel();
  }

  exportToExcel(): void {
    const table = document.getElementById("data-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table, { raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s: any): ArrayBuffer {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }

    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_data.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  }
  onFileDropped($file) {
    // Handle the dropped files here
    console.log("Dropped files:", $file);
    // Perform any necessary operations with the files

    this.uploadedFile($file);
  }
  uploadedFile(event: any) {
    // this.C_Bank = [
    //   {
    //     orderid: "BF769SYTS8",
    //     trans_initate_time: "6/7/24 14:24",
    //     top_short_code: "5301",
    //     short_code: "520900",
    //     biz_org_name: "FHC B1",
    //     trans_status: "Authorized",
    //     debit_party_mnemonic: "251955495555 - ABDULAZIZ JEMAL HUSSIEN",
    //     credit_party_mnemonic: "520900 - FHC B1",
    //     Amt: "48195.35",
    //     BillReferenceNumber: "012405",
    //   },
    // ];
    this.hidden = false;
    this.loading = true;
    // this.gettemployee()
    // this.getWorkInfoo()
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error("canot use multiple file");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.bstrrr = e.target.result.toString();

      console.log("excel1", this.bstrrr);
      const wb: XLSX.WorkBook = XLSX.read(this.bstrrr, { type: "binary" });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: 1,
        dateNF: "dd/mm/yyyy hh:mm:ss",
      });
      console.log("data ::", this.data);
      const [keysList, ...valuesList] = this.data;
      this.result = valuesList.map((values) => {
        let obj = {};
        values.forEach((val, i) => {
          obj[keysList[i]] = val;
        });
        return obj;
      });

      this.employee = Object.keys(this.result).map((e) => ({
        orderid: this.result[e].orderid,
        trans_initate_time: this.result[e].trans_initate_time,
        top_short_code: this.result[e].top_short_code,
        short_code: this.result[e].short_code,
        biz_org_name: this.result[e].biz_org_name,
        trans_status: this.result[e].trans_status,
        debit_party_mnemonic: this.result[e].debit_party_mnemonic,
        credit_party_mnemonic: this.result[e].credit_party_mnemonic,
        amount: this.result[e].amount,
        billReferenceNumber: this.result[e].billReferenceNumber,
        bank_name: this.result[e].bank_name,
        isdupl: false,
        // isred: false,
      }));
      // this.serviceService.getcbank(this.employee.orderid).subscribe((data) => {
      //   this.C_Bank = data["procCBankDeposits"];
      //   // ;
      // });
      const bankOrderIds = this.C_Bank.map((bankEntry) => bankEntry.orderid);
      bankOrderIds.forEach((orderId) => {
        this.isInBank[orderId] = true;
      });
      this.separateDuplicates();

      this.worksheet = ws;
      // this.serviceService.AddEmployee.controls["log"].setValue(this.bstrrr);
    };
    this.displayu = false;
    reader.readAsBinaryString(target.files[0]);
    //this.readExcel();
    //removeFile();
  }

  SPBank(rowData: any) {
    console.log(
      "🚀 ~ EmployeeInformationComponent ~ SPBank ~ rowData:",
      rowData
    );
    if (rowData.orderid) {
      this.serviceService.getSPBank(rowData.orderid).subscribe(
        (data) => {
          console.log(
            "🚀 ~ EmployeeInformationComponent ~ SPBank ~ data:🚀 ~ EmployeeInformationComponent ~ SPBank ~ data:",
            data
          );
          this.Spbank = data; // Assuming the response is directly the Spbank object
          console.log("Spbank", this.Spbank);
          if (data[0].resultCode == "0") {
            this.notificationsService.success("Success!", data[0].resultDesc, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            this.CheckBank();
          } else if (data[0].resultCode != "0") {
            this.notificationsService.error("error!", data[0].resultDesc, {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
          }
        },
        (err) => {
          console.error(
            "🚀 ~ EmployeeInformationComponent ~ SPBank ~ err:",
            err
          );
          this.notificationsService.error(
            "Error!",
            "Failed to retrieve SPBank information.",
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            }
          );
        }
      );
    } else {
      this.notificationsService.error("Error!", "Order ID is not provided.", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });
    }
  }

  Payment() {
    if (this.selectedRowsForpay.length > 0) {
      this.selectedRowsForpay.forEach((row) => {
        this.serviceService.PayEmployee(row).subscribe(
          (res) => {
            this.notificationsService.success(
              "Success!",

              {
                timeOut: 3000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: true,
              }
            );
            // this.Payment();

            // Set isred flag if the payment is successful
            // row.isred = true;
          },
          (err) => {
            this.notificationsService.error("Error!", "Failed to insert .", {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });

            // Optionally set isred flag if there is an error
            // row.isred = false; // Or handle differently based on your logic
          }
        );
      });
    } else {
      this.notificationsService.error(
        "Error!",
        "No rows selected for payment.",
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        }
      );
    }
  }

  // for (var i = 0; i < this.result.length; i++) {
  //   this.Payment(this.selectedRows[i]);
  // }
  CheckBank() {
    this.serviceService.getbankreco().subscribe({
      next: (res) => {
        console.log("resssss", res);
        this.bankname = res;
        this.displayCheckBankDialog = true;
      },
      error: console.log,
    });
  }

  separateDuplicates() {
    const countMap: { [key: string]: number } = {};
    this.employee.forEach((emp) => {
      this.serviceService.getcbank(emp.orderid).subscribe((data) => {
        if (data["procCBankDeposits"].length != 0) {
          this.C_Bank = data["procCBankDeposits"];
          console.log("this.C_Bank", this.C_Bank);
          emp.isdupl = true;
          // debugger;
        }
      });
      countMap[emp.orderid] = (countMap[emp.orderid] || 0) + 1;
    });

    this.uniqueEmployees = this.employee.filter((emp) => {
      // if ((emp.isdupl = true)) {
      //   debugger;
      // }
      if (countMap[emp.orderid] > 1) {
        // countMap.isdupl == true
        this.duplicateEmployees.push(emp);
        return false;
      }

      // debugger;
      return true;
    });
    console.log("this.uniqueEmployees", this.uniqueEmployees);

    // Optionally, sort the duplicate employees if needed
    this.duplicateEmployees.sort((a, b) => a.orderid - b.orderid);

    this.cdr.detectChanges(); // Manually trigger change detection
  }
  readAsCSV() {
    this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);
    const data: Blob = new Blob([this.csvData], {
      type: "text/csv;charset=utf-8;",
    });
    FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + ".csv");
  }
  toggleRowSelection(index: number) {
    if (this.selectedRows.includes(index)) {
      this.selectedRows = this.selectedRows.filter((i) => i !== index);
    } else {
      this.selectedRows.push(index);
    }
  }
  extractExtensionFromFileName(fileName) {
    if (fileName) {
      let fileNameSegment = (fileName as string).split(".");
      return `application/${fileNameSegment[fileNameSegment.length - 1]}`;
    }
    return "";
  }
  Uploader(event) {
    this.documentupload = null;
    console.log(event);
    const fileInput = event.target.files[0];
    fileInput.value = ""; // set the value to an empty string first
    fileInput.value = fileInput.name; // now set it to the desired value

    const reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = () => {
      const photoDataUrl = reader.result as string;
      this.documentupload = photoDataUrl; // set the photo preview
      const base64String = photoDataUrl.split(",")[1]; // get the base64 encoded string
      this.serviceService.AddEmployee.patchValue({
        photo: base64String,
      });
    };
  }

  upload(event) {
    console.log(event);
    if (event.srcElement.files[0].type != "image/jpeg") {
      const toast = this.notificationsService.error(
        "error!",
        "only #jpg image type supprted ",
        {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        }
      );
      return;
    } else {
      if (event.target.files[0].size > 15000) {
        const toast = this.notificationsService.error(
          "error",
          "maximum file size is 15KB"
        );
        this.valid = true;
      } else {
        this.photovalid = false;
        this.valid = false;
        console.log("event", event);
        console.log("files", event.target.files[0]);
        this.Uploader(event);
      }
    }
  }
  previewdocumnet(file) {
    //console.log(file)
    try {
      // let fileData = JSON.parse(window.atob(file));
      //  let { type, data } = fileData;
      //  this.mimeType=type
      //  this.fileupload= "data:" + type + ";base64, " + data;
      this.uploadedDocumnet = true;
      this.uploadcontract = false;

      //  this.documentupload= this.sanitizer.bypassSecurityTrustResourceUrl(
      //           this.fileupload
      //         );

      this.documentupload = `data:image/jpeg;base64,${file}`;
      this.photovalid = false;
      this.valid = false;
      //console.log(this.documentupload);
      return file;
    } catch (e) {
      console.error(e);
    }
  }
  handleUpload(event) {
    console.log(event);
    const File = event.target.files[0];
    this.file = File;
    this.photovalid = false;

    console.log("file ::", File);
    if (File.size > 15000) {
      this.valid = true;
      this.selectedImage = "";
      return;
    } else {
      this.valid = false;
      const reader = new FileReader();
      reader.readAsDataURL(File);
      reader.onload = () => {
        this.selectedImage = reader.result.toString();
        this.file = this.selectedImage.length;
        console.log("selected image ::", this.file);
        if (this.file > 20000) {
          this.valid = true;
          this.selectedImage = "";
          return;
        }
        this.serviceService.AddEmployee.controls["photo"].setValue(
          reader.result.toString().split(",")[1]
        );
      };
    }
  }
}
export class Employee {
  employee_Id: string;
  user_ID: string;
  type_Employement: string;
  payrole_No: string;
  tin: string;
  fName: string;
  lName: string;
  mName: string;
  address: string;
  email: string;
  homePhone: string;
  workPhone: string;
  idNumber: string;
  photo: string;
  bank_Account_NO: string;
  bank_Name: string;
  birthDate: Date;
  marrage_Status: string;
  gender: string;
  country: string;
  active: true;
  hired: Date;
  terminated: Date;
  rehired: Date;
  log: string;
}

function removeFile() {
  throw new Error("Function not implemented.");
}
