import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResourceModule} from '@ngx-resource/handler-ngx-http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ManageCarDialogComponent, ManageGarageDialogComponent, ConfirmDeletionDialogComponent} from './dialogs/dialogs.component';



import {CarResource, GarageResource} from './app.resource';

@NgModule({
  declarations: [
    AppComponent,
    ManageCarDialogComponent,
    ManageGarageDialogComponent,
    ConfirmDeletionDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ResourceModule.forRoot()
  ],
  providers: [
    CarResource,
    GarageResource
  ],
  entryComponents: [
    ManageCarDialogComponent,
    ManageGarageDialogComponent,
    ConfirmDeletionDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
