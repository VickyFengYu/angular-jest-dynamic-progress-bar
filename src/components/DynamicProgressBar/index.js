import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Column, UsageBar, Button, DropDown } from '@lux/components';
import { DropDownContainer } from './styles';


class DynamicProgressBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // serviceUrl: 'http://pb-api.herokuapp.com/bars',
      buttons: [],
      bars: [],
      limit: 100,
      barSelect: undefined
    };
  }


  playProgressBar(barIndex, buttonIndex) {
    window['console'].log("barIndex => " + barIndex);
    window['console'].log("buttonIndex => " + buttonIndex);

    const tempBars = this.state.bars;
    const tempButtons = this.state.buttons;
    window['console'].log("tempBars => " + tempBars[barIndex]);
    window['console'].log("tempButtons => " + tempButtons[buttonIndex]);


    tempBars[barIndex] += tempButtons[buttonIndex]


    this.setState({
      bars: tempBars,
    });

  }


  onProgressBarSelection = e => {
    window['console'].log("onProgressBarSelection => " + e.value);

    this.setState({
      barSelect: e.value,
    });
  }


  componentDidMount() {
    this.initializeData();
  }



  initializeData = () => {
    const options = {
      credentials: 'same-origin',
      method: 'GET'
    };


    return fetch(this.props.serviceUrl, options)
      .then(response => response.json())
      .then(body => {
        window['console'].log("bar response => " + JSON.stringify(body));
        //alert(JSON.stringify(body));

        this.setState({
          buttons: body.buttons,
          bars: body.bars,
          limit: body.limit,
        });

        window['console'].log("buttons => " + JSON.stringify(this.state.buttons));

      });
  };


  render() {
    return <div className={this.props.className}>
      {this.props.children}

      <div>
        {this.state.bars.map((value, index) => {
          return <UsageBar key={index} usedValue={value} totalValue={this.state.limit} units="MB" primaryColour="linkblue" postValue="Data" />
        })}
      </div>

      <br></br><br></br>

      <DropDownContainer>
        <DropDown
          placeholder="Please Select One Progress You Want to Play"
          onChange={e => this.onProgressBarSelection(e)}
          items={Object.keys(this.state.bars).map(buttonKey => ({
            // text: this.state.buttons[buttonKey] + '',
            text: buttonKey + '',
            value: buttonKey
          }))}
        />
      </DropDownContainer>

      <br></br><br></br>

      <Grid >
        <Row center="md">
          {Object.keys(this.state.buttons).map(buttonIndex => (
            <Column key={buttonIndex} sm={12} md={2} >
              {/* <Button tabIndex={0}>Primary Button</Button> */}
              <Button tabIndex={0} secondary
                onClick={this.playProgressBar.bind(
                  this,
                  this.state.barSelect,
                  buttonIndex
                )}
              >
                {this.state.buttons[buttonIndex]}
              </Button>
            </Column>))}
        </Row>
      </Grid>

    </div>
  }

}


DynamicProgressBar.defaultProps = {
  className: 'DynamicProgressBar',
  serviceUrl: 'http://pb-api.herokuapp.com/bars',
};


DynamicProgressBar.propTypes = {
  /** Class name */
  className: PropTypes.node,
  /** Children inside component */
  children: PropTypes.node,

  serviceUrl: PropTypes.string,
};

export default DynamicProgressBar;