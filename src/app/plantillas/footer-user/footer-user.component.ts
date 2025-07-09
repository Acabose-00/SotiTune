import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { IonTabButton, IonTabBar, IonTabs, IonIcon } from '@ionic/angular/standalone';
import { personCircle, list } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTabBar,
    IonTabs,
    IonTabButton,
    IonIcon
  ]
})
export class FooterUserComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private supabase: SupabaseService
  ) {
    console.log("FOOTER USER");
    addIcons({ personCircle, list });
  }

  ngOnInit() {}

  goToLogin() {
    this.supabase.logout();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], { replaceUrl: true });
  }

  goToPartituras() {
    this.router.navigate(['/partituras'], { replaceUrl: true });
  }
}
