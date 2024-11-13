import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, RouterLink,MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;
  allUsers: User[] = [];
  fb = inject(FormBuilder);
  route = inject(Router);
  idUser: Number = 0;
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private userService: UserService) {}

  userForm = this.fb.group({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.allUsers = data.data;
        console.log('Get users deu certo doido', this.allUsers);
      },
      error: (err) => {
        console.log(err);
        console.log('Deu erro, doido', err);
      },
    });
  }

  onSubmit(): void {
    for (let i = 0; this.allUsers.length > i; i++) {
      if (
        this.allUsers[i].name === this.userForm.value.name &&
        this.allUsers[i].password === this.userForm.value.password
      ) {
        localStorage.setItem('angularToken', this.allUsers[i].id!.toString());
        this.route.navigateByUrl('/home');
        this.userForm.reset();
        return;
      }
    }
    this.userForm.reset();
    this.openSnackBar()

  }
  openSnackBar() {
    this._snackBar.open('Dados invalidos!', '-', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass:['snackbar-1']
    });
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
