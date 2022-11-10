import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth.service';
import { Login } from '../models/login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  public loginForm;
  public isSubmitted = false;
  public passwordType = 'Password';

  // Helper for closing subscription
  private $unSub = new Subject();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // Closing subscription for API call
  ngOnDestroy(): void {
    this.$unSub.next(false);
    this.$unSub.complete();
  }

  // Reactive Form
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  /**
   * This method takes login credentials and makes API call
   * On success: Routes to homepage and On Failure: Informs User
   */
  onSubmit() {
    console.log(this.loginForm);
    this.isSubmitted = true;
    // Form Is Invalid Don't do any thing
    if (this.loginForm.invalid) return;

    const credentials: Login = {
      username: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    // APi call
    this.authService
      .login(credentials)
      .pipe(takeUntil(this.$unSub))
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          this.authService.isLoggedIn = true;
          sessionStorage.setItem('user', JSON.stringify(res));
        },

        error: () => {
          this.loginForm.controls['password'].setErrors({
            InvalidCredentials: true,
          });
        },
      });
  }

  // Show or hide password
  togglePasswordVisibility() {
    this.passwordType = this.passwordType == 'Text' ? 'Password' : 'Text';
  }
}
