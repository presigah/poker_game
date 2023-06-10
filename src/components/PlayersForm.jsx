import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import GameContext from '../context/GameContext';

const PlayersForm = () => {
	const navigate = useNavigate(); 
	const {namePlayerOne, setNamePlayerOne, namePlayerTwo, setNamePlayerTwo, startGame} = useContext(GameContext);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange1 = (event) => {
		setNamePlayerOne(event.target.value);
  };

  const handleInputChange2 = (event) => {
		setNamePlayerTwo(event.target.value);
  };
	
	useEffect(() => {
    setIsButtonDisabled(namePlayerOne.length < 4 || namePlayerTwo.length < 4);
  }, [namePlayerOne, namePlayerTwo]);

	const handleClick  = ({ target }) =>{
		if (namePlayerOne === namePlayerTwo){
			alert("Names must be different!");
		}else{
			startGame();
			navigate("/game");
		}
	};

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
					<SportsEsportsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField id="player-one" label="Player One" variant="standard" onChange={handleInputChange1}/>
					<Box sx={{ marginRight: 20 }} />
					<SportsEsportsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
					<TextField id="player-two" label="Player Two" variant="standard" onChange={handleInputChange2} />
				</Box>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Button sx={{ marginTop: 5}} variant="contained" onClick={handleClick} disabled={isButtonDisabled}>Login</Button>
			</div>
		</div>
	);
};

export default PlayersForm;