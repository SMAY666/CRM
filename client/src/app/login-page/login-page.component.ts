import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from '../shared/services/material.service';
//import { User } from '../shared/Interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription //За утечку (отсутствие памяти)
  
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast("Теперь вы можете авторизироваться в системе со своими данными")
        //Зайти со своими данными
      }
      else if (params['accessDenied']) {
        MaterialService.toast("Для начала авторизуйтесь в системе")
        //Для начала авторизуйтесь в системе
      }
      else if (params['sessionFailed']) {
        MaterialService.toast("Ваша сессия закончилась. Пожалуйста авторизируйтесь заного")
      }
    }) 
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }  
  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
