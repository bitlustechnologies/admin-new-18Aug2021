import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Kyc } from './../../shared/interfaces/kyc';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import {Router, ActivatedRoute} from  '@angular/router';
import { UserService } from './../../services/user.service';
import { KycEditModel } from '../../shared/models/kyc-edit.model';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { INgxSelectOption } from 'ngx-select-ex';
import {environment} from '../../../environments/environment'
import * as $ from 'jquery'

@Component({
  selector: 'app-member-approved-edit',
  templateUrl: './member-approved-edit.component.html',
  styleUrls: ['./member-approved-edit.component.css']
})
export class MemberApprovedEditComponent implements OnInit {
  userSelectedDocType:any
  adminSelectedDoctype:any
  msgs: Message[] = [];
  sizeUpload = environment.uploadFileSizeKyc
  userid:any;
  obj:any;
  public now: Date = new Date();
  editUser:KycEditModel =new KycEditModel();
  public items: any[] = [];
  countryCode: any[] = [];
  Kycdata = {} as Kyc;
  gender: any
  doctype: any
  doctypevalue:any
  realationSelected: boolean = false;
  selfie_photo: any = './assets/images/doc.png'
  p_res_photo: any = './assets/images/doc.png'
  kyc_front_photo:any='./assets/images/doc.png'
  
  kyc_back_photo:any='./assets/images/doc.png'
  docTypeImg: any = 0;
  docExpiryDate:any
  hrefPath:any;
  exist: any = 0
  countryVal: any
  autoCountrycode: string = '';
  selectedCountry: string = '';
  seletedFileSelfie: any;
  seletedFileFront:any
  seletedFile: any;
  public ngxControl = new FormControl();
  public ngxControl2 = new FormControl();
  private _ngxDefaultTimeout;
  private _ngxDefaultInterval;
  private _ngxDefault;
  private _ngxDefault2;
  gender1: any;

  constructor(private route:Router, private _route:ActivatedRoute, 
    private messageservice: MessageService, private userservice: UserService,
    private toastr: ToastrService,private errorhandling:ErrorhandlingService) { 
    this._route.params.subscribe( params =>
    {
      if (params["id"]) {
        this.userid=params["id"];
      }
    });
  }
  
