import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Image, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { updateUserInfos } from '../actions';

class AuthScreen extends Component {

	constructor(props) {
		super(props);
		if (props.user.name !== '') { // User saved
			props.navigation.navigate('planning');
		}
	}

	state = {
		name: '',
		phone: '',
	};

	handleSubmit = () => {
		if (this.state.name === '') {
			Alert.alert('Hey Roger !', 'Comment tu t\'appelles ?');
		} else if (this.state.phone === '') {
			Alert.alert('Hey Roger !', 'Tu as bien un numéro de téléphone, histoire qu\'on te contacte ?');
		} else {
			Keyboard.dismiss();
			this.props.updateUserInfos(this.state.name, this.state.phone);
			this.props.navigation.navigate('sos');
		}
	};

	skip = () => {
			Keyboard.dismiss();
			this.props.updateUserInfos(this.state.name, this.state.phone);
			this.props.navigation.navigate('sos');
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={{flex: 1, paddingTop: 60}}>
				<Image 
					style={{flex: .6, height: undefined, width: undefined}} 
					source={require('../assets/logo.png')} 
					resizeMode="contain"
				/>
				<View style={{justifyContent: 'center'}}>
					<View style={{marginBottom: 10}}>
						<FormLabel>Ton nom ?</FormLabel>
						<FormInput
							value={this.state.name}
							placeholder="Roger"
							returnKeyType='done'
							spellcheck={false}
							onChangeText={name => this.setState({ name })}
						/>	
					</View>
					<View style={{marginBottom: 10}}>
						<FormLabel>Ton numéro ?</FormLabel>
						<FormInput
							keyboardType="phone-pad"
							returnKeyType='done'
							placeholder="06 01 02 03 04"
							value={this.state.phone}
							onChangeText={phone => this.setState({ phone })}
						/>	
					</View>
					<Button
						onPress={this.handleSubmit}
						icon={<Icon name="rowing" color="white" size={15}/>}
						title="Ok"
					/>
					<View style={{height: 10}} />
					<TouchableOpacity onPress={this.skip} style={{alignItems: 'center'}}>
						<Text style={{color: 'rgba(14, 122, 254, 1)', textAlign: 'center'}}>Passer cette étape</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, { updateUserInfos })(AuthScreen);