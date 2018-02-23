import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Image, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { updateUserInfos } from '../actions';


class SettingsScreen extends Component {
	static navigationOptions = {
		title: 'Options',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name="settings" size={30} color={tintColor} />
		}
	};

	constructor(props) {
		super(props);
		this.state = { name: props.user.name, phone: props.user.phone };
	}
	
	componentWillReceiveProps(props) {
		this.setState({ name: props.user.name, phone: props.user.phone });
	}

	handleSubmit = () => {
		Keyboard.dismiss();
		if (this.state.name === '') {
			Alert.alert('Hey Roger !', 'Comment tu t\'appelles ?');
		} else if (this.state.phone === '') {
			Alert.alert('Hey Roger !', 'Tu as bien un numéro de téléphone, histoire qu\'on te contacte ?');
		} else {
			Alert.alert('C\'est ok !', 'On accepte ta nouvelle identité.');
			Keyboard.dismiss();
			this.props.updateUserInfos(this.state.name, this.state.phone);
		}
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={{flex: 1, paddingTop: 20}}>
				<Image 
					style={{flex: .6, height: undefined, width: undefined}} 
					source={require('../assets/logo.png')} 
					resizeMode="contain"
				/>
				<View style={{justifyContent: 'center'}}>
					<View style={{marginBottom: 10}}>
						<FormLabel>Ton nom</FormLabel>
						<FormInput
							placeholder="Roger"
							returnKeyType='done'
							value={this.state.name}
							spellcheck={false}
							onChangeText={name => this.setState({ name })}
						/>	
					</View>
					<View style={{marginBottom: 10}}>
						<FormLabel>Ton numéro</FormLabel>
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
						title="Modifier"
					/>
				</View>
				<View style={{height: 100}} />
			</KeyboardAvoidingView>

		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default connect(mapStateToProps, { updateUserInfos })(SettingsScreen);