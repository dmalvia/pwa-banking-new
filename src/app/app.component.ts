import { Component, OnInit, HostListener } from '@angular/core';
import { MessagingService } from "./services/notification-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message: any;
  loadedPage = '';
  position: any;
  router:Router;
  onNavigation(displayPage: string) {
    this.loadedPage = displayPage;
  }

  constructor(private messagingService: MessagingService, _router: Router) {
    this.router = _router;
  }
  ngOnInit() {
    console.log("Dipesh Malvia");
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

    console.log(this.router.url);
    if(this.router.url == '/') {
      localStorage.removeItem("user");
      localStorage.removeItem("flag");
      this.router.navigate(['/login']);
    }
  }


  appendLocation(location, verb) {
    verb = verb || 'updated';
    console.log('Location ' + verb + ': <a href="https://maps.google.com/maps?&z=15&q=' + location.coords.latitude + '+' + location.coords.longitude + '&ll=' + location.coords.latitude + '+' + location.coords.longitude + '" target="_blank">' + location.coords.latitude + ', ' + location.coords.longitude + '</a>');
  }

  fetchLocation() {
    console.log('Hi')
    if ('geolocation' in navigator) {
      console.log('Hi2');
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Hi3');
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        // alert(lat + " lat and long" + lng);
      });
    }
    else {
      alert('Geo location Api not supported.');
    }
  }

}
