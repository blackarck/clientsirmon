import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {

  clbtncolor='accent';
  usbtncolor='accent';

  constructor() { 
    this.clbtncolor='accent';
    this.usbtncolor='accent';
  }

  clcolorCorrect(){
    this.clbtncolor='primary';
    this.usbtncolor='accent';
  }

  uscolorCorrect(){
    this.clbtncolor='accent';
    this.usbtncolor='primary';
  }

  ngOnInit() {
  }

}
