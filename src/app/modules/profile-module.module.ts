import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule  // Import here
  ],
    exports: [
        CommonModule,
        HttpClientModule  // Export it so that it can be used elsewhere
  ]
})
export class SharedModule {}
