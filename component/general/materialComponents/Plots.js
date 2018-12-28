import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import PSD from '../../../static/PSD.png';
import Raster from '../../../static/Raster.png';
import Dipole from '../../../static/Dipole.png';
import Traces from '../../../static/Traces.png';
import Spectrogram from '../../../static/Spectrogram.png';
import IconButton from '../../../../../js/components/controls/iconButton/IconButton';

const styles = theme => ({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'row'
  },
  card: {
    borderRadius: "40px",
    width: '160px',
    height: '200px',
    flex: 1,
    margin: '10px',
    opacity: 0.85
  },
  img: {
    display: 'block',
    margin: 'auto',
    width: '100px',
    borderRadius: '20px'
  },
  cardText: {
    textAlign: 'center',
  },
  cardTitle: {
    marginTop: '10px'
  },
  cardAction: {
    height: "100%"
  }
})

const plotList = [
  {
    title: "Dipole",
    subtitle: "Dipole plot",
  },
  {
    title: "Traces",
    subtitle: "Traces plot"
  },
  {
    title: "PSD",
    subtitle: "Power spectral density plot"
  },
  {
    title: "Raster",
    subtitle: "Raster plot"
  },
  {
    title: "Spectrogram",
    subtitle: "Spectrogram plot"
  },
]

class Plots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  };
  render() {
    const { open } = this.state;
    const { iconStyle, classes } = this.props;

    const images = [
      Dipole,
      Traces,
      PSD,
      Raster,
      Spectrogram
    ]
    return (
      <div>
        <IconButton 
          style={iconStyle}
          icon="fa-area-chart"
          onClick={() => this.setState({ open: true })}
        />

        <Modal
          open={open}
          disableAutoFocus
          onClose={() => this.setState({ open: false })}
        >
          <div className={classes.container}>
            {plotList.map(({ title, subtitle }, index) => (
              <Card raised className={classes.card} key={title}>
                <CardActionArea className={classes.cardAction}>
                  <CardContent className={classes.cardText}>
                    <img className={classes.img} src={images[index]} />
                    <Typography className={classes.cardTitle} variant="h5">
                      {title}
                    </Typography>
                    <Typography component="p">
                      {subtitle}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </Modal>
      </div>
      
    )
  }
}

export default withStyles(styles)(Plots);