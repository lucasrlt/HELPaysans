import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { LocaleConfig, Agenda } from 'react-native-calendars';
import { fetchPlanning } from '../actions';
import { connect } from 'react-redux';

class PlanningScreen extends Component {
	static navigationOptions = {
		title: 'Planning',
		tabBarIcon: ({ tintColor }) => {
			return <Icon name="schedule" size={30} color={tintColor} />
		},
	};

	componentDidMount() {
		LocaleConfig.locales['fr'] = {
		  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
		  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
		  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
		};

		LocaleConfig.defaultLocale = 'fr';

		this.props.fetchPlanning();

	}

	renderEmptyDate = () => {
	    return (
      		<View style={styles.emptyDate}><Text>Il n'y a rien ce jour.</Text></View>
		);
	}

	renderItem = item => {
	    return (
	      	<View style={[styles.item, {height: item.height}]}>
	      		<Text style={{color: '#C46210', fontWeight: 'bold'}}>{item.name}</Text>
	      		<Text style={{color: '#C46210', opacity: 0.8}}>{item.description}</Text>
	      		<Text />
      			<Text style={{color: 'lightblue', fontWeight: 'bold'}}>{item.where}</Text>		      		
      			<Text style={{opacity: 0.7, color: 'red', fontWeight: 'bold'}}>{item.when}</Text>

	      	</View>
	    );
	}

	rowHasChanged = (r1, r2) => {
		return r1.name !== r2.name;
	}

	render() {
		return (
			<Agenda
			  	selected={'2018-03-05'}
			  	minDate={'2018-03-05'}
			  	maxDate={'2018-03-09'}
		  	  	pastScrollRange={1}
		  	  	futureScrollRange={1}
				items={this.props.planning}
			  	theme={{
				    agendaDayTextColor: '#DAA520',
				    agendaDayNumColor: '#C46210',
				    agendaTodayColor: 'blue',
				    agendaKnobColor: 'blue'
			    }}
			    renderItem={this.renderItem}
			    renderEmptyDate={this.renderEmptyDate}
			    rowHasChanged={this.rowHasChanged}
			/>
		);
	}
}

const styles = {
	item: {
   		backgroundColor: 'white',
	    flex: 1,
	    borderRadius: 5,
	    padding: 10,
	    marginRight: 10,
		marginTop: 17
	},
 	emptyDate: {
    	height: 15,
    	flex:1,
    	paddingTop: 30
	},
}

function mapStateToProps(state) {
	return {
		planning: state.sos.planning,
	};
}

export default connect(mapStateToProps, { fetchPlanning })(PlanningScreen);