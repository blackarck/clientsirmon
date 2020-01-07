import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username:String ='';
  clientid:String='';
  emailid:String='';
  userrole:String='';
  userid:String='';


  constructor(public dialog: MatDialog) { 
    //fetch values from local storage
         this.userid = localStorage.getItem('userid');
         this.username = localStorage.getItem('username');
         this.clientid = localStorage.getItem('clientid');
         this.emailid = localStorage.getItem('emailid');
  }

  ngOnInit() {}

  notifybtn(){
    //console.log("Sending email out");

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px' , data:String
    });

    dialogRef.afterClosed().subscribe(result => {
     //  console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./profile.component.css']
})
export class DialogOverviewExampleDialog {

  token="";
  currentUser;

  constructor( public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data:String) {
      this.data='';
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser.token; // your token
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendMsg():void{
    if(this.data.length>0){
    //console.log("Sending out message "+ this.data);
    //call api with string as message in it
    const posturl='https://localhost:3000/api/util/suemail';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'authorization': this.token
      })
    };//end of httpoptions
    
    let serializeddata = '{"message":"'+this.data+'"}';
     //console.log("Serialized form " + serializeddata);

    this.http.post<any>(posturl,serializeddata,httpOptions).subscribe(
      (res)=> { console.log("response " + res); } ,
      (err)=> {console.log(err); }
    );

  }
    else{
      //console.log("No data entered");
    }
  }
}