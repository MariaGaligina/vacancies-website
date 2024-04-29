import axios from 'axios'
import {useState, useEffect} from 'react'

import styles from './App.module.scss'
import CardVacancy from './components/CardVacancy/CardVacancy'

const url = 'https://api.hh.ru/vacancies'

function App() {
	const [vacancies, setVacancies] = useState([])
	const [showenCardCount, setShowenCardCount] = useState(5)

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				setVacancies(response.data.items)
			})
			.catch((error) => {
				console.error('Ошибка при получении данных:', error)
			})
	}, [])

	const createCard = (item, index) => {
		return (
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
		)
	}

	const clickShowMore = () => {
		showenCardCount + 5 < vacancies.length
			? setShowenCardCount((prev) => prev + 5)
			: setShowenCardCount(vacancies.length)
	}

	return (
		<div className={styles['app']}>
			{vacancies.slice(0, showenCardCount).map((item, index) => createCard(item, index))}
			{showenCardCount < vacancies.length ? (
				<button className={styles['button']} onClick={clickShowMore}>
					Show more
				</button>
			) : (
				''
			)}
		</div>
	)
}

export default App
