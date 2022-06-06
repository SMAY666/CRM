import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../Interfaces";

@Injectable({
    providedIn: 'root'
  })

  export class OrdersService {
    constructor(private http: HttpClient) {}
    
    fetch(): Observable<Order[]>{
      return this.http.get<Order[]>('/api/order')
    }
    create(order: Order): Observable<Order> {
      return this.http.post<Order>('/api/order', order)
    }
  }