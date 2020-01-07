import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'Clientadd',
    templateUrl: 'clientadd.html',
    styleUrls: ['./clientdtl.component.css']
  })

export class Clientadd {
    token="";
    currentUser;
    clientname=" ";
    emailid="";
    contactname="";
    clientid="";
    addForm =  this.fb.group({
      clientname :new FormControl(''),
        emailid: new FormControl(''),
        contactname: new FormControl(''),
        add1:new FormControl(''),
        add2:new FormControl(''),
        city:new FormControl(''),
        state:new FormControl(''),
        country:new FormControl('')
       
    });// end of form

    constructor( public dialogRef: MatDialogRef<Ceditdialog>,private http: HttpClient,private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,
        @Inject(MAT_DIALOG_DATA) public rowdata:any) {
          
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.token = this.currentUser.token; // your token
         
        };//end of constructor

        onNoClick(): void {
            this.dialogRef.close();
          }//end of no click

          saveClientData():void{
            let formObj = this.addForm.getRawValue(); 
            let serializedForm = JSON.stringify(formObj);
            const posturl = 'https://localhost:3000/api/client/addclient';

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
          }//end of saveclientdata
}//end of export class

