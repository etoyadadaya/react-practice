import './JournalAddButton.css';

import CardButton from '../CardButton/CardButton.jsx';

function JournalAddButton({clearForm}) {
	return (
		<div>
			<CardButton className="journal-add" onClick={clearForm}>
				<img className="plus" src="/plus.svg" alt=""/>
                Новое воспоминание
			</CardButton>
		</div>
	);
}

export default JournalAddButton;