import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-clientsnap',
  templateUrl: './clientsnap.component.html',
  styleUrls: ['./clientsnap.component.css']
})
export class ClientsnapComponent implements OnInit {

  token;
  currentUser;
  userrole: String;
  clientid:String;
  clientname:String;
  imgsrc:String;
  loading:boolean=false;

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef ) {
    //check whether user is adin or not and based on that either show just one client card or all the cards 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
    this.userrole =   localStorage.getItem('userrole') ;
    this.token = this.currentUser.token; // your token
    this.clientid=localStorage.getItem('clientid');
    this.clientname=localStorage.getItem('clientname');
     //console.log("Values for client is " + this.clientid + " token "+ this.currentUser);
     this.loadServerStats();

    //console.log("Client snapshot constructor");
    if( this.userrole =='suadmin'){
      //user is super admin we should show all client stats else only show this client's stats
   }else{

   }
  }//end of constructor

  ngOnInit() {}
  //end of ngoninit

  loadServerStats(){
   let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': this.token,
      }),
      params: new HttpParams().set('clientid',this.clientid.toString())
    };//end of httpoptions

   const posturl="https://localhost:3000/api/util/getavlblsts";
   this.loading = true;
   
     this.http.get<any>(posturl,httpOptions).subscribe(
       (res)=> {
         console.log("Result recieved ");
       } ,
      /* (err)=> {
         console.log("Error1 "+ err);
        this.loading=false;
       }*/);

       this.loading=false;

  }//end of  loadServerStats
}//end of class
  /*
  loadimg(){
  
    const imgurl="https://localhost:3000/api/client/images/"+ this.clientid;
     //console.log(" get client data ");
     this.loading = true;
     this.http.get<any>(imgurl, httpOptions).subscribe(
       (res)=> {
         //console.log("response " + res );
          this.createImageFromBlob(res.blob());
        } ,
        (err)=> {
         // console.log(err);
         this.loading = false;
          console.log("error " + err.error.error);
        });
        this.loading = false;
  }//end of load img

  imageToShow: any;

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
      console.log("Image read complete");
   }
}
*/

