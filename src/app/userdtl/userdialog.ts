import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,Validators } from '@angular/forms';

@Component({
    selector: 'Userdialog',
    templateUrl: 'Userdialog.html',
    styleUrls: ['./userdtl.component.css']
  })

export class Userdialog {

  loading = false;
    token="";
    currentUser;
    emailid="";
    phone="";
    clientid="";
    role="";
    userid="";
    user_name="";
    rstpswd:boolean=false;
    active="";
    currentUsrRole="";
    ifnotadmin = true;
    dynamicClass='invisible';
    rolearr1=[];

    editForm =  this.fb.group({
        emailid: new FormControl( this.emailid),
        phone: new FormControl(this.phone),
        active:new FormControl(this.active),
        role:new FormControl(this.role),
        userid: new FormControl('')
    }); 

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': this.token
      })
    };//end of httpoptions

    constructor( public dialogRef: MatDialogRef<Userdialog>,private http: HttpClient,private fb: FormBuilder,
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
            this.active=this.rowdata.active;
            this.httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'authorization': this.token
              })
            };//end of httpoptions
            if(this.currentUsrRole =='admin' || this.currentUsrRole=='suadmin'){
              this.ifnotadmin=false;
            }
            this.fetchRoleVal();
        } 

        onNoClick(): void {
           
            this.dialogRef.close();
          };

         

          saveUserData():void{
            //console.log("Saving data " + this.rowdata.clientid);
            if(this.editForm.touched || this.editForm.dirty){
              console.log("Form has been touched ");
           
            const posturl = 'https://localhost:3000/api/client/updateUser';
            let formObj = this.editForm.getRawValue(); 
            let serializedForm = JSON.stringify(formObj);

            this. loading = true;
            this.http.post<any>(posturl,serializedForm,this.httpOptions).subscribe(
              (res)=> {
                 //console.log("response " + res.message + " "  + res.success);
                if (res.success){
                  //should update form data
                  //console.log("Hiding spinner");
                 this. loading = false;
                } else{
                  //do nothing and show the error message
                  console.log("Show error message " + res.message);
                  this. loading = false;
                }
              } ,
              (err)=> {
                console.log(err.error.message);
                this. loading = false;
              }
            );
            }//end of check whether form was touched
            //check if password reset request was raised
            if(this.rstpswd){
              //console.log("Password reset request was raised");
              const posturl = 'https://localhost:3000/api/client/resetpwd';
              let formObj = this.editForm.getRawValue(); 
              let serializedForm = JSON.stringify(formObj);
  
              this. loading = true;
              this.http.post<any>(posturl,serializedForm,this.httpOptions).subscribe(
                (res)=> {
                   //console.log("response " + res.message + " "  + res.success);
                  if (res.success){
                   this. loading = false;
                  } else{
                    //do nothing and show the error message
                    console.log("Show error message " + res.message);
                    this. loading = false;
                  }
                } ,
                (err)=> {
                  console.log(err.error.message);
                  this. loading = false;
                }
              );
            }
        }//saveUserdata
      
        fetchRoleVal(){
          const posturl = 'https://localhost:3000/api/util/getroles';
          this.loading = true;
          this.http.get<any>(posturl,this.httpOptions).subscribe(
            (res)=> {
               //console.log("response " + res.message + " "  + res.success);
              if (res.success){
                //should update form data
                var count=0;
                for(var key in res) {count++; }
                //console.log("Hiding spinner " + JSON.stringify(res) + " count:"+count);

                if(count>2){
                  for(var i =0 ; i < (count-2) ; i++) {
                    this.rolearr1.push(res[i]);
                  }
              }
               // console.log("rolearr "+ this.rolearr1);
                this.loading=false;
              } else{
                //do nothing and show the error message
                this.loading = false;
                console.log("Show error message " + res.message);
              }
            } ,
            (err)=> {
              this.loading = false;
              console.log(err.error.message + err.error);
            }
          );
        }//end of fetchroleval
}
