import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  st
} from '@angular/core/src/render3';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  NgbModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import {
  ToastrService
} from 'ngx-toastr';
import {
  UserService
} from '../../services/user.service';

@Component({
  selector: 'app-user-bank-view',
  templateUrl: './user-bank-view.component.html',
  styleUrls: ['./user-bank-view.component.css']
})
export class UserBankViewComponent implements OnInit {
  @ViewChild('content2') content2: TemplateRef < any > ;
  @ViewChild('content3') content3: TemplateRef < any > ;
  @ViewChild('content4') content4: TemplateRef < any > ;

  deleteModalId: any
  modalRef: NgbModalRef;
  modalStatus: any
  modalId: any
  member_id: any
  userBankList: any
  pageNo = 1
  AllapprovedOrDisApprovedStatus: any
  reasonDisapprove:any =''
  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService, private router: Router) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.member_id = params['id'];
        this.pageNo = params['page']
        console.log(this.pageNo)
      }
    });
  }

  ngOnInit() {

    this.getBankdaetail({member_id:this.member_id})
  }

  OpenModal(id, status) {
    console.log(id)
    console.log(status)
    this.modalId = id
    this.modalStatus = status
    this.modalRef = this.modalService.open(this.content2);
  }
  approveOrDisaproveModal() {
    this.approveDisapprove(this.modalId, this.modalStatus)
  }

  updateBankDetails(e) {
    let editbank = this.userBankList.filter((val: any) => val.id == e)
    let bank = editbank[0]
   bank['pageNo']=this.pageNo
   console.log(bank)
    localStorage.setItem('usereditbankdetails', JSON.stringify(bank))
    console.log(JSON.parse(localStorage.getItem('usereditbankdetails')))
    this.router.navigate(['/admin/user-bank-update', e])
  }

  getBankdaetail(data) {
    this.userService.getUserSpecificBankList(data).subscribe((res: any) => {
      console.log(res.json())
      if(res.json().data.length == 0){
        this.router.navigate(['/admin/user-bank'])
      }else{
        this.userBankList = res.json().data
      }
    })
  }

  openDeleteModal(e) {
    this.deleteModalId = e
    this.modalRef = this.modalService.open(this.content4);
  }

  approveDisapprove(bId, status) {
    console.log(bId,status)
    let data = {
      id: bId,
      status: status,
      reason:this.reasonDisapprove
    }
    this.userService.approveDissapproveUserBankList(data).subscribe((res: any) => {
      this.toastr.success(res.json().message);
      this.modalRef.close()
      this.reasonDisapprove =''

      let data = {
        member_id:this.member_id
      }
      this.getBankdaetail(data)
    }, (error) => {
      this.toastr.error(error.error.message);

    })
  }
  approveOrDisapprovemodal() {
    this.approveDisapproveAll(this.member_id, this.AllapprovedOrDisApprovedStatus)
  }

  approveAllBankModal(id, status) {
    this.AllapprovedOrDisApprovedStatus = status
    this.modalRef = this.modalService.open(this.content3);
  }

  approveDisapproveAll(mid,status,) {
 
    let data = {
      userId: this.member_id,
      status: this.AllapprovedOrDisApprovedStatus,
      reason:this.reasonDisapprove
    }
    this.userService.approveDissapproveUserAllBankList(data).subscribe((res: any) => {
      console.log(res)
      this.toastr.success(res.json().message);
      this.modalRef.close()
this.reasonDisapprove =''
      let data = {
        member_id:this.member_id

      }

      this.getBankdaetail(data)
    }, (error) => {
      this.toastr.error(error.json().message);
      this.modalRef.close()
    })
  }

  deleteUserBank(e) {

    let data = {
      id: e,
      status: 'DELETE',
      reason : this.reasonDisapprove
    }
    this.userService.deleteuserBank(data).subscribe((res: any) => {
      this.reasonDisapprove =''
      this.modalRef.close()
      this.toastr.success(res.json().message);
      let data = {
        member_id:this.member_id

      }
      this.getBankdaetail(data)
    }, (error) => {
      this.toastr.error(error.json().message);
      this.modalRef.close()

    })
  }
  deleteAllUserbank(e, status) {
    let data = {
      userId: e,
      status: 'DELETE'
    }
    this.userService.deleteUserAllBank(data).subscribe((res: any) => {
      console.log(res)
      let data = {
        member_id:this.member_id

      }
      this.router.navigate(['/admin/user-bank'])
      // this.getBankdaetail(data)
    })
  }

}
