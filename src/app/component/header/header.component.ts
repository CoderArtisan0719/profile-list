import { Component } from '@angular/core';
import { SearchService } from '../../core/search-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule, // Import Angular Material Toolbar Module
    FormsModule,
    MatIconModule,
    MatToolbarRow,
    MatToolbar,
    MatCardModule
    // Import FormsModule if you're using [(ngModel)]
  ]
})
export class HeaderComponent {
  searchKeyword: string = '';

  constructor(private searchService: SearchService) {}

  handleSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchService.updateSearchKeyword(value);
  }
}
