import axios from "axios";

export const GameApi = axios.create({
  baseURL: 'https://deckofcardsapi.com/api/deck'
});