import { Component, OnInit,ChangeDetectorRef   } from '@angular/core';
import { client } from './client';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Ceditdialog } from './ceditdialog';
import { Clientadd} from './clientadd';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-clientdtl',
  templateUrl: './clientdtl.component.html',
  styleUrls: ['./clientdtl.component.css']
})

export class ClientdtlComponent implements OnInit {
  
  token="";
  currentUser;
  username: String;
  userrole: String;
  displayedColumns: string[] = ['clientid','client_name','contact_email',
  'contact_name', 'address1','address2','city','state','country' ,'edit'];
  clientarr= [];
  clientarr1=[];
  dataSource = new MatTableDataSource( this.clientarr1);

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
    this.getClientData();
   }

  getClientData(){
    this.clientarr=[];
    const posturl='https://localhost:3000/api/client/getclient'; 
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
         //console.log("response");
        if (res.success){
          //getting result here
          var arr = [], key;
          for(key in res) { arr.push(key);}
           
          for(var i =0 ;i<arr.length-2;i++){
             var client1:client = res[i];
              //console.log("PArsing object " + client1.contact_email);
             this.clientarr.push(client1);
             // console.log("Not pri1nting " +this.clientarr[i].clientid);
          }
          this.dataSource = new MatTableDataSource( this.clientarr);
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

  } //getClientData

  addclient(){
    console.log("lets add a new client");
    const dialogRef = this.dialog.open(Clientadd, {
      width: '500px' 
    });
    dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed');
      this.getClientData();
     // this.dataSource = new MatTableDataSource( this.clientarr);
     });
  };

  clientedit(rowdata){
    //console.log("Client edit screen popup " + rowdata.clientid);
    const dialogRef = this.dialog.open(Ceditdialog, {
      width: '400px' ,data: rowdata
    });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log('The dialog was closed');
      this.getClientData();
     // this.dataSource = new MatTableDataSource( this.clientarr);
     });
  };

  
}