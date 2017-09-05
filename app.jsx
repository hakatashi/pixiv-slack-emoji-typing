const {h, Component} = require('preact');
const Key = require('./key.jsx');
const emoji = require('./emoji.csv');

const sortedEmoji = emoji.sort((a, b) => {
	const Achars = Array.from(a.text);
	const Bchars = Array.from(b.text);

	if (Achars.length !== Bchars.length) {
		return Achars.length - Bchars.length;
	}

	return Achars[0].codePointAt(0) - Bchars[0].codePointAt(0);
});

const reversedSortedEmoji = sortedEmoji.slice().reverse();

const emojiMap = new Map(emoji.map((entry) => [entry.name, entry]));

// eslint-disable-next-line valid-jsdoc
/** @jsx h */
class App extends Component {
	constructor(props, state) {
		super(props, state);

		this.state = {
			plainText: '',
			emojiList: [],
		};
	}

	handlePlainTextChange = (event) => {
		const plainText = event.target.value;

		let remainingText = plainText;
		const emojiList = [];

		while (remainingText.length > 0) {
			let pushed = false;

			for (const {text, name} of reversedSortedEmoji) {
				if (remainingText.startsWith(text)) {
					emojiList.push(name);
					remainingText = remainingText.slice(text.length);
					pushed = true;
					break;
				}
			}

			if (!pushed) {
				remainingText = remainingText.slice(1);
			}
		}

		this.setState({
			plainText,
			emojiList,
		});
	}

	handleClickDelete = () => {
		this.state.emojiList.pop();
		const newPlainText = this.state.emojiList.map((emojiName) => emojiMap.get(emojiName).text).join('');

		this.setState({
			emojiList: this.state.emojiList,
			plainText: newPlainText,
		});
	}

	handleClickKey = (name) => {
		const newEmejiList = this.state.emojiList.concat([name]);
		const newPlainText = newEmejiList.map((emojiName) => emojiMap.get(emojiName).text).join('');

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
				src={emojiMap.get(emojiName).url}
				alt={`:${emojiMap.get(emojiName).name}:`}
			/>
		))
	)

	render() {
		return (
			<div>
				<div className="field has-addons">
					<div className="control text-area">
						<input
							className="input"
							type="text"
							placeholder="テキスト"
							value={this.state.plainText}
							onChange={this.handlePlainTextChange}
						/>
					</div>
					<div className="control">
						<a className="button is-danger" onClick={this.handleClickDelete}>
							一つ消す
						</a>
					</div>
				</div>
				<div className="field">
					<div className="control">
						<input className="input" type="text" readOnly value={this.getEmojiText()}/>
					</div>
				</div>
				<div className="emoji-images">
					{this.renderEmojiImages()}
				</div>
				<div className="keyboard">
					<div className="field is-grouped is-grouped-multiline">
						{
							sortedEmoji.map(({name, text}) => (
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
