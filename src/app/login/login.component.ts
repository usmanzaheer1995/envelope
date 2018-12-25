import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public model: any = {};
  private httpSub$: Subscription = null;

  public beforeDueDate: string = "";

  @ViewChild('form') form: NgForm;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  public login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.form.controls['username'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.beforeDueDate = "";

    const params = {
      username: this.model.username,
      password: this.model.password,
    };
    this.httpSub$ = this.http.post('/login', params)
      .subscribe(
        (res) => {
          console.log(res)
          localStorage.setItem("envelope-login", JSON.stringify(true));
          this.router.navigateByUrl('/envelope');
        },
        (err) => {
          const errors = err.error;
          if (errors.username) {
            this.form.controls['username'].setErrors({ invalid: true });
          }
          if (errors.password) {
            this.form.controls['password'].setErrors({ invalid: true });
          }
          if (errors.beforeDate) {
            this.beforeDueDate = "You cannot view this before your birthday.";
          }
        }
      );
  }

  public ngOnDestroy() {
    if (this.httpSub$) { this.httpSub$.unsubscribe(); }
  }

}
