const goal = 300;

var AmountRemaining = React.createClass({
	render: function() {
		var amt = this.props.amtRemaining;
		return (
			<div className="container" id="amt-bar">
				<div id="amt">${amt} still needed for this project.</div>
			</div>
		);
	}
});

var ProgressBar = React.createClass({
	render: function() {
		var progress = this.props.percent.toString() + "%";
		return (
			<div className="progress">
				<div className="progress-bar" role="progressbar" aria-valuenow={progress} 
				aria-valuemin="0" aria-valuemax="100" style={{width: progress}}>
					<span className="sr-only">60% Complete</span>
				</div>
			</div>
		);
	}
});

var DonationInfo = React.createClass({
	render: function() {
		var grammarFix = (this.props.numDonors === 1 ? "donor who has" : "donors who have");
		return (
			<div className= "donation-info">
				<p><span id="time-remain">Only 3 days</span> left to fund this project.</p>
				<p>Join the {this.props.numDonors + " " + grammarFix} already supported this
				project. Every dollar helps.</p>
			</div>
		);
	}
});

var SubmitForm = React.createClass({
	update: function() {
		var value = this.refs.donationInput.getDOMNode().value;
		this.props.donate(value);
	},
	render: function() {
		return (
			<div className="input-group">
				<input type="text" className="form-control" placeholder="$50" 
				ref="donationInput" />
				<span className="input-group-btn">
					<button onClick={this.update} type="button" className="btn btn-success">
					Give Now</button>
				</span>
			</div>
		);
	}
});

var SaveButton = React.createClass({
	render: function() {
		return (
			<button type="button" className="btn save">Save for later</button>
		);
	}
});

var ShareButton = React.createClass({
	render: function() {
		return (
			<button type="button" className="btn share">Tell your friends</button>
		);
	}
});

var ButtonBar = React.createClass({
	render: function() {
		return (
			<div className="btn-group" role="group" aria-label="button-bar">
				<SaveButton />
				<ShareButton />
			</div>
		);
	}
});

var DonationPortal = React.createClass({
	getInitialState: function() {
		return (
			{currDonation: 0, amtRemaining: 300, numDonors: 0}
		);
	},
	donate: function(amtToDonate) {
		this.setState({
										currDonation: amtToDonate,
										amtRemaining: this.state.amtRemaining - amtToDonate,
										numDonors: this.state.numDonors + 1
									}
		);
	},
	render: function() {
	var percent = 100 - (100 * (this.state.amtRemaining / goal));
		return (
			<div className="col-md-3 col-md-offset-5">
				<div className="donationPortal">
					Donate here.
					<div className="row">
						<AmountRemaining amtRemaining={this.state.amtRemaining} />
					</div>
					<div className="row">
						<ProgressBar percent={percent} />
					</div>
					<div className="row">
						<DonationInfo numDonors={this.state.numDonors}/>
					</div>
					<div className="row">
						<SubmitForm  donate={this.donate}/>
					</div>
					<div className="row">
						<ButtonBar />
					</div>
				</div>
			</div>
		);
	}
});

React.render(
	<DonationPortal />,
	document.getElementById('content')
);
