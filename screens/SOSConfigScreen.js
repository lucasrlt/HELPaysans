import React, { Component } from 'react';
import { headerColor } from '../styles'
import { ButtonGroup, Text, Icon, FormInput, Button } from 'react-native-elements';
import { Alert, View, Platform, DatePickerIOS, ScrollView, Image, KeyboardAvoidingView, Keyboard } from 'react-native';

class SOSConfigScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Mes SOS',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name="phone" size={30} color={tintColor} />
		},
		headerTitle: 'Choisis le lieu',
	});

	state = {
		room: '',
		selectedTurne: 0,
	};

	turneButtons = ['A', 'B', 'C', 'D', 'E']

	constructor(props) {
		super(props);
		
		const { turne } = props.navigation.state.params.sosType.conditions;
		
		if (turne.length > 0) {
			this.turneButtons = turne;
		}
	}

	updateTurne = selectedTurne => {
		this.setState({ selectedTurne });
	}

	updateRoom = room => {
		this.setState({ room });
	}

	onOkPress = () => {
		Keyboard.dismiss();
		if (this.state.room == '') {
			Alert.alert('Hey Roger !', 'On va dans quelle chambre nous ?');
		} else {
			this.props.navigation.push('sosTime', { 
				room: this.state.room, 
				turne: this.turneButtons[this.state.selectedTurne],
				sosType: this.props.navigation.state.params.sosType
			 });
		}
	}

	render() {

		return (
			<KeyboardAvoidingView behavior="padding" style={{flex: 1, paddingTop: 20}}>
				<Image 
					style={{flex: .8, height: undefined, width: undefined}} 
					source={require('../assets/grange.png')} 
					resizeMode="contain"
				/>
				<View style={{marginTop: 20}}>
					<Text h3 style={{textAlign: 'center', color: headerColor}}>Balance ta turne</Text>
					<ButtonGroup
						onPress={this.updateTurne}
						selectedIndex={this.state.selectedTurne}
						buttons={this.turneButtons}
					/>
				</View>
				<View style={{marginTop: 20, marginBottom: 20}}>
					<Text h3 style={{textAlign: 'center', color: headerColor}}>Ton numéro</Text>
					<FormInput 
						returnKeyType='done'
						value={this.state.room}
						onChangeText={this.updateRoom}
						style={{fontSize: 80}}
						keyboardType="numeric"
						textAlign={'center'}
						placeholder="Ex: 517"
						autoCorrect={false}
					/>
				</View>
				<Button title="OK" onPress={this.onOkPress}/>
				<View style={{height: 100}} />
			</KeyboardAvoidingView>
		);
	}
}

export default SOSConfigScreen;