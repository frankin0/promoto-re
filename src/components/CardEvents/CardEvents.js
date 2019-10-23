import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarRounded from '@material-ui/icons/StarRounded';
import Box from '@material-ui/core/Box';


const styles = theme => ({
    card: {
        maxWidth: '100%',
        borderRadius: '20px'
    },
    cardVetrina: {
        maxWidth: 300,
        borderRadius: '20px'
    },
    cardDefault: {
        width: '97%',
        borderRadius: '20px'
    },
    media: {
        height: 500,
    },
    mediaVetrina: {
        height: 400,
    },
    buttonSave:{
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 15,
        color: '#fff'
    },
    infoB:{
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
        background: '-moz-linear-gradient(top, rgba(229,229,229,0) 0%, rgba(127,105,88,0.6) 100%)',
        background: '-webkit-linear-gradient(top, rgba(229,229,229,0) 0%, rgba(127,105,88,0.6) 100%)',
        background: 'linear-gradient(to bottom, rgba(229,229,229,0) 0%,rgba(127,105,88,0.6) 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#00e5e5e5\', endColorstr=\'#807f6958\',GradientType=0 )',
    }
});

class CardEvents extends Component{

    render(){
        const { classes, type, style } = this.props;

        return (
            <Card className={type === "vetrina" ? classes.cardVetrina + " menu-item" : type === "default" ? classes.cardDefault + " menu-item" : classes.card + " menu-item"}>
                <CardActionArea style={{position: 'relative', display: 'block'}}>
                    <CardMedia
                        className={type === "vetrina" ? classes.mediaVetrina : classes.media}
                        style={style}
                        image="https://a0.muscache.com/im/pictures/lombard/MtTemplate-1185780-media_library/original/cd3d663c-ccca-425b-adf0-bd371417c8d9.jpeg?aki_policy=exp_xl"
                        title="Contemplative Reptile"
                    />
                    
                    <StarRounded fontSize="large" className={classes.buttonSave} />

                    <Box className={classes.infoB}>
                        <Typography variant="h6" component="div" style={{fontWeight: 600, color: '#fff'}}>Luxury Hotel</Typography>
                        <Typography variant="caption" component="div" style={{color: '#fff'}}>Salema, Portugal</Typography>
                    </Box>
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles)(CardEvents);