import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovalentLayoutModule, 
         CovalentStepsModule,
         CovalentExpansionPanelModule,
         CovalentFileModule,
         CovalentChipsModule,
         CovalentLoadingModule,
         CovalentDialogsModule,
         CovalentDataTableModule,
         CovalentVirtualScrollModule,
         CovalentJsonFormatterModule,
         CovalentPagingModule,
         CovalentNotificationsModule,
         CovalentMessageModule,
         CovalentSearchModule,
         CovalentMediaModule,
         CovalentCommonModule
        } from '@covalent/core';
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
// other imports
@NgModule({
  imports: [
    CommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
    CovalentChipsModule,
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentDataTableModule,
    CovalentVirtualScrollModule,
    CovalentJsonFormatterModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMessageModule,
    CovalentSearchModule,
    CovalentMediaModule,
    CovalentCommonModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule
  ],
  exports: [
    CommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentExpansionPanelModule,
    CovalentFileModule,
    CovalentChipsModule,
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentDataTableModule,
    CovalentVirtualScrollModule,
    CovalentJsonFormatterModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMessageModule,
    CovalentSearchModule,
    CovalentMediaModule,
    CovalentCommonModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule
  ]
})
export class CovalentModule { }
