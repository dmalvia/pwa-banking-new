import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-authorize',
  templateUrl: './transactions-authorize.component.html',
  styleUrls: ['./transactions-authorize.component.css']
})
export class TransactionsAuthorizeComponent implements OnInit {
  selectedBanking:string;
  dummyTxn:any;
  showTab:boolean = true;
  showSummary:boolean = false;
  showFinalScreen:boolean = false;
  txnDetail:any;
  showComment:boolean = false;
  message:string;
  router:any;
  user:string;
   constructor(_router: Router, private ds: SharingService) {
    this.router = _router;
  }

  ngOnInit() {
  	this.ds.optSelected.subscribe((res:string) => {
      this.selectedBanking = res;
    });

    this.user = localStorage.getItem("user");
    console.log(this.user);

    this.dummyTxn = [
      {
        "from":"Current Account",
        "to":"FS Tech Solutions",
        "amount":"10,000",
        "mode":"RTGS",
        "remark":"testing",
        "txn": "TXN123450",
        "date":"16 Oct 2018"
      },
      {
        "from":"Current Account",
        "to":"Solutions",
        "amount":"18,000",
        "mode":"NEFT",
        "remark":"testing",
        "txn": "RQN128j650",
        "date":"10 Oct 2018"
      }
    ]
  }

  showAllInfo(obj) {
    this.showSummary = true;
    this.showTab = false;
    console.log("THe object is ", obj);
    this.txnDetail = obj;
  }

  backToTable() {
    this.showSummary = false;
    this.showTab = true;
    this.showFinalScreen = false;
  }

  transferDone(act) {
    this.showFinalScreen = true;
    this.showTab = false;
    this.showSummary = false;
    if(act == 'maker') {
      this.message = 'Request rejected send back to maker !!';
    }
    else {
      this.message = 'Request approved Successfully !!';
    }
  }

  showCommentBox() {
    this.showComment = true;
  }

 navigateToAccounts() {
    this.router.navigate(['/dashboard/accounts']);
  }

}
