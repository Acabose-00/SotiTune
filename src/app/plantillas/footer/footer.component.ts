import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { IonTabButton, IonTabBar, IonTabs, IonIcon } from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/services/supabase.service';
import { personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    CommonModule,
    IonTabBar,
    IonTabs,
    IonTabButton,
    IonIcon
  ],
  standalone: true,
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private supabase: SupabaseService) {
    console.log("FOOTER");
    addIcons({ personCircle });
  }

  ngOnInit() {}

  goToLogin() {
    this.router.navigate(['/home']);
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos']);
  }

}
