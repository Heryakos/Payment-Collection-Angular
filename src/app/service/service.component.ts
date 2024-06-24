import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ServiceService } from "./service.service";
import { HttpClient } from "@angular/common/http";
import { NotificationsService } from "angular2-notifications";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
// import { LayoutService } from "./task-layout/layout.service";
import { environment } from "src/environments/environment";
import { EventEmitter } from "events";
import { DomSanitizer, Title } from "@angular/platform-browser";

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./demo/demo.component.scss"],
})
export class ServiceComponent implements OnInit {
  _opened = false;
  public ID = 0;
  loading = true;
  licenceService;
  licenceData: any;
  //history
  serviceEvent = new EventEmitter();
  eventTypes = {
    JSONFOUND: "ev001",
    ALREADYAPPLIED: "ev002",
  };
  errorType = {
    APPLICATIONCOMPLETED: 1,
    TASKCOMPLETED: 2,
  };
  isAlreadyApplied = false;
  showOverlay = false;
  appliedNow = false;
  countDownString = "";
  warnMessage: "";
  //

  AppNo;
  tskTyp;
  DropDownList;
  disablefins = true;
  DocID;
  todoID;
  tskID;
  SDP_ID;
  Service_ID;
  Licence_Service_ID;
  FormData;
  PriveLicence;
  AppNoList;
  PriveAppNoList;
  PreAppData;
  PreTaskData;
  AppN;
  TaskN;
  preAppID;
  formcode;
  selectedTask;
  ifAppNo = false;
  ifTask = false;
  ifTaskDetail = false;
  selectedpreTask;
  userName;
  serviceId;
  RequerdDocs;
  Application_No: string;
  Service_Name: string;
  //for review button
  RequerdDocspre;
  SavedFilespre;
  SelectedpreApp;
  SavedFiles;
  validated;
  NoteObj = { remarks: "", postit_note_code: "" };
  preNoteObj = { remarks: "", postit_note_code: "" };
  //for review button
  displayRivew;

