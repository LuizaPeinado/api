import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HotelService } from '../../services/hotel-service';
import { Hotel } from '../../interfaces/hotel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservaHotel } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-content-page',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent implements OnInit {
  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  router = inject(ActivatedRoute);
  hotelService = inject(HotelService);
  allHotel: Hotel[] = [];
  hotelId!: string;
  hotelSelected: Hotel[] = [];
  fb = inject(FormBuilder);
  reservaService = inject(ReservaHotel);
  idUser = localStorage.getItem('angularToken')!;
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  form = this.fb.group({
    date: '',
  });

  ngOnInit() {
    this.getAllHotel();
  }
  getId() {
    this.router.queryParams.subscribe((params) => {
      this.hotelId = params['id'];
      this.foundHotel(params['id']);
    });
  }
  foundHotel(id: any) {
    id = Number(id);
    for (let i = 0; this.allHotel.length > i; i++) {
      if (this.allHotel[i].id === id) {
        this.hotelSelected.push(this.allHotel[i]);
      }
    }
  }

  getAllHotel() {
    this.hotelService.getAllHotel().subscribe((response) => {
      this.allHotel = response.data;
      this.getId();
    });
  }
  reservar() {
    const id = Number(this.idUser);
    const idHotel = Number(this.hotelId);
    const dateValue:any = this.form.value.date!

    // Verifica se `dateValue` é uma instância de Date
    const dataFormatada =
      dateValue instanceof Date
        ? dateValue.toISOString().split('T')[0] // Formata para "yyyy-MM-dd"
        : dateValue.split('T')[0]; // Caso já seja string, apenas usa o split

    this.reservaService
      .createReserva({
        idUser: id,
        idHotel: idHotel,
        date: dataFormatada,
      })
      .subscribe({
        next: (data) => {
          this.openSnackBar()
          this.form.reset();
        },

        error: (err) => console.log(err),
      });
  }
  getStarsArray(stars: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < stars);
  }
  openSnackBar() {
    this._snackBar.open('Reserva realizada', '-', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass:['snackbar-1']
    });
  }
}
