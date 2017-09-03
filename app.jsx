const React = require('react');

class App extends React.Component {
	constructor(props, state) {
		super(props, state);

		this.state = {
			plainText: '',
		};
	}

	handlePlainTextChange = (event) => {
		this.setState({
			plainText: event.target.value,
		});
	}

	render() {
		return (
			<div>
				<div className="field">
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="テキスト"
							value={this.state.plainText}
							onChange={this.handlePlainTextChange}
						/>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<input className="input" type="text" disabled value=":fuku:"/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = App;
