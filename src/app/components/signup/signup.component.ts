import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user-service.service';
import { User } from '../../interfaces/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HotelService } from '../../services/hotel-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  faUser = faUser;
  faLock = faLock;
  allUsers: User[] = [];
  fb = inject(FormBuilder);
  router = inject(Router);
  hotelService = inject(HotelService)

  constructor(private userService: UserService) {}

  userForm = this.fb.group({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit() {
    this.userService.getAll().subscribe((data) => {
      this.allUsers = data.data;
      console.log(this.allUsers);
    });
    this.hotelService.getAllHotel().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })
  }
  onSubmit(): void {
    this.create();
  }
  verificarUserExistente() {
    for (let i = 0; this.allUsers.length > i; i++) {
      if (
        this.userForm.value.name === this.allUsers[i].name ||
        this.userForm.value.email === this.allUsers[i].email
      ) {
        alert('Username ou email já cadastrados');
        return true;
      }
    }
    return false;
  }

  create() {
    if (!this.verificarUserExistente()) {
      this.userService
        .createUser({
          name: this.userForm.value.name!,
          email: this.userForm.value.email!,
          password: this.userForm.value.password!,
        })
        .subscribe({
          next: (data) => {
            console.log('User create', data);
            this.router.navigateByUrl('/login');
          },
          error: (err) => console.log('Erro ao criar. ', err),
        });
    }
  }
}
