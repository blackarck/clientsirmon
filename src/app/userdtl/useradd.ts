import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'Useradd',
    templateUrl: 'useradd.html',
    styleUrls: ['./userdtl.component.css']
  })

export class Useradd {
    token="";
    currentUser;
    emailid="";
    phone="";
    clientid="";
    role="";
    userid="";
    user_name="";
    currentUsrRole="";
    ifnotadmin = true;
    dynamicClass='invisible';

    addForm =  this.fb.group({
      clientid:new FormControl(''),
        emailid: new FormControl(''),
        username:new FormControl(''),
        phone: new FormControl(''),
        role:new FormControl('')
    }); 

    constructor( public dialogRef: MatDialogRef<Userdialog>,private http: HttpClient,private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,
        @Inject(MAT_DIALOG_DATA) public rowdata:any){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.currentUsrRole = localStorage.getItem('userrole');
            this.token = this.currentUser.token; // your token
          
            if(this.currentUsrRole =='admin' || this.currentUsrRole=='suadmin'){
              this.ifnotadmin=false;
            }
        }//end of constructor
        
        onNoClick(): void {
            this.dialogRef.close();
          };//end of onnoclick

          saveUserData():void{
          }//end of saveuserdata

}//end of export class
