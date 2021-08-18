import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router, ActivatedRoute} from  '@angular/router';
import { UserService } from './../../services/user.service';
import { AdminUserModel } from '../../shared/models/admin-user.model';
import { ToastrService } from 'ngx-toastr';
import { SubAdminService } from '../../services/sub-admin.service';

import * as $ from 'jquery'

@Component({
  selector: 'app-sub-admin-edit',
  templateUrl: './sub-admin-edit.component.html',
  styleUrls: ['./sub-admin-edit.component.css']
})
export class SubAdminEditComponent implements OnInit {
  adminUserModel:AdminUserModel= new AdminUserModel;
  menus: any[] = [];
  subMenus: any[] = [];
  btnDisable:boolean=false
  id:any
  selectedMainMenu:any[]=[];
  selectedSubMenu:any[]=[];
  categories:any[]= []
  parentmenu:any[]= []
  childmenu:any[]= []


  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router:Router,
    private subAdmin: SubAdminService
  ){}
  ngOnInit() {
    this.subAdmin.getAllMenus().subscribe(result => {
        this.categories = result.json().data;
        this.parentmenu = result.json().data.filter(x => x.parent == 0);
        for(var i in this.parentmenu)
        {
          this.childmenu[this.parentmenu[i].access_id] = this.categories.filter(x => x.parent == this.parentmenu[i].access_id);
        }
    },(error)=>{})

    this.selectMainMenu();
    this.selectSubMenu();
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.subAdmin.getsubAdminByMemberId(this.id)
        .subscribe((response:any) => {
          this.adminUserModel.userFName = response.json().data[0].first_name
          this.adminUserModel.userLName = response.json().data[0].last_name
          this.adminUserModel.userEmail = response.json().data[0].email;
          // this.selectedOptions = JSON.parse(response.json().data[0].sub_admin_menus)
          this.selectedMainMenu = JSON.parse(response.json().data[0].sub_admin_menus)
          this.selectMainMenu();
          this.selectedSubMenu = JSON.parse(response.json().data[0].sub_admin_submenus)
          this.selectSubMenu()
        },(error)=>{
      })   
    })
  }

  ngAfterViewInit(){
  }

  updateSubAdminUser(userForm: NgForm){
    this.btnDisable = true
    if(this.menus.length == 0)
    {
      this.toastr.error('Please select permissions ', 'Error');
      return false
    }

    let postData = {'email':userForm.value.email, 
                    'first_name':userForm.value.first_name, 
                    'last_name':userForm.value.last_name, 
                    'menus':this.menus,
                    'submenu':this.subMenus,
                    'member_id':this.id
                  }
    this.subAdmin.updateSubAdmin(postData)
    .subscribe(response => {
      this.toastr.success(response.json().message, response.json().message);
      setTimeout(() => {
        this.router.navigate(['/sub-admin-management/sub-admin-users']);
      }, 3000);
    },(error)=>{
      this.btnDisable=false
      if(error.json().message != '')
      this.toastr.error(error.json().message, 'Error');
      else
      this.toastr.error('An error has been occured', 'Error');
    })
  }
  selectMainMenu(){
    var mainMenuRef = this.menus;
    this.selectedMainMenu.forEach((val)=>{
      setTimeout(() => {
        $("#menu_"+val).prop('checked', true);
        mainMenuRef.push(val);

        // document.getElementById('menu_'+val).click()
      }, 1000);
    })
  }

  selectSubMenu(){
    var subMenuRef = this.subMenus;
    this.selectedSubMenu.forEach((val)=>{
      setTimeout(() => {
        $("#"+val).prop('checked', true);
        subMenuRef.push(val);
        // document.getElementById(val).click()
      }, 1000);
    })
  }

  onChangeCategory(event, cat: any){ // Use appropriate model type instead of any
    var element = <HTMLInputElement> document.getElementById('menu_'+cat);
    var isChecked = element.checked;
    var subArr = [];
    var objRef = this.subMenus;
    if(isChecked)
    {
      this.menus.push(cat);
      $("#submenu_"+cat).find("input[type='checkbox']").each(function(){
        $(this).prop('checked', true);
        subArr.push($(this).val());
      });
      
      if(subArr.length>0) 
      {
        subArr.forEach(function(ele){
          objRef.push(ele);
        });
      }
    }
    else
    {
      this.menus = this.menus.filter(x=>x != cat);
      $("#submenu_"+cat).find("input[type='checkbox']").each(function(){
        $(this).prop('checked', false);
        subArr.push($(this).val());
      });
      if(subArr.length>0)
      {
        subArr.forEach(function(ele){
          var index = objRef.indexOf(ele);
          objRef.splice(index, 1);
        });
      }
    }
  }

  onChangeSubmenu(event, parent, cat: any){ // Use appropriate model type instead of any
    var element = <HTMLInputElement> document.getElementById(cat);
    var isChecked = element.checked;
  
    if(isChecked)
    {
      if(!$("#menu_"+parent).is(':checked'))
      {
        $("#menu_"+parent).prop('checked', true);
        this.menus.push(parent);
      }
      this.subMenus.push(cat);
    }
    else
    {
      this.subMenus = this.subMenus.filter(x=>x != cat);
      if($('#submenu_'+parent).find("input[type='checkbox']:checked").length == 0)
      {
        $("#menu_"+parent).prop('checked', false);
        var index = this.menus.indexOf(parent);
        this.menus.splice(index, 1); 
      }
    }
  }

}