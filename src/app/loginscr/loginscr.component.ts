import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loginscr',
  templateUrl: './loginscr.component.html',
  styleUrls: ['./loginscr.component.css']
})
export class LoginscrComponent implements OnInit {

  
  submitted=false;
  loginform =  this.fb.group({
  userid : new FormControl('', [Validators.required, Validators.min(5)]),
  password : new FormControl('',Validators.required)
});


  constructor(private fb: FormBuilder, private http: HttpClient) {

   }

   onSubmit(){

    //this.submitted=true;
    //console.log("Submitting form " + this.loginform.status + " " + this.loginform.get('userid').value + "  " + this.loginform.get('pwd').errors);
    const posturl = 'https://localhost:3000/api/user/login';
    let formObj = this.loginform.getRawValue(); 
    let serializedForm = JSON.stringify(formObj);
    console.log("Serialized form " + serializedForm);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT'
      })
    };//end of httpoptions

    this.http.post<any>(posturl,serializedForm,httpOptions).subscribe(
      (res)=>console.log("response " + res.message + " " + res.token),
      (err)=> console.log(err)
    );


  }
  
  ngOnInit() {
  }

}
