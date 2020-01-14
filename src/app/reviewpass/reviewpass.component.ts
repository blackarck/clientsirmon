import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reviewpass',
  templateUrl: './reviewpass.component.html',
  styleUrls: ['./reviewpass.component.css']
})
export class ReviewpassComponent implements OnInit {

  errormsg=false;
  submitted=false;
  errormsgtxt="";
  passedtoken="";
  reviewform =  this.fb.group({
    password1 : new FormControl('',[Validators.required,Validators.min(8)]),
    password2 : new FormControl('',[Validators.required,Validators.min(8)]),
    passedtoken: new FormControl('')
  });
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) { 

    this.route.queryParams.subscribe(params => {
      this.passedtoken = params['token'];
      //console.log("Passed token is " + this.passedtoken);
  });
  }

  ngOnInit() { }

  onSubmit(){
    const posturl = 'https://localhost:3000/api/util/reviewpass';
    let formObj = this.reviewform.getRawValue(); 
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
        //console.log("response " + res.message + " " + res.token + " " + res.success);
        if (res.success){
          //navigagte to dahsboard else keep it in loginscreen with error message
          //store to local storage along with username
          //this.router.navigate(['/dashboard', { token: res.token}]);
          //this.router.navigate(['/dashboard']);
          console.log("Success " + res.message);
          //redirect to another page
          this.router.navigate(['/pwdreset']);
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
      }//end of err
    );
    //read input parameter
    //send it along with password on submit
    // if successful message comes back redirect user to login screen
    //if error message comes back show it in a new page without form
  }//end of onsubmit
}
