import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminUserModel } from '../../shared/models/admin-user.model';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SubAdminService } from '../../services/sub-admin.service';

import * as $ from 'jquery'
// import { type } from 'os';

@Component({
  selector: 'app-sub-admin-new',
  templateUrl: './sub-admin-new.component.html',
  styleUrls: ['./sub-admin-new.component.css']
})
export class SubAdminNewComponent implements OnInit,AfterViewInit {
  adminUserModel:AdminUserModel= new AdminUserModel;
  menus: any[] = [];
  subMenus: any = [];
  btnDisable:boolean=false
  selectedParents:any

  selectedOptions:any[]=[]

  categories:any[]= []
  parentmenu:any[]= []
  childmenu:any[]= []
  constructor(
    private toastr: ToastrService,
    private router:Router,
    private subAdmin: SubAdminService)
  {
    this.subAdmin.getAllMenus().subscribe(result => {
        this.categories = result.json().data;
        this.parentmenu = result.json().data.filter(x => x.parent == 0);
        for(var i in this.parentmenu)
        {
          this.childmenu[this.parentmenu[i].access_id] = this.categories.filter(x => x.parent == this.parentmenu[i].access_id);
        }
      },(error)=> {
    })
  }
  ngOnInit() {
    this.selectedParents = 1
    this.selectCat()
  }

  ngAfterViewInit(){
  }

  CreateSubAdminUser(userForm: NgForm){
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
                   'submenu':this.subMenus}
    
    this.subAdmin.addSubAdmin(postData)
    .subscribe(response => {
      this.toastr.success(response.json().message, response.json().message);
      setTimeout(() => {
        this.router.navigate(['/sub-admin-management/sub-admin-users']);
      }, 1000);
    },(error)=>{
      this.btnDisable=false
      if(error.json().message != '')
        this.toastr.error(error.json().message, 'Error');
      else
        this.toastr.error('An error has been occured', 'Error');
    })
  }

  selectCat(){
    var mainMenuRef = this.menus;
    this.selectedOptions.forEach((val)=>{
      setTimeout(() => {
        $("#menu_"+val).prop('checked', true);
        mainMenuRef.push(val);
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
        // $("#menu_"+parent).click()
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