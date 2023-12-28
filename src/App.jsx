import './App.css';

import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

import Header from './components/core/Header/Header.jsx';
import JournalList from './components/core/JournalList/JournalList.jsx';
import JournalForm from './components/core/JournalForm/JournalForm.jsx';
import JournalAddButton from './components/core/JournalAddButton/JournalAddButton.jsx';

import {useLocalStorage} from './components/hooks/useLocalStorage/use-localstorage.hook.js';

import {UserContextProvider} from './context/UserContext/user.context.jsx';
import {useState} from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(items)} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm onDelete={deleteItem} onSubmit={addItem} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;