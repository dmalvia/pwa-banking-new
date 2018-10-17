import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	model: any = {};
	router: Router;
	loading = false;

	constructor(_router: Router,private shareService:SharingService) {
		this.router = _router;
	}

	ngOnInit() {
		
	}

	gotoDashboard = () => {
		this.loading = true;
		if ((this.model.username == "admin" || this.model.username == "Admin") && (this.model.password == "admin")) {
			this.shareService.bankingOpt('retail');
			this.notifunc();
			this.router.navigate(['/dashboard/accounts']);
		}
		else if((this.model.username == "corp" || this.model.username == "Corp") && (this.model.password == "corp")) {
			this.shareService.bankingOpt('corporate');
			localStorage.setItem("user","checker");
			this.router.navigate(['/dashboard/accounts']);
		}
		else if((this.model.username == "corpretail" || this.model.username == "Corpretail") && (this.model.password == "corpretail")) {
			this.shareService.bankingOpt('retail');
			localStorage.setItem("user","maker");
			this.shareService.displayOpt(true);
			this.router.navigate(['/dashboard/accounts']);
		} else {
			alert("please enter valid credentials");
		}

	}

	notifunc() {
		let obj = {
			notification: {
				title: "Message title",
				body: "Message body",
				click_action: "https://codewithstyle.info/push-notifications-with-fcm/"
			},
			// userData is where your client stored the FCM token for the given user
			// it should be read from the database
			to: localStorage.getItem('tokenKey') 
		}

		this.shareService.getToken(obj).subscribe(res => {
			console.log(res);
		})
	}

}

