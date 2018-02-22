import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Bienvenue sur l\'application des paysans de l\'INSA ! \n->', color: '#C46210' },
  { text: 'Consulte le planning pour ne rater aucun des évènements que nous organisons dans la semaine !\n->', color: 'rgb(220, 151, 91)' },
  { text: 'Et n\'hésite pas à nous envoyer ton SOS, les paysans sont à ton service !', color: '#C46210' },
];

class WelcomeScreen extends Component {
  state = { token: null };

  constructor(props) {    
    super(props);

    if (props.user.name !== '') {
      this.props.navigation.navigate('planning');
    }
  }

  render() {
    return (
      <Slides 
        data={SLIDE_DATA} 
        onComplete={this.onSlidesComplete}
      />
    );
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(WelcomeScreen);