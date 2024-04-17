import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { SharedModule } from '../../modules/profile-module.module';
import { DataService } from '../../core/profile-serivce.service';
import { DialogComponent } from '../../component/dialog/dialog.component';
import { SearchService } from '../../core/search-service.service';
import { User } from '../../core/profile-serivce.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule , ScrollingModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, SharedModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: User[] = [];
  filteredItems: User[] = [];
  searchKeyword: string = '';

  containerStyle = {};

  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService, private searchService: SearchService, public dialog: MatDialog) {
    this.dataService.users$.subscribe(users => {
      this.items = users;
      this.filterUsers(this.searchKeyword);
    });

    this.searchService.searchKeyword$.subscribe(keyword => {
      this.filterUsers(keyword);
    });
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.containerStyle = { width: '90%' }; // Example, adjust as needed
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.containerStyle = { width: '80%' };
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.containerStyle = { width: '70%' };
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.containerStyle = { width: '60%' };
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.containerStyle = { width: '50%' };
        }
      }
    });
  }

  filterUsers(keyword: string) {
    if (!keyword) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(user => 
        user.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase()) ||
        user.phone.includes(keyword)
      );
    }
  }

  fetchUsers() {
    this.dataService.fetchUsers()
  }

  updateUser(user: User) {
    this.dataService.updateUser(user);
  }

  deleteUser(userId: number) {
    this.dataService.deleteUser(userId);
  }

  addUser() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'Add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
