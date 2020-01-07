import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-loginscr',
  templateUrl: './loginscr.component.html',
  styleUrls: ['./loginscr.component.css']
})
export class LoginscrComponent implements OnInit {

  
  submitted=false;
  errormsg=false;
  errormsgtxt="";
  loginform =  this.fb.group({
  userid : new FormControl('', [Validators.required, Validators.min(5)]),
  password : new FormControl('',Validators.required)
});


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,) {

   }

   onSubmit(){

    //this.submitted=true;
    //console.log("Submitting form " + this.loginform.status + " " + this.loginform.get('userid').value + "  " + this.loginform.get('pwd').errors);
    const posturl = 'https://localhost:3000/api/user/login';
    let formObj = this.loginform.getRawValue(); 
    let serializedForm = JSON.stringify(formObj);
    //console.log("Serialized form " + serializedForm);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT'
      })
    };//end of httpoptions

    this.http.post<any>(posturl,serializedForm,httpOptions).subscribe(
      (res)=> {
        console.log("response " + res.message + " " + res.token + " " + res.success);
        if (res.success){
          //navigagte to dahsboard else keep it in loginscreen with error message
          //store to local storage along with username
          localStorage.setItem('currentUser', JSON.stringify({ token: res.token, userid: this.loginform.get('userid').value }));
          //this.router.navigate(['/dashboard', { token: res.token}]);
          this.router.navigate(['/dashboard']);
        }else{
          //do nothing and show the error message
          console.log("Show error message " + res.message);
          this.errormsg=true;
          this.errormsgtxt=res.message;
        }
      } ,
      (err)=> {
        console.log(err);
        this.errormsg=true;
          this.errormsgtxt=err.error.message;
      }
    );
  }
  
  ngOnInit() {
  }

}
