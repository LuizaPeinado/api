import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { HotelService } from '../../services/hotel-service';
import { Hotel } from '../../interfaces/hotel';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservaHotel } from '../../services/reserva.service';
@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, ReactiveFormsModule],
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

  form = this.fb.group({
    date: [],
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
    id = Number(id)
    for (let i = 0; this.allHotel.length > i; i++) {
      console.log(this.allHotel[i].id, id)
      if(this.allHotel[i].id === id){
        console.log("AChouu")
        this.hotelSelected.push(this.allHotel[i])
      }else{
        console.log("not found")
      }
    }
  }

  getAllHotel() {
    this.hotelService.getAllHotel().subscribe((response) => {
      this.allHotel = response.data;
      console.log(this.allHotel[0])
      this.getId();
    });
  }
  reservar() {
    const id = Number(this.idUser)
    const idHotel = Number(this.hotelId)
    this.reservaService
      .createReserva({
        idUser:id,
        idHotel:idHotel,
        date: this.form.value.date!,
      })
      .subscribe({
        next: (data) => {
          alert('Reserva Realizada');
          this.form.reset();
          console.log('Reserva criada!', data);
        },

        error: (err) => console.log(err),
      });
  }
}
