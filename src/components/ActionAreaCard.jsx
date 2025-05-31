import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard(props) {
  return (
    <Card
      sx={{
        width: '100%',
        bgcolor: 'grey.900',
        color: 'white',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 4,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 25px rgba(0,0,0,0.4)',
        },
      }}
    >
      <CardActionArea
        
        sx={{
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: 'none',
            border: 'none',
          },
        }}
        onClick={props.onClick}
      >
        <CardMedia
          component="img"
          height="160"
          image={props.img}
          alt="Slika ni na voljo"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="grey.300">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
