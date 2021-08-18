import { ErrorhandlingService } from './../../services/errorhandling.service';
import { data } from './../../table/smart-table/smart-data-table';
import { CurrencyService } from './../../services/currency.service';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  fiatCurrency:any[]=[];
  defaultCurrency:any;
  constructor(private userservice:UserService, private toastr: ToastrService, 
    private currencyservice:CurrencyService, private errorhandling:ErrorhandlingService) { }
  
  uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });

  userInfo:any={};
  google2fa:any=0
  url:any
  seletedFile:any
  phoneNo:any = ''

  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
    this.getFiatCurrency();
    this.userservice.casturl.subscribe(url => this.url = url);
    this.userservice.getuserProfile().subscribe(response=>{
      this.userInfo = response.json().data;
      this.google2fa = response.json().data.google2fa_status;
      if(response.json().data.file_path != null)
        this.userservice.changeValueURL(response.json().data.file_path)
      if(response.json().phone)
        this.phoneNo = response.json().phone
      else
        this.phoneNo = ''
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error);
    })
    

    this.currencyservice.adminDefaultCurrency()
      .subscribe(response => {
        this.defaultCurrency = response.data[0].currency_id;
      },(error)=>{
        // this.userservice.changeValueLoading(0);
        this.errorhandling.errorHandler(error)
      })
  }

  getFiatCurrency(){
    this.currencyservice.getFiatCurrencyApi()
    .subscribe(response => {
      this.fiatCurrency = response.data.filter(x => x.is_fiat_currency == 1);
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }

  setCurrency(currency_id) {
    var member_id = this.userservice.currentUser.data;
    this.currencyservice.updateAdminCurrency(currency_id, member_id)
    .subscribe(response => {
      this.defaultCurrency = currency_id;
    },(error)=>{
      // this.userservice.changeValueLoading(0);
      this.errorhandling.errorHandler(error)
    })
  }

  upload_profile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // now upload image
      let seletedFile: File = event.target.files[0];
      let validate = this.validateFile(seletedFile.name,event.target.id,seletedFile.size);
      if(validate === false){
        return false;
      }else{
        reader.onload = (event: ProgressEvent) => {
          this.url = (<FileReader>event.target).result;
        }
        this.seletedFile = seletedFile
        // now upload and set this.url to image
        this.userservice.uploadProfile(seletedFile)
        .subscribe(response => {
          this.toastr.success( response.json().message);          
          this.userservice.getuserKyc()
            .subscribe(response => {
              if(response.json().data.file_path != null)
                this.userservice.changeValueURL(response.json().data.file_path)   
            })
        })
        ,(error)=>{
          this.toastr.error('An error has been occured');          
        }
      }
    }
  }

  validateFile(name: String,typeis,size) {
    size = Math.round((size/1000))/1024;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if(typeis == "photo"){
      if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
        if(size <= 1){
          return true;
        }else{
          this.toastr.error('Document size should be less than 1 Mb.');          
          return false;
        }
      }
      else {
        this.toastr.error('Profile image format should be png or jpg.');
        return false;
      }
    }else{
      if (ext.toLowerCase() == 'doc' || ext.toLowerCase() == 'docx' || ext.toLowerCase() == 'pdf' || ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
        if(size <= 1){
          return true;
        }else{
          this.toastr.error('Document size should be less than 1 Mb.');
          return false;
        }
      }
      else {
        this.toastr.error('Document format should be doc,pdf,png or jpg', 'Error!');
        return false;
      }
    }
  }
}