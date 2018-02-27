import React, { Component } from 'react';
import { View, Platform, ScrollView, Alert } from 'react-native';
import { Button, List, ListItem, Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchSOSTypes, fetchListNames, deleteSOS } from '../actions';
import Swipeout from 'react-native-swipeout';

class SOSScreen extends Component {

	goButtonPress() {
		if (this.props.user.name === '') {
			Alert.alert('On ne te connaît pas !', 'Pour pouvoir envoyer un SOS, nous devons savoir comment te contacter ! Pour cela, donne nous tes coordonnées dans l\'onglet Options.');
		} else {
			this.props.navigation.push('sosPicker');
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({ buttonPress: this.goButtonPress.bind(this) });
		this.props.fetchSOSTypes();
		this.props.fetchListNames();
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			title: 'Mes SOS',
			tabBarIcon: ({ tintColor }) => {
				return <Icon name="phone" size={30} color={tintColor} />
			},
			headerRight: (
				<Button
					onPress={params.buttonPress}
					backgroundColor="rgba(0, 0, 0, 0)"
      		color="rgba(0, 122, 255, 1)"
      		title="Go"
				/>
			)
		}
	};

	renderSOSs = () => {
		return this.props.allSos.map((item, index) => {
			let swipeoutButtons = [{ 
				text: 'Supprimer', 
				type: 'delete',
				onPress: () => { this.props.deleteSOS(item._id) }
			}];

			const date = new Date(item.date).toLocaleString('fr-FR', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
			return (
				<Swipeout key={index} autoClose={true} backgroundColor='transparent' right={swipeoutButtons}>
					<ListItem
						title={item.type.name}
						titleStyle={{color: '#C46210'}}
						rightTitle={date}
						hideChevron
						subtitle={`Turne ${item.turne} - ${item.room}`}
						subtitleStyle={{color: '#C46210', opacity: 0.7}}
						subtitleNumberOfLines={3}
					/>	
				</Swipeout>
			);
		});
	}

	render() {

		const { allSos } = this.props;
		
		return 	allSos.length > 0 ? 
			(<ScrollView>
				<List>
					{ this.renderSOSs() }
				</List>
			</ScrollView>)
			:
			(<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{opacity: .65}}>Appuie sur GO pour nous envoyer ton SOS !</Text>
			</View>)
	}
}

function mapStateToProps(state) {
	return {
		allSos: state.sos.all,
		user: state.user,
	};
}

export default connect(mapStateToProps, { fetchSOSTypes, fetchListNames, deleteSOS })(SOSScreen);