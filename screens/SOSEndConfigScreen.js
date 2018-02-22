import React, { Component } from 'react';
import { ButtonGroup, Text, Icon, FormInput, Button } from 'react-native-elements';
import { Alert, View, Platform, DatePickerIOS, ScrollView, Image, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { addSos } from '../actions';
import NamesList from '../components/NamesList';

class SOSEndConfigScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Mes SOS',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name="phone" size={30} color={tintColor} />
		},
		headerTitle: 'Finis ton SOS !',
	});

	state = {
		note: '',
		selectedName: {},
	};

	onNamePress = selectedName => {
		this.setState({ selectedName });
	}

	onNameSwitch = switchedNames => {
		this.switchedNames = switchedNames;
	}

	updateNote = note => {
		this.setState({ note });
	}

	onOkPress = () => {
		Keyboard.dismiss();
		const { params } = this.props.navigation.state;

		const sos = {
			...params,
			user: this.props.user,
			note: this.state.note,
			selectedName: this.state.selectedName,
			who: this.switchedNames,
		};

		this.props.addSos(sos);
		this.props.navigation.popToTop();
	}

	render() {
		const { numOfPeople } = this.props.navigation.state.params.type.conditions;
		return (
			<KeyboardAvoidingView behavior="padding" style={{flex: 1, paddingTop: 20}}>
				<View style={{flex: 1, paddingBottom: 5}}>
					<Text h3 style={{textAlign: 'center'}}>Qui doit faire ce SOS ?</Text>
					<Text h5 style={{textAlign: 'center', marginBottom: 10}}>{numOfPeople} {numOfPeople > 1 ? 'personnes' : 'personne'} (optionnel)</Text>
					<NamesList onSwitch={this.onNameSwitch} onItemPress={this.onNamePress} sosType={this.props.navigation.state.params.type} />
				</View>
				<View style={{marginTop: 5, marginBottom: 20}}>
					<Text h3 style={{textAlign: 'center'}}>Un commentaire ?</Text>
					<FormInput 
						maxHeight={100}
						returnKeyType='done'
						inputStyle={{paddingRight: 30}}
						value={this.state.note}
						onChangeText={this.updateNote}
						placeholder='Des informations complémentaires...'
						returnKeyType="done"
					/>
				</View>
				<Button title="OK" onPress={this.onOkPress}/>
				<View style={{height: 100}} />
			</KeyboardAvoidingView>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

export default connect(mapStateToProps, { addSos })(SOSEndConfigScreen);