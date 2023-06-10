import { createContext, useEffect, useState } from 'react';
import { GameApi } from '../api/GameApi';
import { useNavigate } from "react-router-dom";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [namePlayerOne, setNamePlayerOne] = useState("");
  const [namePlayerTwo, setNamePlayerTwo] = useState("");
  const [cardsPlayerOne, setCardsPlayerOne] = useState([]);
  const [cardsPlayerTwo, setCardsPlayerTwo] = useState([]);
  const [round, setRound] = useState(1);
  const [gameId, setGameId] = useState("");
  const [endGame, setEndGame] = useState(false);
  const [playerWin, setPlayerWin] = useState("");

  const startGame = async () => {
    const { data } = await GameApi.get(`/new/shuffle/?deck_count=2`);
    setGameId(data.deck_id);
  };

  const getCards = async (cant) => {
    const { data } = await GameApi.get(`/${gameId}/draw/?count=${cant}`);
    return data.cards;
  };

  useEffect(() => {
    const gameInicialization = async () => {
      if (gameId) { 
        const initialCards = await getCards(20);
        setCardsPlayerOne(initialCards.slice(0, 10));
        setCardsPlayerTwo(initialCards.slice(10, 20));
      }
    };
    gameInicialization();
  }, [gameId]); 

  useEffect(() => {
    if(round == 40) setEndGame(true);
  }, [round]);

  const addCards = async () => {
    const cards = await getCards(2);
    setRound(round + 1);
    const validationPlayerOne = cardValidation(cardsPlayerOne, cards[0]);
    const validationPlayerTwo = cardValidation(cardsPlayerTwo, cards[1]);

    if (validationPlayerOne){
      let newCardsPlayerOne = [...cardsPlayerOne, cards[0]];
      setCardsPlayerOne(newCardsPlayerOne);
      deckCardsValidator(newCardsPlayerOne, cards[0], namePlayerOne);
    }

    if (validationPlayerTwo){
      let newCardsPlayerTwo = [...cardsPlayerTwo, cards[1]];
      setCardsPlayerTwo(newCardsPlayerTwo);
      deckCardsValidator(newCardsPlayerTwo, cards[1], namePlayerTwo);
    }
  };

  const cardValidation = (cards, newCard) => {
    const sameValue = cards.find((mapCard) => mapCard.value === newCard.value && mapCard.suit !== newCard.suit);
    const sameCard = cards.some((mapCard) => mapCard.value === newCard.value && mapCard.suit === newCard.suit);
    return sameValue && !sameCard;
  };

  const deckCardsValidator = (cards, newCard, playerName) => {
    const cardsMap = {};
    cards.forEach(card => {
      if (!cardsMap[card.value]) cardsMap[card.value] = []
      cardsMap[card.value].push(card);
    });
    let [quarters, quartesGroups] = groupsValidator(cardsMap,4); // Quarters Quantity
    let [ternas, ternasGroups] = groupsValidator(cardsMap,3); // Ternas Quantity
    let [pairs, pairsGroups] = groupsValidator(cardsMap,2); // Pairs Quantity
    let [individual, individualGroups] = groupsValidator(cardsMap,1); // Individual Quantity
    analyzer(cards, newCard, quarters, ternas, individual, pairsGroups, individualGroups, playerName);
    if(ternas == 2 && quarters == 1){
      setPlayerWin(playerName) 
      setEndGame(true)
    }
  };

  const groupsValidator = (cardsMap, CardsNumber) => {
    let groupsNumber = 0;
    let groupValue = [];
    Object.keys(cardsMap).filter((value) => cardsMap[value].length === CardsNumber)
    .forEach((value) => {
      const suits = cardsMap[value].map((card) => card.suit);
      if (suits.every((suit, index, array) => suit !== array[index - 1])) {
        groupsNumber += 1;
        groupValue.push(value);
      }
    });
    return [groupsNumber, groupValue];
  };

  const staircase = ( ) => {
    
  };

  const analyzer = (playerCards, newCard, quarters, ternas, individual,  pairsGroups, individualGroups, playerName) => {
    console.log('############################################################  ->>', playerName);
    let groupType;
    const sameValue = playerCards.filter((mapCard) => mapCard.value === newCard.value && mapCard.suit !== newCard.suit);
    console.log('*********************', newCard);
    console.log('*********************', sameValue);
    console.log('.....................', sameValue.length);
    console.log('===============', quarters, ternas, individual, individualGroups)
    switch (sameValue.length){
      case 3:
        if(quarters < 2) groupType = 'Quarter'; break;
      case 2:
        if ((ternas <= 1) || (ternas >= 2 && quarters == 0)) groupType = 'Terna'; break;
      case 1:
        const individualsValue = individualGroups.filter((discardCard) => newCard.value != discardCard);
        if(individualsValue.length !== 0) groupType = 'Pair'; break;
    };
    console.log('---------------------', groupType);
    if(groupType){
      let discardGroup = individualGroups.filter((discardCard) => newCard.value != discardCard);
      if((groupType == 'Terna' || groupType == 'Quarter') && discardGroup.length == 0 ){
        const pairsInclude = pairsGroups.filter((pairCard) => pairCard != newCard.value);
        discardGroup = discardGroup.concat(pairsInclude);
      };
      let indexCardToDiscard = playerCards.findIndex((playerCard) => playerCard.value == discardGroup[0]);
      playerCards[indexCardToDiscard] = newCard;
      playerCards.pop();
      playerCards.sort((a, b) => {
        const cardA = a.code.toLowerCase();
        const cardB = b.code.toLowerCase();
      
        if (cardA < cardB) return -1; // a viene antes que b
        if (cardA > cardB) return 1; // a viene después de b
        return 0; // a y b son iguales
      });
      playerName == namePlayerOne ? setCardsPlayerOne(playerCards) : setCardsPlayerTwo(playerCards);
      console.log('###################', playerCards);
      console.log('iiiiiiiiiiiiiiiiiii', indexCardToDiscard);
      console.log('jjjjjjjjjjjjjjjjjjj', discardGroup[0]);
      console.log('lllllllllllllllllll', discardGroup);
    }else{
      console.log("No sirve"); 
      playerCards.pop();
      playerName == namePlayerOne ? setCardsPlayerOne(playerCards) : setCardsPlayerTwo(playerCards);
      console.log('-----------', playerCards);
    };
  };

  return (
    <GameContext.Provider
      value={{
        namePlayerOne,
        namePlayerTwo,
        setNamePlayerOne,
        setNamePlayerTwo,
        startGame,
        cardsPlayerOne,
        cardsPlayerTwo,
        addCards,
        round,
        endGame,
        playerWin
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export { GameProvider };
export default GameContext;