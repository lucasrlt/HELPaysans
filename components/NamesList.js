import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class NamesList extends Component {
	static propTypes = {
		onItemPress: PropTypes.func.isRequired,
	};

	state = {
		switchedItems: [],
	}

	componentDidMount() {
		this.switchRandomItems();
	}

	switchRandomItems = () => {
		const { switchedItems } = this.state;
		const { listNames } = this.props;
		const { conditions } = this.props.sosType;

		if (conditions.who.length > 0) {
			switchedItems.push(listNames.findIndex(item => item.name === conditions.who[0]));
			switchedItems.push(listNames.findIndex(item => item.name === conditions.who[1]));

		}

		this.setState({switchedItems});
	}

	onSwitch = (item, index) => {
		const { switchedItems } = this.state;

		if (switchedItems.includes(index)) {
			switchedItems.splice(switchedItems.indexOf(index), 1);
		} else {
			switchedItems.push(index);
		}

		this.setState({ switchedItems });

		let items = [];
		for (let i = 0; i < switchedItems.length; i++) {
			items.push(this.props.listNames[switchedItems[i]]);
		}
		this.props.onSwitch(items);
	}

	renderNames = () => {
		const { switchedItems }= this.state;
		const { listNames, sosType } = this.props;
		const { conditions } = sosType;
		return listNames.map((item, index) => {
			return (
				<ListItem
					hideChevron
					switchButton
					switchDisabled={!switchedItems.includes(index) && switchedItems.length >= conditions.numOfPeople || conditions.who.length > 0}
					onSwitch={this.onSwitch.bind(this, item, index)}
					key={index}
					title={item.name}
					switched={switchedItems.includes(index)}
					// avatar={avatar}
					onPress={this.props.onItemPress.bind(this, item)}
				/>				
			)
		})
	}

	render() {
		return (
			<ScrollView>
				<List>
					{ this.renderNames() }
				</List>
			</ScrollView>
		);
	}
}

function mapStateToProps(state) {
	return {
		listNames: state.sos.listNames,
	};
}

export default connect(mapStateToProps)(NamesList);