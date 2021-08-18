import { ErrorhandlingService } from './../../services/errorhandling.service';
import { environment } from './../../../environments/environment';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    public activeModal: NgbActiveModal,
    private errorhandling: ErrorhandlingService
  ) {}
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

  private modalRef: NgbModalRef;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userid = params['id'];

        this.userservice.getUserKyc(this.userid).subscribe(
          response => {
            this.kycData = response.json().data;
console.log(response.json().data)
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
            if (response.json().data.kyc_selfie_photo && response.json().data.kyc_selfie_photo != null) {
              this.selfi = true;
              this.selfielink = response.json().data.kyc_selfie_photo;
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
              this.text = 'Disapproved';
            } else {
              this.text = 'Approved';
            }
          },
          error => {
            // this.userservice.changeValueLoading(0);
            this.errorhandling.errorHandler(error);
          }
        );
      } else {
        this.router.navigate(['/']);
      }
    });
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
