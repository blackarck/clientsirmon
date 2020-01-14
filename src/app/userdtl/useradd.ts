import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,Validators } from '@angular/forms';

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
    loading = false;
    rolearr1=[];
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': this.token
      })
    };//end of httpoptions

    addForm =  this.fb.group({
      clientid:new FormControl(this.clientid),
        emailid: new FormControl(''),
        username:new FormControl(''),
        phone: new FormControl(''),
        role:new FormControl('user')
    }); 

    constructor( public dialogRef: MatDialogRef<Useradd>,private http: HttpClient,private fb: FormBuilder,     @Inject(MAT_DIALOG_DATA) public rowdata:any){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.currentUsrRole = localStorage.getItem('userrole');
            this.token = this.currentUser.token; // your token
          
            if( this.currentUsrRole !='suadmin'){
              this.addForm.get('clientid').disable();
              this.clientid=localStorage.getItem('clientid');
              //this.ifnotadmin=false;
            }

           this.httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'authorization': this.token
              })
            };//end of httpoptions
            this.fetchRoleVal();
        }//end of constructor
        
        onNoClick(): void {
            this.dialogRef.close();
          };//end of onnoclick

          saveUserData():void{
            let formObj = this.addForm.getRawValue(); 
            let serializedForm = JSON.stringify(formObj);
            const posturl = 'https://localhost:3000/api/client/adduser';

            this.loading = true;
            this.http.post<any>(posturl,serializedForm,this.httpOptions).subscribe(
              (res)=> {
                 //console.log("response " + res.message + " "  + res.success);
                if (res.success){
                  //should update form data
                  //console.log("Hiding spinner");
                  this.loading = false;
                } else{
                  //do nothing and show the error message
                  console.log("Show error message " + res.message);
                  this.loading = false;
                }
              } ,
              (err)=> {
                this.loading = false;
                console.log(err.error.message);
              }
            );

          }//end of saveuserdata

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
}//end of export class
