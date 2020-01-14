import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-pwdrstsuccess',
  templateUrl: './pwdrstsuccess.component.html',
  styleUrls: ['./pwdrstsuccess.component.css']
})
export class PwdrstsuccessComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit() {
  }
  showlogin(){
    this.router.navigate(['/loginscr']);
  }

}
