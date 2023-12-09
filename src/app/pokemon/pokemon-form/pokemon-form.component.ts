import { Component, Input, OnInit } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import { Pokemon } from "../pokemon";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemon-form",
  templateUrl: "./pokemon-form.component.html",
  styleUrls: ["./pokemon-form.component.css"],
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    // pokemonTypeList
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes("add");
  }

  /**
   * Cette methode vérifie si un pokemon possède déjà un type ou non
   *
   */
  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  /**
   * Methode permettant de sélectionner ou déselectionner un elément
   */
  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    /*
    Si le pokemon n'a qu'un seul type, il faut empêcher l'utilisateur de décocher ce type
    car au moins, un pokemon possède un type.
    */
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    /*
    Le nombre de type du pokemon est supérieur à 2 c-à-d 3, il faut empêcher 
    l'utilisateur de cocher un autre type, mais le permettre de décocher un type déjà
    cocher.
    */
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService
        .addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) =>
          this.router.navigate(["/pokemon", pokemon.id])
        );
    } else {
      this.pokemonService
        .updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(["/pokemon", this.pokemon.id]));
    }
  }
}
