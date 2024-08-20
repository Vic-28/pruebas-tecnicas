import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/models';
import booksData from '../../../../src/app/enviroments/books.json';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  bookList: Book[] = booksData.library.map(item => item.book); // Lista de los libros del .JSON
  genres: string[] = this.listGenres(); // Géneros disponibles
  booksAvailables: Book[] = []; // Libros seleccionados por el usuario
  selectedGenre: string = 'Todos'; // Género seleccionado por defecto
  minPages: number = 0; // Valor mínimo del rango de páginas
  maxPages: number = Math.max(...this.bookList.map(book => book.pages)); // Valor máximo basado en el libro con más páginas

  showAvailableBooks: boolean = true; // Mostrar libros disponibles por defecto
  showSelectedBooks: boolean = false; // Ocultar libros seleccionados por defecto

  constructor() {
    console.log('Lista de libros: ' + this.bookList.length);
    console.log('Libros disponibles: ' + this.getBooksAvailables());
  }

  // Función para generar la lista de géneros del select
  listGenres(): string[] {
    let genres: string[] = ['Todos'];
    this.bookList.forEach(book => {
      if (!genres.includes(book.genre)) {
        genres.push(book.genre);
      }
    });
    return genres;
  }

  // Función para filtrar los libros según el género seleccionado y las páginas
  filterBooks(): Book[] {
    return this.bookList.filter(book => {
      const isGenreMatch = this.selectedGenre === 'Todos' || book.genre === this.selectedGenre;
      const isPageMatch = book.pages >= this.minPages && book.pages <= this.maxPages;
      return isGenreMatch && isPageMatch;
    });
  }

  // Getter de los libros disponibles
  getBooksAvailables() {
    return this.filterBooks().length - this.booksAvailables.length;
  }

  // Función para añadir libros a la lista de seleccionados
  addBook(book: Book) {
    if (!this.booksAvailables.includes(book)) {
      this.booksAvailables.push(book);
      console.log("Has añadido a la lista de libros: " + book.title);
    } else {
      console.log("No puedes volver a añadir: " + book.title);
    }
  }

  // Función para retirar libros de la lista de seleccionados
  removeBook(book: Book) {
    const index = this.booksAvailables.indexOf(book);
    if (index !== -1) {
      this.booksAvailables.splice(index, 1);
      console.log("Has eliminado de la lista de libros: " + book.title);
    } else {
      console.log("El libro no está en la lista de libros disponibles: " + book.title);
    }
  }

  // Función que llama cuando se cambia el rango de páginas
  onRangeChange(minPages: number) {
    this.minPages = minPages;
  }

  // Función para cambiar el estilo de los libros seleccionados
  isBookSelected(book: Book): boolean {
    return this.booksAvailables.includes(book);
  }

  // Función para alternar la vista de la lista de libros disponibles
  showBookList() {
    this.showAvailableBooks = true;
    this.showSelectedBooks = false;
  }

  // Función para alternar la vista de la lista de libros seleccionados
  showBooksselecteds() {
    this.showAvailableBooks = false;
    this.showSelectedBooks = true;
  }
}
