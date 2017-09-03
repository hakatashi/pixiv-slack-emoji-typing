const React = require('react');
const PropTypes = require('prop-types');

const Key = (props) => {
	const handleButtonClick = () => {
		props.onClick(props.name);
	};

	return (
		<p className="control">
			<a className="button" onClick={handleButtonClick}>
				{props.text}
			</a>
		</p>
	);
};

Key.propTypes = {
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

module.exports = Key;
