import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const ListCards = ({ namePlayer, cards }) => {
  return (
    <>
      <Typography variant="h6" component="div">
        Player {namePlayer}
      </Typography>
      <Box sx={{ display: 'flex', p: 1.5 }}>
        {cards.map((card) => (
          <Box sx={{ marginRight: '10px' }}>
            <img src={card?.image} alt={card?.image} style={{ width: '100%', height: 'auto' }} />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default ListCards;