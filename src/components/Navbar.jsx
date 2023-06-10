import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Navbar = () => {
	return (
		<AppBar sx={{ marginBottom: 3}} position="static" style={{ background: '#1B2430' }}>
			<Toolbar>
				<SportsEsportsIcon sx={{ marginRight: 5 }}/>
				<Typography variant="h6" component="div">
					Deck Of Cards Game	
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;