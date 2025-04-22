import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }
  
  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;
 
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    const headers = this.getHeaders();
    return this.http.post<Trip>(this.tripUrl, formData, {headers: headers});
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    console.log('Inside TripDataService::getTrip');
    return this.http.get<Trip[]>(this.tripUrl + tripCode);
  }

  updateTrip(formData : Trip) : Observable<Trip> {
    const headers = this.getHeaders();
    return this.http.put<Trip>(this.tripUrl + formData.code, formData, {headers: headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    try {
      return await lastValueFrom(this.http.post<AuthResponse>(url, user) );
    } catch (error) {
      return this.handleError(error);
    }
  }

  private getHeaders(): HttpHeaders {
    const token = this.storage.getItem('travlr-token');
    const header = new HttpHeaders( {'Authorization': `Bearer ${token}`} );
    
    return header;
  }
}