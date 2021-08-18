// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import {Router, ActivatedRoute} from  '@angular/router';
// import { UserService } from './../../services/user.service';

// @Component({
//   selector: 'app-manage-limit-edit',
//   templateUrl: './manage-limit-edit.component.html',
//   styleUrls: ['./manage-limit-edit.component.css']
// })
// export class ManageLimitEditComponent implements OnInit {

//   userid:any;
// editUser = { name: '',email: '', password: '', comission:false,limit:false,fund:false};
//   constructor(private route:Router, private _route:ActivatedRoute, private userservice: UserService) { 
//     this._route.params.subscribe( params =>
//       {
//        if (params["id"]) {
        
//         this.userid=params["id"];
//        }
//      }
//    );
//   }

//   ngOnInit() {
//     console.log("This is userid: ");
//     console.log(this.userid);
// this.editUser.name='Moninder';
// this.editUser.email='moninder@mailinator.com';
// this.editUser.password='123456';
// this.editUser.comission=true;
// this.editUser.limit=true;
// this.editUser.fund=false;

//   }
//   UpdateUser(editForm: NgForm):void{

//     console.log(editForm.value);
//     this.route.navigate(['/sub-admin-management/sub-admin-users']);
   
//     }

// }
