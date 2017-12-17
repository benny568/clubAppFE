import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, 
         MatCardModule, 
         MatNativeDateModule,
         MatToolbarModule,
         MatProgressSpinnerModule,
         MatSnackBarModule,
         MatStepperModule,
         MatProgressBarModule,
         MatGridListModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatStepperModule,
        MatProgressBarModule,
        MatGridListModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatStepperModule,
        MatProgressBarModule,
        MatGridListModule
    ]
})

export class MaterialModule { }