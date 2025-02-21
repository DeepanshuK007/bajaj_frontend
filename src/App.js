import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
	const [ input, setInput ] = useState('');
	const [ response, setResponse ] = useState(null);
	const [ error, setError ] = useState('');
	const [ selectedOptions, setSelectedOptions ] = useState([]);

	const options = [
		{ value: 'alphabets', label: 'Alphabets' },
		{ value: 'numbers', label: 'Numbers' },
		{ value: 'highest_alphabet', label: 'Highest alphabet' }
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setResponse(null);

		try {
			const parsedInput = JSON.parse(input);
			const result = await axios.post('https://your-backend-url.com/bfhl', parsedInput);
			setResponse(result.data);
		} catch (err) {
			setError('Invalid JSON input or API error');
		}
	};

	const renderResponse = () => {
		if (!response) return null;

		const selectedFields = selectedOptions.map((option) => option.value);
		const filteredResponse = {};

		selectedFields.forEach((field) => {
			if (field === 'alphabets') filteredResponse.alphabets = response.alphabets;
			if (field === 'numbers') filteredResponse.numbers = response.numbers;
			if (field === 'highest_alphabet') filteredResponse.highest_alphabet = response.highest_alphabet;
		});

		return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
	};

	return (
		<div className="App">
			<h1>BFHL Frontend</h1>
			<form onSubmit={handleSubmit}>
				<textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Enter JSON input (e.g., { &quot;data&quot;: [&quot;A&quot;,&quot;C&quot;,&quot;z&quot;] })"
				/>
				<button type="submit">Submit</button>
			</form>
			{error && <p className="error">{error}</p>}
			{response && (
				<div>
					<Select
						isMulti
						options={options}
						onChange={setSelectedOptions}
						placeholder="Select fields to display"
					/>
					{renderResponse()}
				</div>
			)}
		</div>
	);
}

export default App;
