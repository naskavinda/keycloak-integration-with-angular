import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userDetails: KeycloakProfile;

  constructor(protected keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    try {
      this.keycloakService
        .getKeycloakInstance()
        .loadUserProfile()
        .success(profile => this.userDetails = profile);
    } catch (e) {
      console.log('Failed to load user details', e);
    }
  }

  public logOut(): void {
    this.keycloakService
      .logout('http://localhost:4200/home')
      .then(value => console.log(value));
  }
}
