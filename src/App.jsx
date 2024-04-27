import axios from 'axios'
import {useState, useEffect} from 'react'

import './App.css'
import CardVacancy from './components/CardVacancy/CardVacancy'

const url = 'https://api.hh.ru/vacancies'

function App() {
	const [vacancies, setVacancies] = useState([])

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				setVacancies(response.data.items)
			})
			.catch((error) => {
				console.error('Ошибка при получении данных:', error)
			})
		console.log('new render')
	}, [])
	console.log('vacancy0', vacancies)
	let texts = []
	let text
	const stringProcessing = (str) => {
		str.trim()
	}
	//vacancies.map((item) => texts.push(item.snippet.responsibility))

	//console.log('texts', texts)
	return (
		<div className='app'>
			{vacancies.map((item, index) => (
				<CardVacancy
					key={index}
					title={item.name}
					logoSrc={item.employer.logo_urls?.original ? item.employer.logo_urls.original : ''}
					form={item.employment.name}
					company={item.employer.name}
					web={item.employer.alternate_url}
					address={item.area.name}
					description={item.snippet.requirement}
					requirements={item.snippet.responsibility}></CardVacancy>
			))}
		</div>
	)

	/*
  item.employer.logo_urls.hasOwnProperty('original')? item.employer.logo_urls.original: '' */
}

export default App
