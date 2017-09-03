const React = require('react');
const Key = require('./key.jsx');
const emoji = require('./emoji.csv');

const emojiTextMap = new Map(emoji.map((entry) => [entry.text, entry]));
const emojiNameMap = new Map(emoji.map((entry) => [entry.name, entry]));

class App extends React.Component {
	constructor(props, state) {
		super(props, state);

		this.state = {
			plainText: '',
			emojiList: [],
		};
	}

	handlePlainTextChange = (event) => {
		const plainText = event.target.value;

		const emojiList = Array.from(plainText).map((character) => (
			emojiTextMap.has(character) ? `${emojiTextMap.get(character).name}` : ''
		));

		this.setState({
			plainText,
			emojiList,
		});
	}

	handleClickKey = (name) => {
		const newEmejiList = this.state.emojiList.concat([name]);
		const newPlainText = newEmejiList.map((emojiName) => emojiNameMap.get(emojiName).text).join('');

		this.setState({
			emojiList: newEmejiList,
			plainText: newPlainText,
		});
	}

	getEmojiText = () => (
		this.state.emojiList.map((emojiName) => (
			`:${emojiName}:`
		)).join('')
	)

	renderEmojiImages = () => (
		this.state.emojiList.map((emojiName, index) => (
			<img
				key={index}
				className="emoji-image"
				src={emojiNameMap.get(emojiName).url}
				alt={`:${emojiNameMap.get(emojiName).name}:`}
			/>
		))
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
				<div className="emoji-images">
					{this.renderEmojiImages()}
				</div>
				<div className="keyboard">
					<div className="field is-grouped is-grouped-multiline">
						{
							emoji.map(({name, text}) => (
								<Key
									key={name}
									text={text}
									name={name}
									onClick={this.handleClickKey}
								/>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = App;