  ngOnInit() {
    this.userservice.fetCountryCodes().subscribe((res) => {
      this.countryCode = res.json().data;
      console.log(res.json().data)
      this.items = res.json().data;
      this.userservice.getUserKyc(this.userid)
      .subscribe(response=>{
        console.log(response.json())
        this.Kycdata = response.json().data;
        this.Kycdata.phonecode = response.json().data.phone_code;
        this.Kycdata.email = response.json().data.email;
        this.Kycdata.doc_number = response.json().data.doc_number == 'null'?'':response.json().data.doc_number;

        this.Kycdata.doc_exp_date = response.json().data.doc_exp_date;
       this.docExpiryDate = response.json().data.doc_exp_date
       this.doctypevalue = response.json().data.doc_type
        if (response.json().data.selfie_photo != null)
        this.selfie_photo = response.json().data.selfie_photo
      let searchCodeData = this.countryCode.filter(x => x.text.toLowerCase() == response.json().data.country.toLowerCase());
    console.log(searchCodeData)
      this.countryVal = searchCodeData[0].id;
      this._ngxDefault = searchCodeData[0].id;
      this.autoCountrycode = searchCodeData[0].phonecode;
      this.selectedCountry = searchCodeData[0].text;

        if (this.Kycdata.gender == 1)
          this.gender = 'Male'
        if (this.Kycdata.gender == 2)
          this.gender = 'Female'
        if (this.Kycdata.gender == 3)
          this.gender = 'Other'

        if (this.Kycdata.doc_type == 1)
      {
        this.doctype = 'National Id'
        this.adminSelectedDoctype = 'National Id'
      }
        if (this.Kycdata.doc_type == 2)
      {
        this.doctype = 'Passport'
        this.adminSelectedDoctype = 'Passport'
      }
        if (this.Kycdata.doc_type == 3)
  {
    this.doctype = 'Driving License'
    this.adminSelectedDoctype = 'Driving License'
  }


        if (response.json().data.relation == "HUSBAND") {
          this.realationSelected = true;
        } else {
          this.realationSelected = false;
        }

        if (response.json().data.kyc_p_res_photo != null) {
          var ext = response.json().data.kyc_p_res_photo.substring(response.json().data.kyc_p_res_photo.lastIndexOf('.') + 1);
          if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xlm') {
            this.docTypeImg = 1;
            this.p_res_photo = './assets/images/doc.png';
            this.hrefPath = response.json().data.kyc_p_res_photo;
          }
          else{
            this.docTypeImg = 0;
            this.p_res_photo = response.json().data.kyc_p_res_photo
        console.log(this.p_res_photo)

          }
          this.exist = 1
        }

        if (response.json().data.kyc_front_photo != null) {
          var ext = response.json().data.kyc_front_photo.substring(response.json().data.kyc_front_photo.lastIndexOf('.') + 1);
          if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xlm') {
            this.docTypeImg = 1;
            this.kyc_front_photo = './assets/images/doc.png';
            this.hrefPath = response.json().data.kyc_front_photo;
          }
          else{
            this.docTypeImg = 0;
            this.kyc_front_photo = response.json().data.kyc_front_photo
        console.log(this.kyc_front_photo)

          }
          this.exist = 1
        }

        if (response.json().data.kyc_back_photo != null) {
          var ext = response.json().data.kyc_back_photo.substring(response.json().data.kyc_back_photo.lastIndexOf('.') + 1);
          if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xlm') {
            this.docTypeImg = 1;
            this.kyc_back_photo = './assets/images/doc.png';
            this.hrefPath = response.json().data.kyc_back_photo;
          }
          else{
            this.docTypeImg = 0;
            this.kyc_back_photo = response.json().data.kyc_back_photo
        console.log(this.kyc_back_photo)

          }
          this.exist = 1
        }

     
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })

    });

  }

  public doSelect(v: any) {
    let currentArr = this.countryCode.filter(x => x.id == v.value);
    this.autoCountrycode = currentArr[0].phonecode;
    this.selectedCountry = currentArr[0].text;
    this.Kycdata.phonecode = v.value;
  }


  documentSelection(e){
    console.log(e.target.value)
if(e.target.value != this.doctypevalue){
   this.Kycdata.doc_exp_date = '0000-00-00'
}else{
  this.Kycdata.doc_exp_date = this.docExpiryDate
}

if (e.target.value == 1)
this.adminSelectedDoctype = 'National Id'
if (e.target.value == 2)
this.adminSelectedDoctype = 'Passport'
if (e.target.value == 3)
this.adminSelectedDoctype = 'Driving License'

console.log('>>>>>',this.doctype)

  }

  UpdateKycUser(editForm: NgForm){
    console.log(editForm)
    this.userservice.changeValueLoading(1);
    this.userservice.changeValueLoading(true);
    var date = new  Date (editForm.value.dob);
    var date1 = new Date(this.now);
    var date2 = new Date(date.toDateString());
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    var years = diffDays / 365
  
    if(years < 18)
    {
      this.userservice.changeValueLoading(0);
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: "Your age must be greater than 18 years" });
      return false;
    }
    
    // if (editForm.value.doc_type == 0 ) {
    //   this.userservice.changeValueLoading(0);
    //   this.messageservice.add({ severity: 'error', summary: 'Error', detail: "Please select document type" });
    //   return false;
    // }

    // now check if selected file isempty

    if (!this.seletedFile && this.exist != 1) {
      this.userservice.changeValueLoading(0);
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: "Document is required" });
      return true;
    }

    if (!editForm.value.country || editForm.value.country == '') {
      this.userservice.changeValueLoading(0);
      this.messageservice.add({severity: 'error', summary: 'Error', detail: "Please select country code" });
      return false;
    }

    // if (!this.Kycdata.phonecode || this.Kycdata.phonecode == '') {
    //   this.userservice.changeValueLoading(false);
    //   this.messageservice.add({severity: 'error', summary: 'Error', detail: "Please select country code" });
    //   return false;
    // }

    if (this.autoCountrycode) {
      editForm.value.phone_code = this.countryVal;
    }

    if (this.selfie_photo == 0) {
      this.userservice.changeValueLoading(0);
      // now check if selected file isempty
      if (!this.seletedFileSelfie) {
        this.userservice.changeValueLoading(false);
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: "Selfie Photo is required" });
        return false;
      }
    }

    if (editForm.value.dob == '0000-00-00') {
      this.userservice.changeValueLoading(0);
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: "Please select DOB" });
      return false
    }
    if (editForm.value.doc_exp_date == '0000-00-00' && editForm.value.doc_type != 1) {
      this.userservice.changeValueLoading(0);
      this.messageservice.add({ severity: 'error', summary: 'Error', detail: "Please select document expiry date" });
      return false
    }
    editForm.value.member_id = this.userid;
    editForm.value.country = this.selectedCountry;
    editForm.value.doc_exp_date = this.Kycdata.doc_exp_date
    editForm.value['email'] = this.Kycdata.email

    this.userservice.updateKyc(editForm.value, this.seletedFile, this.seletedFileSelfie,this.seletedFileFront)
      .subscribe(response => {
        this.userservice.changeValueLoading(0);
        this.messageservice.add({severity:'success', summary:'Success', detail:"KYC details has been updated"});

        // now redirecting to setting page
        setTimeout((route: Router) => {
          this.route.navigate(['/admin/approved_kyc']);
          return true;
        }, 3000); 
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.userservice.changeValueLoading(0);
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: error.json().message });
        this.errorhandling.errorHandler(error)
      })
  }

  upload(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }

    let seletedFile: File = e.target.files[0];
    let validate = this.validateFile(seletedFile.name, e.target.id, seletedFile.size);
    if (validate === false) {
      return false;
    } else {
      reader.onload = (event: ProgressEvent) => {
        var ext = seletedFile.name.substring(seletedFile.name.lastIndexOf('.') + 1);
          if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xlm') {
            this.docTypeImg = 1;
            this.kyc_front_photo = './assets/images/doc.png';
          }
          else
          {
            this.docTypeImg = 0;
            this.kyc_front_photo = (<FileReader>event.target).result;
          }
      }
      this.seletedFileFront = seletedFile
    }
  }
  upload_pan(e){
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }

    let seletedFile: File = e.target.files[0];
    let validate = this.validateFile(seletedFile.name, e.target.id, seletedFile.size);
    if (validate === false) {
      return false;
    } else {
      reader.onload = (event: ProgressEvent) => {
        var ext = seletedFile.name.substring(seletedFile.name.lastIndexOf('.') + 1);
          if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'xlm') {
            this.docTypeImg = 1;
            this.p_res_photo = './assets/images/doc.png';
          }
          else
          {
            this.docTypeImg = 0;
            this.p_res_photo = (<FileReader>event.target).result;
          }
      }
      this.seletedFile = seletedFile
    }
  }

  upload_backphoto(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }

    let seletedFileSelfie: File = e.target.files[0];

    let validateSefie = this.validateFile(seletedFileSelfie.name, 'photo', seletedFileSelfie.size);
    if (validateSefie === false) {
      return false;
    } else {
      reader.onload = (event: ProgressEvent) => {
        this.kyc_back_photo = (<FileReader>event.target).result;
      }
      this.seletedFileSelfie = seletedFileSelfie
    }
  }

  validateFile(name: String, typeis, size) {
    size = Math.round((size / 1000)) / 1024;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (typeis == "photo") {
      if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'gif' || ext.toLowerCase() == 'tiff' || ext.toLowerCase() == 'tif' || ext.toLowerCase() == 'raw') {
        if (size <= this.sizeUpload) {
          return true;
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: `Document size should be less than  ${this.sizeUpload}Mb.` });
          return false;
        }
      }
      else {
        $('#selfie_photo').val('')
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Profile image format should be png,jpg,gif,raw or tiff.' });
        return false;
      }
    } else {
      if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'xlm' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'gif' || ext.toLowerCase() == 'tiff' || ext.toLowerCase() == 'tif' || ext.toLowerCase() == 'raw') {
        if (size <= this.sizeUpload) {
          return true;
        } else {
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: `Document size should be less than  ${this.sizeUpload}Mb.` });
          return false;
        }
      }
      else {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Document format should be doc,docx,xlm,pdf,jpeg,png,jpg,gif,raw or tiff.' });
        return false;
      }
    }
  }

}
