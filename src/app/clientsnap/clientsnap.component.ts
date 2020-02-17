import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { HttpHeaders, HttpParams ,HttpClient } from '@angular/common/http';
import {serverdtl} from './serverdtl';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { Label  } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

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
  public loading:boolean=false;
  srvs=[];
  servarr=[];
  dataSource = new MatTableDataSource( this.servarr);
  displayedColumns: string[] = ['servertyp','dateon','avlblty'];
  dispchart=false;
  dispIBchart=false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] =['Prcs Status' ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  //public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef ) {
    //check whether user is adin or not and based on that either show just one client card or all the cards 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) ;
    this.userrole =   localStorage.getItem('userrole') ;
    this.token = this.currentUser.token; // your token
    this.clientid=localStorage.getItem('clientid');
    this.clientname=localStorage.getItem('clientname');
     //console.log("Values for client is " + this.clientid + " token "+ this.currentUser);
     this.loadServerStats();
     this.loadPrcsStats();
     this.loadIBStats();
    //console.log("Client snapshot constructor");
    if( this.userrole =='suadmin'){
      //user is super admin we should show all client stats else only show this client's stats
   }else{

   }
  }//end of constructor

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {}
  //end of ngoninit

  loadServerStats(){
    this.srvs=[];
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
        if (res.success){
         //console.log("Result recieved ");
         var arr = [], key,count;
         for(key in res) { arr.push(key);}
         count=arr.length;
         if(count>2){
          for(var i =0 ; i < (count-2) ; i++) {
            //console.log("res "+i+" val is "+res[i].servertyp + " " +res[i].dateon + " "+res[i].avlblty);
            var singserver:serverdtl=res[i];
            this.srvs.push(singserver);
          }//end of for
          this.dataSource = new MatTableDataSource( this.srvs);
      }//end of if
    }//end of res success
       } ,
      (err)=> {
         console.log("Error1 "+ err);
        this.loading=false;
       });

       this.loading=false;

  }//end of  loadServerStats

  loadPrcsStats(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': this.token,
      }),
      params: new HttpParams().set('clientid',this.clientid.toString())
    };//end of httpoptions

    const posturl="https://localhost:3000/api/util/getprcsstats";
   this.loading = true;
   
     this.http.get<any>(posturl,httpOptions).subscribe(
       (res)=> {
        if (res.success){
          this.dispchart=true;
          this.barChartData=[];
this.barChartData=[
  {data:[res[0].prcspass],label:'Success'},
  {data:[res[0].prcsfail],label:'Fail'}
];

 }//end of res success
} ,
(err)=> {
   console.log("Error1 "+ err);
  this.loading=false;
 });

 this.loading=false;

  }//end of load prcsstats



  loadIBStats(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'authorization': this.token,
      }),
      params: new HttpParams().set('clientid',this.clientid.toString())
    };//end of httpoptions

    const posturl="https://localhost:3000/api/util/getIBstats";
   this.loading = true;
   
     this.http.get<any>(posturl,httpOptions).subscribe(
       (res)=> {
        if (res.success){
          this.dispIBchart=true;
          this.pieChartData=[];
this.pieChartData=[
  res[0].outsucc,  
  res[0].outpend,  
  res[0].outfail, 
  res[0].inbsucc, 
  res[0].inbfail, 
  res[0].inbpend 
];

 }//end of res success
} ,
(err)=> {
   console.log("Error1 "+ err);
  this.loading=false;
 });

 this.loading=false;

  }//end of load loadibstats

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

