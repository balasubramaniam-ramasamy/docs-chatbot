import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this for ngModel
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
    ],
    imports: [
        FormsModule, // Import FormsModule here
        CommonModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
