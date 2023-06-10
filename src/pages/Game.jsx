import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import GameContext from "../context/GameContext";
import ListCards from "../components/ListCards";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Game = () => {
	const { namePlayerOne, namePlayerTwo, cardsPlayerOne, cardsPlayerTwo, addCards, round, endGame, playerWin } = useContext(GameContext);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/", { replace: true });
		window.location.reload();
	}


	return (
		<>
		  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				{
					endGame ? (
						<Alert severity={playerWin ? "success" : "error"} sx={{ marginBottom: '10px' }}>
							<AlertTitle>
								{
									playerWin ? (
										<> Player <strong>{playerWin}</strong> is the Winner</>
									) : (
										<>Ups! No Winner</>
									)
								}
							</AlertTitle>
							Click to return <strong>HOME</strong>
							<IconButton onClick={handleClick}>
								<HomeIcon color="primary" />
							</IconButton>
						</Alert>
					) :
						<Button variant="contained" onClick={addCards} sx={{ paddingX: '15%', marginBottom: '5px' }} >Contained {round}/16</Button>
				}
			</div>
			<ListCards namePlayer={namePlayerOne} cards={cardsPlayerOne} />
			<ListCards namePlayer={namePlayerTwo} cards={cardsPlayerTwo} />
		</>
	);
}

export default Game;