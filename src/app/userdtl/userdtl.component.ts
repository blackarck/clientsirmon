import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { users } from './users';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {Userdialog} from './userdialog';
import { Useradd } from './useradd';

@Component({
  selector: 'app-userdtl',
  templateUrl: './userdtl.component.html',
  styleUrls: ['./userdtl.component.css']
})
export class UserdtlComponent implements OnInit {

  token="";
  currentUser;
  userrole: String;
  displayedColumns: string[] = ['clientid','userid','emailid',
  'user_name', 'phone','role','edit'];

  usersarr= [];
  usersarr1=[];
  dataSource = new MatTableDataSource( this.usersarr1);


  constructor( private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef , public dialog: MatDialog) {
    this.currentUser =   JSON.parse(localStorage.getItem('currentUser')) ;
    this.userrole =   localStorage.getItem('userrole') ;
    this.token = this.currentUser.token; // your token
      //get client data
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getuserData();
  }

  getuserData(){
    this.usersarr=[];

    const posturl='https://localhost:3000/api/client/getusers'; 
     //console.log(" get client data ");
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
        // console.log("response");
        if (res.success){
          //getting result here
          var arr = [], key;
          for(key in res) { arr.push(key);}
           
          for(var i =0 ;i<arr.length-2;i++){
             var users1:users = res[i];
              //console.log("PArsing object " + users1.emailid);
             this.usersarr.push(users1);
             // console.log("Not pri1nting " +this.usersarr[i].clientid);
          }
          this.dataSource = new MatTableDataSource( this.usersarr);
          //console.log("Load complete");
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
  usersedit(rowdata){
    //console.log("Client edit screen popup " + rowdata.clientid);
    const dialogRef = this.dialog.open(Userdialog, {
      width: '400px' ,data: rowdata
    });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed');
      this.getuserData();
     // this.dataSource = new MatTableDataSource( this.clientarr);
     });
      
  }

  adduser(){
    console.log("Lets add new user ");
    const dialogRef = this.dialog.open(Useradd, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed');
      this.getuserData();
     // this.dataSource = new MatTableDataSource( this.clientarr);
     });

  };

}
