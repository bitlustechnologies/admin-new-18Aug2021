import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traders-view',
  templateUrl: './traders-view.component.html',
  styleUrls: ['./traders-view.component.css']
})
export class TradersViewComponent implements OnInit {
  member_id: any;
  traderDetail: any[] = [];
  userHistory: any[] = [];
  balDetail: any;
  modalRef: NgbModalRef;
  editEmailAddress: any;
  editPhoneNumber: any;
  phoneCode: any;
  phone_code: any;
  phoneCodeId: any;
  updateButtonDisable: boolean = true;
  personalDetailsFistName;
  personalDetailsLastName;
  @ViewChild('content2') content2: TemplateRef<any>;
  @ViewChild('content5') content5: TemplateRef<any>;

  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private userservice: UserService,
    private errorhandling: ErrorhandlingService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this.member_id = params['id'];
      }
    });
  }

  ngOnInit() {
    this.getTraderDetail(this.member_id);
    // this.getBalDetail(this.member_id);
    this.userservice.fetCountryCodes().subscribe((res: any) => {
      console.log(res.json());
      this.phoneCode = res.json().data;
    });
  }

  OpenModal() {
    this.modalRef = this.modalService.open(this.content2);
  }
  OpenModalName() {
    this.modalRef = this.modalService.open(this.content5);
  }

  checkValidationEmail(e) {
    let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (pattern.test(e)) {
      this.updateButtonDisable = true;
    } else {
      this.updateButtonDisable = false;
    }
  }

  checkValidatonsPhone(e) {
    if (e.length == 10) {
      this.updateButtonDisable = true;
    } else {
      this.updateButtonDisable = false;
    }
  }

  updateEmailOrPassword() {
    let data = {
      userId: this.member_id,
      email: this.editEmailAddress,
      phone: this.editPhoneNumber,
      phone_code: this.phoneCodeId
    };

    this.userservice.updateemailOrphone(data).subscribe(
      (res: any) => {
        this.modalRef.close();
        this.getTraderDetail(this.member_id);
        this.toastr.success(res.json().message);
      },
      error => {
        this.toastr.error(error.json().message);
      }
    );
  }

  updateName() {
    let data = {
      userId: this.member_id,
      first_name: this.personalDetailsFistName,
      last_name: this.personalDetailsLastName
    };

    this.userservice.updateemailOrphone(data).subscribe(
      (res: any) => {
        this.modalRef.close();
        this.getTraderDetail(this.member_id);
        this.toastr.success(res.json().message);
      },
      error => {
        this.toastr.error(error.json().message);
      }
    );
  }

  selectedCode(e) {
    this.phoneCodeId = e.id;
  }

  getTraderDetail(member_id) {
    this.userservice.changeValueLoading(1);
    this.userservice.getTraderDetail(member_id).subscribe(
      response => {
        if (response.json().status) {
          if (response.json().data.length > 0) {
            this.traderDetail = response.json().data[0];
            console.log(response.json());
            this.editEmailAddress = this.traderDetail['email'];
            this.editPhoneNumber = this.traderDetail['phone'];
            this.phone_code = this.traderDetail['phone_code'];
            this.phoneCodeId = this.traderDetail['country_code_id'];
            this.personalDetailsFistName = this.traderDetail['first_name'];
            this.personalDetailsLastName = this.traderDetail['last_name'];

            this.userservice.changeValueLoading(0);
          }

          if (response.json().userHistory.length > 0) response.json().userHistory.splice(3, 1);
          this.userHistory = response.json().userHistory;
          this.userservice.changeValueLoading(0);
        }
      },
      error => {
        this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }

  getBalDetail(member_id) {
    this.userservice.changeValueLoading(1);
    this.userservice.getKycDetails(member_id).subscribe(
      response => {
        if (response.json().status) {
          if (response.json().data.length > 0) {
            this.balDetail = response.json().data[0];
            this.userservice.changeValueLoading(0);
          }
        }
      },
      error => {
        this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error);
      }
    );
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
}
