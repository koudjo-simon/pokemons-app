import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {
  // {..."a".."ab"..."abz"..."ab"..."abc"....}
  searchTerms = new Subject<string>();
  // {...pokemonList(a)...pokemonList(ab)......}
  pokemons$: Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // (ref: 70:50:00)
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"...."abc"......}
      debounceTime(300), // qui permettre d'éliminer des recherches qui n'ont pas un certains nombre de ms après
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(), // permet de supprimer les doublons qui se suivent
      // {......"ab"........"abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {......pokemonList<ab>........pokemonList<abc>......}
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
    console.log(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
