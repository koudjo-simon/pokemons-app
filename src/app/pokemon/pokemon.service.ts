import { Injectable } from "@angular/core";
import { Observable, of, tap, catchError } from "rxjs";

import { Pokemon } from "./pokemon";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PokemonService {
  constructor(private http: HttpClient) {}

  /**
   * Cette Mehode récupère toute la liste de Pokemons
   * @returns Pokemon[]
   */
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  /**
   * Cettre methode permet de récupérer un Pokemon grace à son identifiant
   * @param pokemonId L'id du pokemon à récupérer
   * @returns Pokemon | undefined
   */
  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  /**
   * Methode permettant de faire la mise à jour d'un Pokemon.
   * @param pokemon les Pokemon mise à jour
   * @returns null
   */
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.put("api/pokemons", pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<Pokemon>(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  /**
   * Methode permettant de supprimer un pokemon avec son ID.
   * @param pokemonId l'Id du Pokemon à supprimer
   * @returns null
   */
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  /**
   * Cette permet de faire des recherche de Pokemon en fonction de leur nom
   * @param term Est une critère de recherche
   * @returns une liste de Pokemon dont le nom correspond au critère; Pokemon[]
   */
  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  /**
   * Methode qui gère la réponse du serveur quand tout se passe bien.
   * @param response La reponse du serveur (Pokemon[] | Pokemon | undefined)
   */
  private log(response: any) {
    console.table(response);
  }

  /**
   * Methode privée pour s'occuper des cas d'erreurs
   * @param error l'erreur en question
   * @param errorValue la valeur par défaut à retourner en cas d'erreur
   * @returns errorValue: any
   */
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  /**
   * Cette methode rétourne la liste des type qu'on peut attribuer à un Pokemon
   * @returns string[]
   */
  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insect",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
    ];
  }
}
