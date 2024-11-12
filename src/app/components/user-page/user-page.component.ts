import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faArrowLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { ReservaHotel } from '../../services/reserva.service';
import { Reserva } from '../../interfaces/reserva';
import { HotelService } from '../../services/hotel-service';
import { Hotel } from '../../interfaces/hotel';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user-service.service';
@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  faRightFromBracket = faRightFromBracket;
  router = inject(Router);
  reservaService = inject(ReservaHotel);
  hotelService = inject(HotelService);
  userService = inject(UserService);
  allReservas: Reserva[] = [];
  userHoteis: Hotel[] = [];
  userReservas: any[] = [];
  allHotel: Hotel[] = [];
  allUsers: User[] = [];
  reservasTratado:any =[]
  idUser = localStorage.getItem('angularToken');
  userName: string = '';
   today = new Date()
   formattedDate = `${this.today.getFullYear()}-${String(this.today.getMonth() + 1).padStart(2, '0')}-${String(this.today.getDate()).padStart(2, '0')}`;

  logout() {
    localStorage.removeItem('angularToken');
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    // localStorage.clear()
    this.getAllReservas();
  }
  getAllReservas() {
    this.reservaService.getAllReserva().subscribe({
      next: (data) => {
        this.allReservas = data.data;
        for(let i = 0;this.allReservas.length > i; i++){
          this.reservasTratado = [...this.allReservas]
          const date = new Date(this.allReservas[i].date);
          const [year, month, day] = this.allReservas[i].date.split('-').map(Number); // Extrai ano, mês e dia
          // Converte a string para Date
          const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          this.reservasTratado[i].date = formattedDate
        }
      },
      error: (err) => console.log(err),
    });
    this.getAllHotel();
    this.getAllUsers();

  }
  getAllHotel() {
    this.hotelService.getAllHotel().subscribe({
      next: (data) => {
        this.allHotel = data.data;
        this.userReserva();
      },
      error: (err) => console.log(err),
    });
  }
  userReserva() {
    this.userHoteis = [];
    this.userReservas = [];
    const id = Number(this.idUser);
    for (let i = 0; this.allReservas.length > i; i++) {
      if (this.allReservas[i].idUser === id) {
        this.userReservas.push(this.allReservas[i]);
        for (let j = 0; this.allHotel.length > j; j++) {
          if (this.allHotel[j].id === this.allReservas[i].idHotel) {
            this.userHoteis.push(this.allHotel[j]);
          } else {
          }
        }
      }
    }
    for(let i = 0;this.userReservas.length > i; i++){
      this.userReservas[i] = {"id": this.userReservas[i].id,"idUser":this.userReservas[i].idUser,"idHotel":this.userReservas[i].idHotel,"url":this.userHoteis[i].url,"local":this.userHoteis[i].local,"date":this.userReservas[i].date}
    }
  }
  getUsername() {
    const id = Number(this.idUser);
    console.log(localStorage.getItem("angularToken"))
    for (let i = 0; this.allUsers.length > i; i++) {
      if (this.allUsers[i].id === id) {
        console.log('Achooo');
        this.userName = this.allUsers[i].name;
      } else {
      }
    }
  }
  getAllUsers() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.allUsers = data.data;
        this.getUsername();
      },
      error: (err) => console.log(err),
    });
  }
}
