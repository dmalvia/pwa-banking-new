import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';

@Injectable()
export class SharingService {
  private subject = new Subject<any>();
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public optSelected: BehaviorSubject<string> = new BehaviorSubject<string>('retailBank');

  sendFlag(flagVal: boolean) {
    this.subject.next(flagVal);
  }

  displayOpt(value: boolean) {
        this.status.next(value);
  }

  bankingOpt(value:string) {
    this.optSelected.next(value);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private http: Http) { }

  getToken(postObj) {

    let headers = new Headers({
      'Authorization': 'key=AAAA4OTZ5Mk:APA91bGMZsHGoR8fO_tHaryDJZAn0oWBD4NejJZE6mItRXhpWLzna8g4NP7bGPMr0x3NdRGWhUhO62naOAX2MOwNL2dCl8IQReQ-up-vJvuhj9UXgV6rVNqp__zDD40fhMaF2BrbKl04'
    });

    let url ='https://fcm.googleapis.com/fcm/send';

    return this.http.post(url,postObj,{headers:headers})
    .map(res => {
      return res;
    })
    // .catch(error => {
    //   console.log('error', error);
    // })
  }
}
