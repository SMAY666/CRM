import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {

  constructor(private auth: AuthService, private router: Router) {}

  @ViewChild('floating') floatingRef: ElementRef 
  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/analitycs', name: 'Аналитика'},
    {url: '/history', name: 'История'},
    {url: '/newOrder', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'},
  ]

ngAfterViewInit(): void {
  MaterialService.initializeFloatingButton(this.floatingRef)
}
  logOut(event: Event): void{
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/login'])
  }

}
