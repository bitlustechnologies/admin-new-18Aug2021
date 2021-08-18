import { ErrorhandlingService } from './../../services/errorhandling.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private errorhandling: ErrorhandlingService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    public activeModal: NgbActiveModal
  ) {}
  viewImageInModal: any;
  userid: any;
  status: any;
  kycData: any;
  gender: any;
  docType: any;
  imglink: any;
  documnt: boolean = false;
  selfi: boolean = false;
  selfielink: any;
  text: any;
  show: boolean = false;
  closeResult: any;
  frontPhoto: any;
  backPhoto: any;
  docTypeImg: any = 0;
  hrefPath: any;
  pageNo:any=1

  private modalRef: NgbModalRef;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userid = params['id'];

        this.userservice.getUserKyc(this.userid).subscribe(response => {
          if (response.json().data.length != 0) {
            this.kycData = response.json().data;
            console.log('kycDaata', this.kycData);
            if (response.json().data.gender == 1) this.gender = 'Male';
            else if (response.json().data.gender == 2) this.gender = 'Female';
            else if (response.json().data.gender == 3) this.gender = 'Other';

            // document type

            if (response.json().data.doc_type == 1) this.docType = 'National Id';
            if (response.json().data.doc_type == 2) this.docType = 'Passport';
            if (response.json().data.doc_type == 3) this.docType = 'Driving License';

            // image link
            if (response.json().data.kyc_p_res_photo && response.json().data.kyc_p_res_photo != null) {
              var ext = response.json().data.kyc_p_res_photo.substring(response.json().data.kyc_p_res_photo.lastIndexOf('.') + 1);

              if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf') {
                this.docTypeImg = 1;
                this.imglink = './assets/images/doc.png';
                this.hrefPath = response.json().data.kyc_p_res_photo;
                this.documnt = true;
              } else {
                this.documnt = true;
                this.docTypeImg = 0;
                this.imglink = response.json().data.kyc_p_res_photo;
              }
            }
            // this.imglink= response.json().data.kyc_p_res_photo

            if (response.json().data.kyc_selfie_photo && response.json().data.kyc_selfie_photo != null) {
              this.selfi = true;
              this.selfielink = response.json().data.kyc_selfie_photo;
              console.log(response.json().data.kyc_selfie_photo);
            }

            if (response.json().data.kyc_front_photo && response.json().data.kyc_front_photo != null) {
              this.frontPhoto = response.json().data.kyc_front_photo;
            }

            if (response.json().data.kyc_back_photo && response.json().data.kyc_back_photo != null) {
              this.backPhoto = response.json().data.kyc_back_photo;
            }

            this.status = response.json().data.kyc_status;
            if (this.status == null || this.status == 0) {
              this.status = 2;
              this.text = 'Pending';
            } else {
              this.text = 'Approved';
            }
          }
          error => {
            // this.userservice.changeValueLoading(0);
            this.errorhandling.errorHandler(error);
          };
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  open(e) {
    this.viewImageInModal = e;
    this.modalRef = this.modalService.open(this.content);
    // modalRef.componentInstance.name = 'World';
  }

  viewBank(e){
    this.router.navigate(['/admin/user-bank-view/',e,this.pageNo])
  }

  changeStatus(userid, status) {
    this.userservice.changeValueLoading(1);
    let reason = '';

    this.userservice.changeKycStatus(status, userid, reason).subscribe(
      response => {
        this.toastr.success("User's KYC approved successfully", 'Status Changed');

        this.text = 'Approved';
        this.kycData.kyc_status = 1;

        setTimeout(() => {
          this.modalRef.close();
        }, 500);
        this.userservice.changeValueLoading(0);
        this.router.navigate(['/admin/members']);
      },
      error => {
        this.userservice.changeValueLoading(0);
        this.toastr.error(error.json().message, 'Error');
        this.errorhandling.errorHandler(error);
      }
    );
  }

  diapprove(reason, userid) {
    this.userservice.changeValueLoading(1);
    if (!reason) {
      this.toastr.error('Please enter reason', 'Error');
    this.userservice.changeValueLoading(0);

      return false;
    }

    this.userservice.changeKycStatus(0, userid, reason).subscribe(
      response => {
        this.toastr.success("User's KYC disapproved successfully", 'Status Changed');

        this.text = 'Disapproved';

        setTimeout(() => {
          this.modalRef.close();
        }, 500);

        this.userservice.changeValueLoading(0);
        this.router.navigate(['/admin/members']);
      },
      error => {
        this.userservice.changeValueLoading(0);
        this.toastr.error(error.json().message, 'Error');
        this.errorhandling.errorHandler(error);
      }
    );
  }

  open2(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result
      .then
      // result => {
      //   this.closeResult = `Closed with: ${result}`;
      // },
      // reason => {
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // }
      ();
  }
}