  public CustomerTypeLookUP;
  public CustomerLookUP;
  public CustomerBankLookUP;
  public SuspendedReasonLookUP;
  public PropertyTypeLookUP;
  public PropertyStatusLookUP;
  public ServiceDeliveryUnitLookUP;
  public WoredaLookUP;
  public PlotStutusLookUP;
  public PlotLandUseLookUP;
  public TransferTypeLookUP;
  public Lease_Type_Lookup;
  modalRef: BsModalRef;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    public serviceService: ServiceService,
    private router: Router,
    private notificationsService: NotificationsService
  ) // private service: LayoutService
  {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params["formcode"] == "31b29d9e-ccac-4712-a6c0-3b54e848116a") {
        this.ID = 2;
      } else if (params["formcode"] == "0c1830d9-1bf7-46fc-9a7e-acf80d1bf5ff") {
        this.ID = 3;
      } else if (params["formcode"] == "138ee41d-cad3-4a48-9cd5-ac39bdeb3a53") {
        this.ID = 4;
      } else if (params["formcode"] == "e7ce4a80-daaa-4d30-b9e9-04406f62d563") {
        this.ID = 5;
      } else if (params["formcode"] == "136b4bcc-dbcf-4b71-8d9f-e7e9a21ef92b") {
        this.ID = 6;
      } else if (params["formcode"] == "85b9740e-6b1a-4276-8496-c57d8dab6f7a") {
        this.ID = 7;
      } else if (params["formcode"] == "99f34f3b-4c78-4d85-9f1d-49a53a6a1519") {
        this.ID = 9;
      } else if (params["formcode"] == "99f34f3b-4c78-4d85-9f1d-49a53a6a1520") {
        this.ID = 10;
      } else if (params["formcode"] == "138ee41d-cad3-4a48-9cd5-ac39bdeb3a53") {
        this.ID = 11;
      } else {
        // this.serviceEvent.on(this.eventTypes.JSONFOUND, () => {
        //   this.service.getFormData(params["formcode"]).subscribe(
        //     (data) => {
        //       this.ID = 1;
        //     },
        //     (error) => {
        //       this.ID = 8;
        //     }
        //   );
        // });
      }

      ///for browser histroy link

      this.serviceEvent.on(this.eventTypes.ALREADYAPPLIED, (eventData) => {
        console.log("%cevent data :: ", "color:green", eventData);
        let alertMessage = "you already have gone through this task!";
        this.showOverlay = true;
        console.warn(alertMessage);
        this.warnMessage = eventData["message"];
        this.countDown(5);
      });
      ///bowsert history link
      this.loading = false;
      this.userName = environment.username;
      console.log(this.userName);
      this.serviceService.ApplicationNo = params["AppNo"];
      this.serviceId = params["id"];
      if (
        this.serviceService.ApplicationNo == undefined ||
        this.serviceService.ApplicationNo == null
      ) {
        this.getAll(this.serviceId);
      } else {
        this.getAll(params["AppNo"]);
      }
      this.Application_No = params["AppNo"];
      this.AppNo = this.Application_No;
      this.serviceId = params["id"];
      this.serviceService.servID = this.serviceId;
      this.tskTyp = params["tskTyp"];
      this.tskID = params["tskID"];
      this.serviceService.taskID = this.tskID;
      this.todoID = params["todoID"];
      this.serviceService.todo = this.todoID;
      if (this.tskTyp == "c800fb16-f961-e111-95d6-00e04c05559b") {
        this.getTaskRule(params["tskID"]);
      }
      this.DocID = params["docid"];
      console.log(this.DocID);
      this.serviceService.docID = this.DocID;

      this.todoID = params["todoID"];
      this.formcode = params["formcode"];
    });

    // this.getLookups();
    this.getRequiredDocs(this.tskID);
  }

  //for browser history
  countDown(seconds: number) {
    let countDownStart = 0;
    let intervalHolder = null;
    if (seconds > 0) {
      countDownStart = Math.floor(seconds);
      intervalHolder = setInterval(() => {
        this.countDownString = countDownStart.toString();
        countDownStart--;
        if (countDownStart < 0) {
          this.Close();
          clearInterval(intervalHolder);
        }
      }, 1000);
    }
  }
  //browser history

  _toggleOpened(): void {
    this._opened = !this._opened;
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign({}, { class: "gray modal-lg" })
  //   );
  // }

  // closeModal() {
  //   // console.log('closeing.....');
  //   this.modalRef.hide();
  // }

  getRequiredDocs(v) {
    console.log("uploaddddddd", this.tskID);

    this.serviceService.getRequerdDocs(this.tskID).subscribe(
      (RequerdDocs) => {
        this.RequerdDocs = RequerdDocs;

        console.log("RequerdDocs", this.RequerdDocs);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  Uploader(File, RequiredDoc, fild) {
    console.log("RequiredDoc", RequiredDoc);
    console.log("File ", File);
    let base64file;
    let fullbase64;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener("loadend", (e) => {
      base64file = reader.result;
      fullbase64 = base64file;
      const re = /base64,/gi;
      base64file = base64file.replace(re, "");
      base64file = base64file.split(";")[1];
      console.log("this.DocID", this.serviceService.docID);
      this.serviceService
        .saveFile(
          base64file,
          File.type,
          this.serviceService.AppNO,
          RequiredDoc.requirement_code,
          "Start",
          RequiredDoc.description_en,
          this.serviceService.docID
        )
        .subscribe(
          (message) => {
            console.log("message", message);
            if (message[0] !== "" || message[1] !== "" || message[2] !== "") {
              RequiredDoc.File =
                this.sanitizer.bypassSecurityTrustResourceUrl(fullbase64);
              RequiredDoc.fileName = File.name;
              RequiredDoc.fileType = File.type;
              RequiredDoc.document_code = message[2];
              fild.clear();
              const toast = this.notificationsService.success(
                "Success",
                "Uploaded successfully"
              );
              //this.updated.emit({ docs: this.RequerdDocs });
            } else {
              console.log("error");
              const toast = this.notificationsService.error(
                "Error",
                "SomeThing Went Wrong"
              );
            }
          },
          (error) => {
            console.log("error");
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
    });
    console.log("this.RequerdDocs", this.RequerdDocs);
  }

  upload(event, RequiredDoc, fild) {
    this.Uploader(event.files[0], RequiredDoc, fild);
    console.log("event", event);
    console.log("RequiredDoc", RequiredDoc);
    console.log("this.RequerdDocs", this.RequerdDocs);
    for (let i = 0; i < this.RequerdDocs.length; i++) {
      if (
        RequiredDoc.requirement_code === this.RequerdDocs[i].requirement_code
      ) {
        this.RequerdDocs[i].uploded = 1;
      }
    }
    console.log("files", event.files);
  }

  getAppData(appNO) {
    this.preAppID = 0;
    this.serviceService.getTodandAppNo(appNO).subscribe(
      (PreAppData) => {
        this.PreAppData = PreAppData;
        // this.PreAppData = PreAppData;
        for (let i = 0; i < this.PriveLicence.length; i++) {
          if (this.PriveLicence[i].Application_No == appNO) {
            this.SelectedpreApp = this.PriveLicence[i];
            console.log("this.SelectedpreApp", this.SelectedpreApp);
          }
        }
        this.GetNotePrevius(appNO);
        this.PreAppData = Object.assign([], this.PreAppData.Table);

        this.PreAppData.find((appData) => {
          if (appData.form_code === this.formcode) {
            this.FormData = appData.JsonData;
            console.log("json data pend and close :: ", appData.JsonData);
            return true;
          }
          return false;
        });

        this.serviceEvent.emit(this.eventTypes.JSONFOUND);

        let allTasks = [];

        if (!this.appliedNow) {
          this.serviceService
            .getUserInfoByUserName(environment.username)
            .subscribe((userInfo) => {
              if (userInfo.length > 0) {
                this.serviceService
                  .getMytasks(userInfo[0]["organization_code"])
                  .subscribe((tasks) => {
                    let applicationFound = false;
                    let isPickable = true;
                    let isTaskOne = false;
                    let warningData = {
                      message: "",
                      type: 0,
                    };
                    if (tasks["Table1"]) {
                      allTasks = tasks["Table1"];

                      allTasks.find((task) => {
                        console.log(
                          "task :: ",
                          task["step_no"],
                          " & ",
                          task["todo_comment"],
                          " app number :: ",
                          this.AppNo
                        );
                        if (this.AppNo && task["todo_comment"] == this.AppNo) {
                          applicationFound = true;
                          isTaskOne = false;
                          this.PreAppData.find((appData) => {
                            if (appData.tasks_task_code == this.tskID) {
                              console.warn(
                                "found already saved task :: ",
                                appData
                              );
                              if (task["tasks_id"] != this.tskID) {
                                console.warn("found already passed task");
                                isPickable = false;
                                warningData.message =
                                  "you already have gone through this task! redirecting to my task";
                                warningData.type = this.errorType.TASKCOMPLETED;
                                return true;
                              }
                              return true;
                            }
                            return false;
                          });
                        } else {
                          isTaskOne = true;
                          return false;
                        }
                        return false;
                      });
                      if (!applicationFound) {
                        if (isTaskOne) {
                          isPickable = true;
                        } else {
                          isPickable = false;
                          warningData.message =
                            "you have completed the application! redirecting to my task";
                          warningData.type = this.errorType.TASKCOMPLETED;
                        }
                      }

                      if (!isPickable) {
                        this.serviceEvent.emit(
                          this.eventTypes.ALREADYAPPLIED,
                          warningData
                        );
                      }
                    }
                  });
              }
            });
        }

        // this.PreAppData = (Object.assign({}, this.PreAppData.Table));
        // console.log('PreAppData', this.PreAppData);
        this.ifTask = true;
      },
      (error) => {
        console.log("error");
        this.serviceEvent.emit(this.eventTypes.JSONFOUND);
      }
    );
  }

  //for Review Button

  removeUpload(RequiredDoc) {
    this.serviceService.RemoveDoc(RequiredDoc.document_code).subscribe(
      (message) => {
        const toast = this.notificationsService.success("Sucess", message);

        for (let i = 0; i < this.RequerdDocs.length; i++) {
          if (
            this.RequerdDocs[i].requirement_code == RequiredDoc.requirement_code
          ) {
            this.RequerdDocs[i].File = "";
            this.RequerdDocs[i].document_code = "";
          }
        }
        console.log("RequerdDocs", this.RequerdDocs);
      },
      (error) => {
        console.log("error");
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }
  isvalidated(todoID, tskID, plotid, proid, DocID) {
    this.serviceService
      .isvalidated(todoID, tskID, plotid, proid, DocID)
      .subscribe(
        (Validated) => {
          console.log("validateing....");
          if (Validated == "Validated") {
            this.serviceService.validated = true;
            this.disablefins = false;
          } else {
            this.disablefins = true;
            this.serviceService.validated = false;
            const toast = this.notificationsService.warn("Warning", Validated);
          }
          // this.RequerdDocs = RequerdDocs;

          // this.getAllDocument();
          // console.log('RequerdDocs', this.RequerdDocs);
        },
        (error) => {
          console.log("error");
        }
      );
  }

  getToDo(todoID) {
    this.serviceService.getToDo(todoID).subscribe(
      (DocID) => {
        // const toast = this.notificationsService.warn('success', message);
        // this.RequerdDocs = RequerdDocs;
        this.DocID = DocID;
        this.isvalidated(
          this.serviceService.todo,
          this.tskID,
          "00000000-0000-0000-0000-000000000000",
          "00000000-0000-0000-0000-000000000000",
          this.serviceService.docID
        );
        // this.getAllDocument();
        // console.log('RequerdDocs', this.RequerdDocs);
      },
      (error) => {
        console.log("error");
      }
    );
  }
  DeleteNote() {
    this.serviceService
      .DeleteNote(this.serviceService.AppNO, this.NoteObj.postit_note_code)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Deleted sucessfully"
          );
          // this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  addNote() {
    this.serviceService
      .addNote(this.serviceService.AppNO, this.NoteObj.remarks, this.DocID)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success("Sucess", "Saved");
          // this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  uid: any;
  notes: any = [];
  GetNote(appNo) {
    this.serviceService.GetNote(appNo).subscribe(
      (note) => {
        if (note) {
          this.notes = note as Array<any>;
        }
        let num = 1;
        (this.notes as Array<any>).map((task) => (task["number"] = num++));
        console.log("notes = ", note);
      },
      (error) => {
        console.error("unable to get note");
      }
    );
  }
  sendNote() {
    this.serviceService
      .sendNote(
        this.NoteObj.remarks,
        this.serviceService.AppNO,
        this.serviceService.todo,
        this.serviceService.sdpID
      )
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Sent Sucessfully"
          );
          // this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  saveNote() {
    this.serviceService
      .saveNote(
        this.NoteObj.remarks,
        this.NoteObj.postit_note_code,
        this.serviceService.docID
      )
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Edited sucessfully"
          );
          // this.GetNote();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }
  SelectTask(task) {
    // console.log('task', task);
    this.selectedpreTask = task;
    this.selectedTask = task;
    this.GetNote(task.task_todocomment);
    this.getRequiredDocspre(task.tasks_task_code);
    this.getAllDocumentpre(this.SelectedpreApp.Licence_Service_ID, task.docId);
    if (task.form_code == "a7a1e05e-32c2-4f44-ad58-306572c64593") {
      this.preAppID = 2;
      // console.log('to', 2);
    } else if (task.form_code == "da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff") {
      this.preAppID = 3;
      // console.log('to', 3);
    } else if (task.form_code == "9e0834e9-7ec2-460c-a5ed-7ade1204c7ee") {
      this.preAppID = 4;
      // console.log('to', 4);
    } else if (task.form_code == "31b29d9e-ccac-4712-a6c0-3b54e848116a") {
      this.preAppID = 6;
    } else if (task.form_code == "138ee41d-cad3-4a48-9cd5-ac39bdeb3a53") {
      this.preAppID = 10;
    } else {
      this.preAppID = 1;
      // console.log('to', 1);
    }
    this.ifTaskDetail = true;
  }

  getRequiredDocspre(tskID) {
    this.serviceService.getRequerdDocs(tskID).subscribe(
      (RequerdDocs) => {
        this.RequerdDocspre = RequerdDocs;

        for (let i = 0; i < this.RequerdDocs.length; i++) {
          if (this.RequerdDocs[i].description_en == "Dummy") {
            this.RequerdDocs.splice(i, 1);
            break;
          }
        }
        this.getAllDocument();
        // console.log('RequerdDocs', this.RequerdDocs);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  Back() {
    this.serviceService
      .Back(this.serviceService.AppNO, this.serviceService.todo)
      .subscribe(
        (message) => {
          if (message == true) {
            const toast = this.notificationsService.success(
              "Success",
              "The process was backed to the priveyes stage successfully"
            );
            this.Close();
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }
  getAllDocument() {
    this.serviceService
      .getAllDocument(this.licenceData.Licence_Service_ID, this.DocID)
      .subscribe(
        (SavedFiles) => {
          this.SavedFiles = SavedFiles;
          for (let i = 0; i < this.RequerdDocs.length; i++) {
            for (let j = 0; j < SavedFiles.length; j++) {
              if (
                this.RequerdDocs[i].requirement_code ==
                SavedFiles[j].requirement_code
              ) {
                this.RequerdDocs[i].File =
                  "data:image/jpg;base64, " + SavedFiles[j].document;
                this.RequerdDocs[i].File =
                  this.sanitizer.bypassSecurityTrustResourceUrl(
                    this.RequerdDocs[i].File
                  );
                this.RequerdDocs[i].document_code = SavedFiles[j].document_code;
              }
            }
          }
          console.log("SavedFiles", this.SavedFiles);
        },
        (error) => {
          console.log("error");
        }
      );
  }

  getAllDocumentpre(Licence_Service_ID, DocID) {
    this.serviceService.getAllDocument(Licence_Service_ID, DocID).subscribe(
      (SavedFiles) => {
        this.SavedFilespre = SavedFiles;
        for (let i = 0; i < this.RequerdDocspre.length; i++) {
          for (let j = 0; j < SavedFiles.length; j++) {
            if (
              this.RequerdDocspre[i].requirement_code ==
              SavedFiles[j].requirement_code
            ) {
              this.RequerdDocspre[i].File =
                "data:image/jpg;base64, " + SavedFiles[j].document;
              this.RequerdDocspre[i].File =
                this.sanitizer.bypassSecurityTrustResourceUrl(
                  this.RequerdDocspre[i].File
                );
              this.RequerdDocspre[i].document_code =
                SavedFiles[j].document_code;
            }
          }
        }
        console.log("SavedFiles", this.SavedFiles);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  GetNotePrevius(AppNo) {
    this.serviceService.GetNote(AppNo).subscribe(
      (Notes) => {
        if (Notes) {
          console.log("NoteObj", Notes);
          this.preNoteObj = Notes[0];
        }
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  //for Review Button
  getTaskData(task) {
    this.preAppID = 0;
    this.PreTaskData = [];
    for (let i = 0; i < this.PreAppData.length; i++) {
      if (this.PreAppData[i].tasks_task_code == task) {
        // console.log('this.PreAppData[i]', this.PreAppData[i]);
        this.PreTaskData.push(this.PreAppData[i]);
      }
    }
    // console.log('PreTaskData', this.PreTaskData);
  }

  saveForm(formData) {
    //console.log('formData', formData);

    this.serviceService
      .saveForm(
        this.Licence_Service_ID,
        this.Service_ID,
        this.tskID,
        this.serviceService.sdpID,
        JSON.stringify(formData),
        this.DocID,
        this.todoID
      )
      .subscribe(
        (message) => {
          this.disablefins = false;
          //this.AppCode = message[0];
          this.DocID = message[1];
          this.todoID = message[2];
          this.serviceService.todo = this.todoID;
          this.serviceService.docID = this.DocID;
          this.getAll(message[0]);
          this.serviceService.disablefins = false;
          if (formData == "") {
            this.serviceService.validated = true;
            // this.isvalidated(this.todoID, this.tskID, '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', this.DocID);
          } else {
            const toast = this.notificationsService.success("Sucess", "Saved");
            this.isvalidated(
              this.todoID,
              this.tskID,
              "00000000-0000-0000-0000-000000000000",
              "00000000-0000-0000-0000-000000000000",
              this.DocID
            );
          }
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  getFormData(DocID) {
    this.serviceService.GetForm(DocID).subscribe(
      (FormData) => {
        this.FormData = FormData;

        this.FormData = JSON.parse(this.FormData);
        console.log(this.FormData);
        // this.FormData = (Object.assign({}, this.FormData));
        // console.log('FormData', FormData);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getTaskRule(tasksId) {
    this.serviceService.getTaskRule(tasksId).subscribe(
      (DropDownList) => {
        this.DropDownList = DropDownList;
        this.DropDownList = Object.assign([], this.DropDownList);
        // console.log('DropDownList', DropDownList);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  Close() {
    this.router.navigate(["/task/MyTask"]);
  }

  Submit(ruleid) {
    this.serviceService.disablefins = true;
    this.AppNo = this.serviceService.AppCode;
    this.DocID = this.serviceService.docID;
    this.todoID = this.serviceService.todo;
    this.serviceService
      .Submit(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          // console.log('message', message);
          const toast = this.notificationsService.success("Sucess", "sucesss");
          this.Close();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  SubmitAR(ruleid) {
    this.serviceService.disablefins = true;
    this.AppNo = this.serviceService.AppCode;
    this.DocID = this.serviceService.docID;
    this.todoID = this.serviceService.todo;
    this.serviceService
      .SubmitAR(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          if (message) {
            const toast = this.notificationsService.success(
              "Sucess",
              "sucesss"
            );
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
          this.Close();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  getLookups() {
    this.getCustomerTypeLookUP();
    this.getSuspendedReasonLookUP();
    this.getPropertyTypeLookUP();
    this.getPropertyStatusLookUP();
    this.getServiceDeliveryUnitLookUP();
    this.getWoredaLookUP();
    this.getPlotStutusLookUP();
    this.getPlotLandUseLookUP();
    this.getCustomerLookUP();
    this.getTransferTypeLookUP();
    this.getLease_Type_Lookup();
  }

  getPriveysLicence(certificate) {
    this.AppN = null;
    this.serviceService.getPriveys(certificate).subscribe(
      (PriveLicence) => {
        this.PriveLicence = PriveLicence;
        this.PriveLicence = Object.assign([], this.PriveLicence.list);
        this.AppNoList = [];
        for (let i = 0; i < this.PriveLicence.length; i++) {
          this.AppNoList[i] = {};
          this.AppNoList[i].Application_No =
            this.PriveLicence[i].Application_No;
        }
        this.PriveAppNoList = Object.assign([], this.AppNoList);
        if (this.PriveAppNoList.length > 0) {
          this.getAppData(this.PriveAppNoList[0]["Application_No"]);
        } else {
          this.serviceEvent.emit(this.eventTypes.JSONFOUND);
        }
        this.ifAppNo = true;
        this.AppN = this.AppNo;
        console.log("AppN", this.AppN);
        this.getAppData(this.AppN);
        this.TaskN = this.tskID;
      },
      (error) => {
        this.serviceEvent.emit(this.eventTypes.JSONFOUND);
        console.log("error");
      }
    );
  }

  getCustomerTypeLookUP() {
    this.serviceService.getCustomerTypeLookUP().subscribe(
      (CustomerTypeLookUP) => {
        this.CustomerTypeLookUP = CustomerTypeLookUP;
        this.CustomerTypeLookUP = Object.assign(
          [],
          this.CustomerTypeLookUP.list
        );
        //  console.log('CustomerTypeLookUP', CustomerTypeLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getSuspendedReasonLookUP() {
    this.serviceService.getSuspendedReasonLookUP().subscribe(
      (SuspendedReasonLookUP) => {
        this.SuspendedReasonLookUP = SuspendedReasonLookUP;
        this.SuspendedReasonLookUP = Object.assign(
          [],
          this.SuspendedReasonLookUP.list
        );
        // console.log('SuspendedReasonLookUP', SuspendedReasonLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getPropertyTypeLookUP() {
    this.serviceService.getPropertyTypeLookUP().subscribe(
      (PropertyTypeLookUP) => {
        this.PropertyTypeLookUP = PropertyTypeLookUP;
        this.PropertyTypeLookUP = Object.assign(
          [],
          this.PropertyTypeLookUP.list
        );
        // console.log('PropertyTypeLookUP', PropertyTypeLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getPropertyStatusLookUP() {
    this.serviceService.getPropertyStatusLookUP().subscribe(
      (PropertyStatusLookUP) => {
        this.PropertyStatusLookUP = PropertyStatusLookUP;
        this.PropertyStatusLookUP = Object.assign(
          [],
          this.PropertyStatusLookUP.list
        );
        // console.log('PropertyStatusLookUP', PropertyStatusLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getServiceDeliveryUnitLookUP() {
    this.serviceService.getServiceDeliveryUnitLookUP().subscribe(
      (ServiceDeliveryUnitLookUP) => {
        this.ServiceDeliveryUnitLookUP = ServiceDeliveryUnitLookUP;
        this.ServiceDeliveryUnitLookUP = Object.assign(
          [],
          this.ServiceDeliveryUnitLookUP
        );
        console.log("ServiceDeliveryUnitLookUP", ServiceDeliveryUnitLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getTransferTypeLookUP() {
    this.serviceService.getTransferTypeLookUP().subscribe(
      (TransferTypeLookUP) => {
        this.TransferTypeLookUP = TransferTypeLookUP;
        this.TransferTypeLookUP = Object.assign(
          [],
          this.TransferTypeLookUP.list
        );
        console.log("TransferTypeLookUP", TransferTypeLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getLease_Type_Lookup() {
    this.serviceService.getLease_Type_Lookup().subscribe(
      (Lease_Type_Lookup) => {
        this.Lease_Type_Lookup = Lease_Type_Lookup;
        this.Lease_Type_Lookup = Object.assign([], this.Lease_Type_Lookup.list);
        console.log("Lease_Type_Lookup", Lease_Type_Lookup);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getWoredaLookUP() {
    this.serviceService.getWoredaLookUP().subscribe(
      (WoredaLookUP) => {
        this.WoredaLookUP = WoredaLookUP;
        this.WoredaLookUP = Object.assign([], this.WoredaLookUP.list);
        // console.log('WoredaLookUP', WoredaLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCustomerLookUP() {
    this.serviceService.getCustomerLookUP().subscribe(
      (CustomerLookUP) => {
        this.CustomerLookUP = CustomerLookUP;
        this.CustomerLookUP = Object.assign([], this.CustomerLookUP.list);
        for (let i = 0; i < this.CustomerLookUP.length; i++) {
          this.CustomerLookUP[i].FullName_AM =
            this.CustomerLookUP[i].Applicant_First_Name_AM +
            " " +
            this.CustomerLookUP[i].Applicant_Middle_Name_AM +
            " " +
            this.CustomerLookUP[i].Applicant_Last_Name_AM;
          this.CustomerLookUP[i].FullName_EN =
            this.CustomerLookUP[i].Applicant_First_Name_EN +
            " " +
            this.CustomerLookUP[i].Applicant_Middle_Name_En +
            " " +
            this.CustomerLookUP[i].Applicant_Last_Name_EN;
        }
        this.getCustomerBankLookUP();
        console.log("CustomerLookUP", this.CustomerLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCustomerBankLookUP() {
    this.CustomerBankLookUP = [];
    for (let i = 0; i < this.CustomerLookUP.length; i++) {
      if (
        this.CustomerLookUP[i].Customer_Type_ID == "3" ||
        this.CustomerLookUP[i].Customer_Type_ID == "5"
      ) {
        this.CustomerBankLookUP.push(this.CustomerLookUP[i]);
      }
    }
    console.log("CustomerBankLookUP", this.CustomerBankLookUP);
  }

  getPlotStutusLookUP() {
    this.serviceService.getPlotStutusLookUP().subscribe(
      (PlotStutusLookUP) => {
        this.PlotStutusLookUP = PlotStutusLookUP;
        this.PlotStutusLookUP = Object.assign([], this.PlotStutusLookUP.list);
        // console.log('PlotStutusLookUP', PlotStutusLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getPlotLandUseLookUP() {
    this.serviceService.getPlotLandUseLookUP().subscribe(
      (PlotLandUseLookUP) => {
        this.PlotLandUseLookUP = PlotLandUseLookUP;
        this.PlotLandUseLookUP = Object.assign([], this.PlotLandUseLookUP.list);
        // console.log('PlotLandUseLookUP', PlotLandUseLookUP);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  public getAll(AppNo) {
    if (AppNo == undefined) {
      this.Application_No = "";
      this.Service_Name = "";
    } else {
      this.serviceService.getAll(AppNo).subscribe(
        (licenceService) => {
          this.licenceService = licenceService;
          console.log("Licence Service", this.licenceService);
          this.licenceData = this.licenceService.list[0];

          if (this.licenceData) {
            //this.Service_ID=this.licenceData.Service_ID;
            this.Licence_Service_ID = this.licenceData.Licence_Service_ID;
            // console.log('Licence data1', this.licenceData);
            this.serviceService.AppNO = this.licenceData.Application_No;
            this.Application_No = this.licenceData.Application_No;

            this.serviceService.servID = this.licenceData.Service_ID;
            this.serviceService.servName = this.licenceData.Service_Name;
            this.Service_Name = this.licenceData.Service_Name;
            console.log(this.Service_Name);
            this.serviceService.AppCode = this.Licence_Service_ID;
            this.serviceService.sdpID = this.licenceData.SDP_ID;
            this.SDP_ID = this.licenceData.SDP_ID;

            if (this.licenceData.Certificate_Code > 0) {
              this.getPriveysLicence(this.licenceData.Certificate_Code);
            } else {
              this.getPriveysLicence(this.licenceData.Application_No);
            }
          } else {
            this.serviceEvent.emit(this.eventTypes.JSONFOUND);
          }
          if (this.ID == 2) {
            this.disablefins = false;
            // this.getPlotManagement();
          } else if (this.ID == 3) {
            this.disablefins = false;
            // this.getPlotManagement();
          } else if (this.ID == 4) {
            this.disablefins = false;
            // this.getDeed();
          } else if (this.ID == 6) {
            this.disablefins = false;
          }

          // console.log('Licence data2', this.licenceData);
          // this.taskType = this.licenceData.TaskType;
          this.loading = false;
        },
        (error) => {
          this.serviceEvent.emit(this.eventTypes.JSONFOUND);
          console.log(error);
        }
      );
    }
  }
}
