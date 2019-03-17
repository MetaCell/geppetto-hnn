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
import MaterialIconButton from "./IconButtonWithTooltip";

const styles = theme => ({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'row',
    width:'100%'
  },
  card: {
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
  },
  cardText: { textAlign: 'center', },
  cardTitle: { marginTop: '10px' },
  cardAction: { height: "100%" },
  button: {
    transition: "background-color 150ms cubic-bezier(0.2, 0, 0.1, 1) 0ms",
    padding: "8px",
    top: "0"
  }
});


class Plots extends Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
  }
  render () {
    const { open } = this.state;
    const { classes } = this.props;

    const images = [
      Dipole,
      Traces,
      PSD,
      Raster,
      Spectrogram
    ];

    return (
      <span>
        <MaterialIconButton
          disabled={false}
          onClick={() => this.setState({ open: true })}
          className={" fa fa-area-chart " + `${classes.button}`}
          tooltip={"See available plots"}
        />

        <Modal
          open={open}
          disableAutoFocus
          onClose={() => this.setState({ open: false })}
        >
          <div className={classes.container}>
            {this.props.plots.map(({ title, subtitle, handler }, index) => (
              <Card raised className={classes.card} key={title}>
                <CardActionArea
                  className={classes.cardAction}
                  onClick={() => {
                    handler();
                    this.setState({ open:false })
                  }}
                >
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
      </span>
      
    )
  }
}

export default withStyles(styles)(Plots);