const React = require('react');
const emoji = require('./emoji.csv');

const emojiMap = new Map(emoji.map((entry) => [entry.text, entry]));

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

	getEmojiText = () => (
		Array.from(this.state.plainText).map((character) => (
			`:${emojiMap.get(character).name}:`
		)).join('')
	)

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
						<input className="input" type="text" disabled value={this.getEmojiText()}/>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = App;
