import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  public sidebarnavSubItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(private modalService: NgbModal, private router: Router, private route: ActivatedRoute,
    private userservice: UserService
  ) {}
  // End open close
  ngOnInit() {
    this.userservice.getuserAllstatusByToken(localStorage.getItem('tokenAdmin'))
    .subscribe(response=>{
      if(response.json().user_role == 3)
      {
        let selectedOptions = JSON.parse(response.json().sub_admin_menus)
        let selectedSubOptions = JSON.parse(response.json().sub_admin_submenus)
        console.log('selectedSubOptions',selectedSubOptions)
        // now converr naming convenstion to uppercase
        let newarra = []
        let newsubarra = []
        selectedOptions.forEach(element => {
          element = element
          let re = /\_/gi;
          element = element.replace(re, " ").toUpperCase();
          newarra.push(element)
        });

        selectedSubOptions.forEach(element => {
          element = element
          let re = /\_/gi;
          element = element.replace(re, " ").toUpperCase();
          newsubarra.push(element)
          console.log('newsubarra',newsubarra)

        });
        
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
        

        let newmenuArray = []
        newmenuArray.push( this.sidebarnavItems[0])
        
        newarra.forEach((element,i) => {
          // now filter sidebarnavItems
          let selectMenus =   this.sidebarnavItems.filter(x=>x.title.toLowerCase() == element.toLowerCase());
         
          let newSubArr = [];
          newsubarra.forEach((subelement,j) => {
            // console.log('subelement',subelement)
            let selectSubMenus  =   selectMenus[0].submenu.filter(y=> y.title.toLowerCase() == subelement.toLowerCase());
            if(selectSubMenus.length > 0)
            {
              newSubArr.push(selectSubMenus[0])
            }
          });
          if(newSubArr.length > 0)
          {
            selectMenus[0].submenu = [];
            selectMenus[0].submenu = newSubArr
          }
          
          newmenuArray.push(selectMenus[0])
        });
        
        this.sidebarnavItems = newmenuArray
        // now filter object 
      }
      else
      {
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
      }
    },error=>{
    })
    // this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
