import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonButtons,
         IonIcon, IonMenuButton, IonLabel, IonSegment, IonSegmentButton, IonTab, IonTabBar,
         IonTabs, IonTabButton } from '@ionic/angular/standalone';
import { create, ellipsisHorizontal, ellipsisVertical, helpCircle, personCircle, search,
         star, speedometer, mic, list, musicalNoteOutline, flashOutline, trendingUpOutline,
         happyOutline, heartOutline, keyOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-footer-user',
  templateUrl: './footer-user.component.html',
  styleUrls: ['./footer-user.component.scss'],
  imports: [IonTabButton, IonTab, IonContent, IonHeader, IonTitle,
                      IonToolbar, IonFooter, CommonModule, FormsModule,
                      IonButton, IonButton, IonButtons, IonIcon, IonMenuButton,
                      IonLabel, IonSegment, IonSegmentButton, IonTabBar, IonTabs],
  standalone: true,
})
export class FooterUserComponent  implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private supabase: SupabaseService) {
      console.log("FOOTER USER")
      addIcons({
        musicalNoteOutline,flashOutline,trendingUpOutline,happyOutline,
        heartOutline,keyOutline,personCircle,list,create,ellipsisHorizontal,
        ellipsisVertical,helpCircle,search,star,speedometer,mic});
      }

  ngOnInit() {}

  goToLogin() {
    this.supabase.logout();
    this.router.navigate(['/home'], {replaceUrl:true});
  }

  goToInstruments() {
    this.router.navigate(['/menu-instrumentos'], {replaceUrl:true});
  }
}
