import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'Ceditdialog',
    templateUrl: 'ceditdialog.html',
    styleUrls: ['./clientdtl.component.css']
  })

export class Ceditdialog {
    token="";
    currentUser;
    clientname="";
    emailid="";
    contactname="";
    clientid="";
    editForm =  this.fb.group({
        emailid: new FormControl(''),
        contactname: new FormControl(''),
        clientid:new FormControl('')
       
    });

    constructor( public dialogRef: MatDialogRef<Ceditdialog>,private http: HttpClient,private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,
        @Inject(MAT_DIALOG_DATA) public rowdata:any) {
          
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.token = this.currentUser.token; // your token
          this.clientname=this.rowdata.client_name;
          this.emailid=this.rowdata.contact_email;
          this.contactname=this.rowdata.contact_name;
          this.clientid=this.rowdata.clientid;
        }

        onNoClick(): void {
            this.dialogRef.close();
          }
          saveClientData():void{
              //console.log("Saving data " + this.rowdata.clientid);
              const posturl = 'https://localhost:3000/api/client/updateclient';
              let formObj = this.editForm.getRawValue(); 
              let serializedForm = JSON.stringify(formObj);

              const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Methods': 'GET, POST, PUT',
                  'authorization': this.token
                })
              };//end of httpoptions
              this.spinnerService.show();
              this.http.post<any>(posturl,serializedForm,httpOptions).subscribe(
                (res)=> {
                   //console.log("response " + res.message + " "  + res.success);
                  if (res.success){
                    //should update form data
                    console.log("Hiding spinner");
                   this.spinnerService.hide();
                  } else{
                    //do nothing and show the error message
                    console.log("Show error message " + res.message);
                  }
                } ,
                (err)=> {
                  console.log(err.error.message);
                }
              );
          }//saveclientdata
}
