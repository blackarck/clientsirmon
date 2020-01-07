import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'Userdialog',
    templateUrl: 'Userdialog.html',
    styleUrls: ['./userdtl.component.css']
  })

export class Userdialog {

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

    editForm =  this.fb.group({
        emailid: new FormControl(''),
        phone: new FormControl(''),
        role:new FormControl(''),
        userid: new FormControl('')
    }); 

    constructor( public dialogRef: MatDialogRef<Userdialog>,private http: HttpClient,private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,
        @Inject(MAT_DIALOG_DATA) public rowdata:any){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.currentUsrRole = localStorage.getItem('userrole');
            this.token = this.currentUser.token; // your token
            this.emailid=this.rowdata.emailid;
            this.phone=this.rowdata.phone;
            this.clientid=this.rowdata.clientid;
            this.role=this.rowdata.role;
            this.userid=this.rowdata.userid;
            this.user_name=this.rowdata.user_name;

            if(this.currentUsrRole =='admin' || this.currentUsrRole=='suadmin'){
              this.ifnotadmin=false;
            }
        } 

        onNoClick(): void {
            this.dialogRef.close();
          };

         

          saveUserData():void{
            //console.log("Saving data " + this.rowdata.clientid);
            const posturl = 'https://localhost:3000/api/client/updateUser';
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
                  //console.log("Hiding spinner");
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
        }//saveUserdata
      

}
