import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { Utils } from './shared.utils';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule],
    exports: [],
    providers: [SharedService, Utils]
})

export class SharedModule { }