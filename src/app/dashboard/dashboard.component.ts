import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {LoginsrvcService} from '../loginsrvc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  token="";
  currentUser;
  username: String;
  opened: boolean;
  isAdmin:boolean=false;

  constructor( private route: ActivatedRoute,  private router: Router,private http: HttpClient,private loginsrvc: LoginsrvcService) {
    //console.log("Token recieved " + this.route.snapshot.paramMap.get('token') );
    // this.token = this.route.snapshot.paramMap.get('token');
    //make sure login is a valid login
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token; // your token
    this.validatetoken();
    //console.log("end of constructor dashboard");
   }

  ngOnInit() {
  }


  validatetoken(){
    //console.log("Calling validate token");
    const posturl='https://localhost:3000/api/client/userid';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': this.token
      })
    };//end of httpoptions

    this.http.get<any>(posturl, httpOptions).subscribe(
      (res)=> {
        //console.log("response " + res.message +  " " + res.success);
        if (res.success){
          //navigagte to dahsboard else keep it in loginscreen with error message
       //console.log(" user is "+ res[0].userid + " name " + res[0].user_name +  res[0].role);
        this.username = res[0].user_name;
        localStorage.setItem('userid',res[0].userid);
        localStorage.setItem('userrole', res[0].role);
        localStorage.setItem('clientid',res[0].clientid);
        localStorage.setItem('emailid',res[0].emailid);
        localStorage.setItem('username',res[0].user_name);
 
        if(res[0].role =='admin' || res[0].role=='suadmin'){
          this.isAdmin=true;
        }
        }else{
          //do nothing and show the error message
           console.log("Show error message " + res.message);
          this.router.navigate(['/']);
         
        }
      } ,
      (err)=> {
       // console.log(err);
        console.log("error " + err.error.message);
        this.router.navigate(['/']);
      }
    );
  }

  logout(){
    //console.log("Logging out");
    localStorage.clear();
    this.router.navigate(['/']);
  }

  togglemenu(){
    if(this.opened){
      this.opened=false;
    }else{
      this.opened=true;
    } 
  }
}
