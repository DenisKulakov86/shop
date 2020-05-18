import { Component, OnInit } from '@angular/core';
import { AdminService } from './service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.title = this.adminService.title;
  }

}
