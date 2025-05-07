import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from './modules/layout/layout.module';
import { SideNavComponent } from './modules/layout/side-nav/side-nav.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ComponentsModule } from './modules/components/components.module';

@NgModule({
  declarations: [AppComponent, SideNavComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    LayoutModule,
    ComponentsModule

  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true // importante para não sobrescrever outros interceptors
    }
  ]
})
export class AppModule {}
