import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-role',
  templateUrl: './signup-role.component.html',
  styleUrls: ['./signup-role.component.css']
})
export class SignupRoleComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setupRadioButtons();
  }

  setupRadioButtons(): void {
    // Get all radio buttons
    const radios = Array.from(document.getElementsByName('hs-radio-in-form') as NodeListOf<HTMLInputElement>);

    // Get the "Create Account" button
    const button = document.getElementById('create-account') as HTMLButtonElement;

    // Add a change event listener to each radio button
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        // Enable the "Create Account" button when a radio button is selected
        button.disabled = false;

        // Get the selected role
        const nextSibling = radio.nextElementSibling;
        const role = nextSibling ? nextSibling.textContent : '';
        console.log('Selected role:', role);
      });
    });
  }

  createAccount(): void {
    // Get all radio buttons
    const radios = Array.from(document.getElementsByName('hs-radio-in-form') as NodeListOf<HTMLInputElement>);

    // Find the selected radio button
    const selectedRadio = radios.find(radio => radio.checked);

    // Navigate to the appropriate route based on the selected radio button
    if (selectedRadio && selectedRadio.id === 'hs-radio-checked-in-form') {
      this.router.navigate(['/signup-f']);
    } else {
      this.router.navigate(['/signup']);
    }
  }
}



