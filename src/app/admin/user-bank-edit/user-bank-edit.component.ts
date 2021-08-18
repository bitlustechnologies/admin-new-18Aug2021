import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
import {
  UserService
} from '../../services/user.service';

@Component({
  selector: 'app-user-bank-edit',
  templateUrl: './user-bank-edit.component.html',
  styleUrls: ['./user-bank-edit.component.css']
})

export class UserBankEditComponent implements OnInit {
  account_number: any
  bank_name: any
  branch_name: any
  ifsc_code: any
  bank_id: any
  member_id: any
  accountType = "Savings Account";
  passBookPhoto: any
  pageNo: any

  constructor(private route: ActivatedRoute, private router: Router, private userservice: UserService, private toastr: ToastrService) {}

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.bank_id = this.route.snapshot.params.id
      let bankData = JSON.parse(localStorage.getItem('usereditbankdetails'))
      console.log(bankData)
      this.account_number = bankData.account_number
      this.bank_name = bankData.bank
      this.branch_name = bankData.branch_name
      this.ifsc_code = bankData.ifsc_code
      this.member_id = bankData.member_id
      this.accountType = bankData.type_of_account == 'Saving Account'?'Savings Account':bankData.type_of_account,
        this.passBookPhoto = bankData.file_path
        this.pageNo= bankData.pageNo
    }
  }

  selectedType(e) {
    this.accountType = e
  }

  updateBankDetail(e) {
    let data = {
      bank: this.bank_name,
      account_number: this.account_number,
      ifsc_code: this.ifsc_code,
      branch_name: this.branch_name,
      type_of_account: this.accountType,
      swift_code: 'null',
      is_default: ''
    }
    this.userservice.updateUserBankList(this.bank_id, data).subscribe((res: any) => {
      this.toastr.success(res.json().message)
      this.router.navigate(['/admin/user-bank-view/',this.member_id,this.pageNo])

    }, (error) => {
      this.toastr.error(error.error.message)
    })

  }

}
