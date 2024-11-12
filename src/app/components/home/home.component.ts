import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch,faUser,faStar } from '@fortawesome/free-solid-svg-icons';
import { HotelService } from '../../services/hotel-service';
import { Hotel } from '../../interfaces/hotel';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule,RouterLink,ReactiveFormsModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  faSearch = faSearch
  faUser = faUser
  faStar = faStar
  allHotel:Hotel[] = []
  hotelService = inject(HotelService)
  router= inject(Router)
  form = inject(FormBuilder)
  isLoadign = false
  hoteisFiltrados: Hotel[] = []
  filtro = new FormControl('')

  ngOnInit(){

    this.getAllHotel()
  }
  filter(){
    if(this.filtro.value === '' || null){
      this.hoteisFiltrados = this.allHotel
    }

    this.filtro.valueChanges.subscribe(valor =>{
      if(valor === "" || null){
        this.hoteisFiltrados = this.allHotel
      }else{
        this.hoteisFiltrados = []
        for(let i = 0;this.allHotel.length > i;i++){
          if(this.allHotel[i].local.toLocaleLowerCase().includes(this.filtro.value!.toLowerCase())){
            this.hoteisFiltrados.push(this.allHotel[i])
          }
        }
 
      }
    })
  }
  getAllHotel(){
    this.isLoadign = true
    this.hotelService.getAllHotel().subscribe({
      next:(data)=>{this.allHotel = data.data
        console.log(this.allHotel)
        this.filter()

      },error:(err) => console.log(err),
      complete: () =>{
        this.isLoadign = false
      }
    })
  }
  openCard(hotelId: number){
    // const hotelString = hotelId.toString()
    this.router.navigate(['/reserva',hotelId])
  }
  getStarsArray(stars: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < stars);
  }
  
}
