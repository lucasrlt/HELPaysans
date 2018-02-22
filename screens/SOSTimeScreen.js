import React, { Component } from 'react';
import { ButtonGroup, Text, Icon, FormInput, Button } from 'react-native-elements';
import { Alert, View, Platform, DatePickerIOS, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

class SOSTimeScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Mes SOS',
			tabBarIcon: ({ tintColor }) => {
				return <Icon name="phone" size={30} color={tintColor} />
			},
			headerTitle: 'Choisis l\'heure',
		};
	};

	state = {
		selectedDay: new Date().getDay() !== 0 && new Date().getDay() !== 6 ? new Date().getDay() : 0,
		selectedTime: new Date(2018, 2, 5, 12, 0),
	};

	// Gets the good day of the week (the week goes from 05/03/18 to 09/03/18)
	getRightDate = (date, daysToAdd) => {
		let startDate = new Date(2018, 2, 5, date.getHours(), date.getMinutes());
		startDate.setDate(startDate.getDate() + daysToAdd);

		return startDate;
	}

	onOkPress = () => {
		const { selectedDay, selectedTime } = this.state;
		const { params } = this.props.navigation.state;

		const date = this.getRightDate(selectedTime, selectedDay);
		
		this.props.navigation.push('sosEndConfig', { 
			type: params.sosType,
			turne: params.turne,
			room: params.room,
			date: date,
		});
	}

	updateDay = selectedDay => {
		this.setState({ selectedDay });
	};

	updateTime = selectedTime => {
		this.setState({ selectedTime });
	}


	render() {
		const dayButtons = ['L', 'M', 'M', 'J', 'V'];
		const currDate = new Date();
		return (
			<View style={{flex: 1, paddingTop: 20}}>
				<Image 
					style={{flex: .8, height: undefined, width: undefined}} 
					source={require('../assets/rooster.png')} 
					resizeMode="contain"
				/>
				<View style={{marginTop: 20}}>
					<Text h3 style={{textAlign: 'center'}}>Quel jour ?</Text>
					<ButtonGroup
						style={{marginTop: 10}}
						onPress={this.updateDay}
						selectedIndex={this.state.selectedDay}
						buttons={dayButtons}
					/>
				</View>

				<View style={{marginTop: 20}}>
					<Text h3 style={{textAlign: 'center'}}>Quelle heure ?</Text>
					{Platform.OS == 'android' ? 
							<View /> /// TODO
						:
							<DatePickerIOS
								locale='fr'
								date={this.state.selectedTime}
								minimumDate={new Date(2018, 2, 5, 7, 0)}
								onDateChange={this.updateTime}
								mode='time'
								minuteInterval={10}
							/>
					}
				</View>

				<Button title="OK" onPress={this.onOkPress}/>
			</View>
		);
	}
}

export default SOSTimeScreen