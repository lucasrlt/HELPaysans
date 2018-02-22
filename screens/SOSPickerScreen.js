import React, { Component } from 'react';
import { View, Platform, Button, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Icon, List, ListItem } from 'react-native-elements';

class SOSPickerScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Mes SOS',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name="phone" size={30} color={tintColor} />
		},
		headerTitle: 'Choisis ton SOS',
	});

	onItemPress = item => {
		this.props.navigation.navigate('sosConfig', { sosType: item });
	}

	render = () => {
		const avatar = require('../assets/wheat.png');

		if (this.props.sosTypes.length === 0) {
			return (
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{opacity: .7, textAlign: 'center'}}>L'application a besoin de réseau pour récupérer les SOS au premier lancement !</Text>
				</View>
			);
		}
		return (
			<ScrollView>
				<List>
					{
						this.props.sosTypes.map((item, index) => (
							<ListItem
								key={index}
								title={item.name}
								subtitleNumberOfLines={20}
								subtitle={item.description}
								avatar={avatar}
								onPress={this.onItemPress.bind(this, item)}
							/>	
						))
					}
				</List>
			</ScrollView>
		);
	}
}

function mapStateToProps(state) {
	return {
		sosTypes: state.sos.types,
	};
}

export default connect(mapStateToProps)(SOSPickerScreen);