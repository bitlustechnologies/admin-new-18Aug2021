import { Component, OnInit ,ViewChild, TemplateRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  empty:boolean=false;
  
  bankList:any=[];
  total_bank:any = 0;
  defaultBank:any;
  defaultBankList:any=[];
  
  pesaList:any=[];
  total_pesa:any = 0;
  defaultPesa:any;
  defaultPesaList:any=[];
  type:any='bank';
  
  private modalRef: NgbModalRef;

  constructor(private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private userservice: UserService) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.getBankList();
    // this.getPesaList();
  }

  // selectTab(methodtype)
  // {
  //   this.type = methodtype.nextId;
  // }

  getBankList(){
    this.userservice.getBankList()
    .subscribe(response => {

      if(response['result'].length > 0)
      {
        this.empty = false
        this.bankList=response['result'];
        // this.total_bank=this.bankList.length
        this.defaultBankList = this.bankList.filter(x=>x.is_default == 1);
        this.defaultBank = this.defaultBankList[0].bank_id;

        // this.bankList=response['result'].filter(x=>x.type == 'bank');
        // this.total_bank=this.bankList.length
        // this.defaultBankList = this.bankList.filter(x=>x.is_default == 1);
        // this.defaultBank = this.defaultBankList[0].bank_id;
      }
      else
      {
        this.empty = true
      }
    },(error)=>{
        this.empty = true
    })
  }

  // getPesaList(){
  //   this.userservice.getBankList()
  //   .subscribe(response => {

  //     if(response['result'].length > 0)
  //     {
  //       this.empty = false
  //       this.pesaList=response['result'].filter(x=>x.type == 'pesalink');
  //       this.total_pesa=this.pesaList.length
  //       this.defaultPesaList = this.pesaList.filter(x=>x.is_default == 1);
  //       this.defaultPesa = this.defaultPesaList[0].bank_id;
  //     }
  //     else
  //     {
  //       this.empty = true
  //     }
  //   },(error)=>{
  //       this.empty = true
  //   })
  // }

  setDefault(bank_id, type)
  {
    this.userservice.setDefaultBank(bank_id, type)
    .subscribe(response => {
      this.defaultBank=bank_id;
    });
  }

  // deletePesalink(pesa_id)
  // {
  //   this.userservice.deleteRecordById(pesa_id, 'pesalink')
  //   .subscribe(response=>{
  //     console.log(response.json().message)
  //     this.toastr.success("Deleted successfully", 'Deleted');
  //     this.getPesaList();
  //   },(err)=>{
  //     console.log(err.json().message)
  //     this.toastr.error(err.json().message, 'Error');
  //   });
  // }

  deleteBank(bank_id)
  {
    this.userservice.deleteRecordById(bank_id,'bank')
    .subscribe(response=>{
      this.toastr.success("Deleted successfully", 'Deleted');
      this.modalRef.close()
      this.getBankList();
    },(err)=>{
      this.toastr.error(err.json().message, 'Error');
    });
  }

  open2(content) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then();
  }
}