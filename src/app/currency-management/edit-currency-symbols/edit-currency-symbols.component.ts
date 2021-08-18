import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';
import { CurrencyService } from './../../services/currency.service';
import { ErrorhandlingService } from './../../services/errorhandling.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-currency-symbols',
  templateUrl: './edit-currency-symbols.component.html',
  styleUrls: ['./edit-currency-symbols.component.css']
})
export class EditCurrencySymbolsComponent implements OnInit {

  empty:boolean=false;
  currencyList:any[]=[];
  currencyDetail:any;
  selectedCurrency:any;
  currency_id : any;
  currency_icon: any = './assets/images/doc.png'
  seletedFile: any;

  exist: any = 0;

  constructor(private currencyservice: CurrencyService, 
    private errorhandling:ErrorhandlingService,
    private router: Router, private _route:ActivatedRoute,
    private UserService: UserService, private toastr:ToastrService) { 

      this._route.queryParams.subscribe( params =>
        {
          if (params["currency_id"]) {
            this.currency_id=params["currency_id"];
          }
        });
    }

  ngOnInit() {
    this.getActiveCurrencyDetail();
  }

  getActiveCurrencyDetail(){
    this.currencyservice.getActiveCurrency()
    .subscribe(response => {
      if(response.data.length){
        this.currencyList= response.data;
        this.selectedCurrency = 	this.currencyList.filter(x => x.currency_id == this.currency_id);
        this.currencyDetail = this.selectedCurrency[0];

        if (this.currencyDetail.icon != null) {
          this.currency_icon = this.currencyDetail.icon
          this.exist = 1
        }
      }
      else
      {
        this.currencyList = [];
      }
    },(error)=>{
      this.errorhandling.errorHandler(error)
    });
  }

  UpdateCurrencyDetail(editForm)
  {
    this.UserService.changeValueLoading(1);
    // now check if selected file isempty
    
    // if (!this.seletedFile && this.exist != 1) {
    if (!this.seletedFile) {
      this.UserService.changeValueLoading(0);
      this.toastr.error('Icon is required', 'Failure!');
      return true;
    }
    editForm.value.currency_id = this.currency_id;
    this.currencyservice.updateCurrencyDetail(editForm.value, this.seletedFile)
      .subscribe(response => {
        this.UserService.changeValueLoading(0);
        this.toastr.success('Currency details has been updated');
        this.router.navigate(['/currency-management/currency-symbols']);
      },(error)=>{
        this.errorhandling.errorHandler(error)
        this.UserService.changeValueLoading(0);
        this.toastr.error(error.json().message);
      })
  }

  upload(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
    }

    let seletedFile: File = e.target.files[0];
    let validate = this.validateFile(seletedFile.name, seletedFile.size);
    if (validate === false) {
      return false;
    } else {
      reader.onload = (event: ProgressEvent) => {
        this.currency_icon = (<FileReader>event.target).result;
        this.currencyDetail.icon = this.currency_icon;
      }
      this.seletedFile = seletedFile
    }
  }

  validateFile(name: String, size) {
    size = Math.round((size / 1000)) / 1024;
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg') {
        if (size <= 1) {
          return true;
        } else {
          this.toastr.error('Image size should be less than 1 Mb.');
          return false;
        }
      }
      else {
        this.toastr.error('Image format should be png or jpg.');
        return false;
      }
  }
}
