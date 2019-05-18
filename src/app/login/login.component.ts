import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { concatMap, timeout, catchError, delay } from 'rxjs/operators';
import { Observable, Subject, ReplaySubject, from, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginReq:any={};
  loginurl: string;
  loginRes: any={};
  
  constructor(
  public snackBar: MatSnackBar,
  public http: HttpClient,
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) 
  { }

  ngOnInit() {
   
  }
  
  login(){
    this.spinner.show();
    this.loginurl= 'http://192.168.0.114:10010/login';
    this.http.post(this.loginurl,this.loginReq)
    .subscribe(res =>{
      
      this.loginRes=res;
      console.log("response-"+ JSON.stringify(res));
      if (this.loginRes.status == 'success')
      {
        this.router.navigate (['/dashboard']);
      }
      else{
        this.snackBar.open(this.loginRes.status, 'error',{
          duration: 2000,
        });
      }
    }), ()=>{

    }
    console.log("login id is " + this.loginReq.id);
    console.log("login password is " + this.loginReq.pwd);
  }

}
