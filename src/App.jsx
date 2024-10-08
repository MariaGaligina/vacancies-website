import axios from 'axios'
import {useState, useEffect, useRef} from 'react'

import styles from './App.module.scss'
import CardVacancy from './components/CardVacancy/CardVacancy'
import FeedbackForm from './components/FeedbackForm/FeedbackForm'
import ChevronDown from './assets/icons/chevronDown.svg?react'
import ChevronUp from './assets/icons/chevronUp.svg?react'
import Close from './assets/icons/close.svg?react'

const url = 'https://api.hh.ru/vacancies'

function App() {
	const vacanciesRef = useRef([])
	const [isFiltered, setIsFiltered] = useState(false)
	const [form, setForm] = useState('')
	const [position, setPosition] = useState('')
	const [showenCardCount, setShowenCardCount] = useState(5)
	const [filteredVacancies, setFilteredVacancies] = useState([])
	const [allPositions, setAllPositions] = useState([])
	const [activeForm, setActiveForm] = useState(false)
	const [activePosition, setActivePosition] = useState(false)

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				vacanciesRef.current = response.data.items
				setFilteredVacancies(response.data.items)
				setAllPositions(
					[...new Set(response.data.items.map((item) => item.name))].sort((a, b) =>
						a.localeCompare(b)
					)
				)
			})
			.catch((error) => {
				console.error('Ошибка при получении данных:', error)
			})
	}, [])

	const formChange = (event) => {
		setForm(event.target.value)
		console.log('form on change', form)
	}
	const positionChange = (event) => {
		setPosition(event.target.value)
		console.log('position on change', position)
	}

	const filterVacancies = (form, position) => {
		if (!(form || position)) {
			setFilteredVacancies(vacanciesRef.current)
		} else if (form && position) {
			setFilteredVacancies(
				vacanciesRef.current.filter((item) => item.employment.id === form && item.name === position)
			)
		} else if (form && !position) {
			setFilteredVacancies(vacanciesRef.current.filter((item) => item.employment.id === form))
		} else if (!form && position) {
			setFilteredVacancies(vacanciesRef.current.filter((item) => item.name === position))
		}
		console.log('form', form)
		console.log('position', position)
	}

	const clickClearFilters = () => {
		setForm('')
		setPosition('')
		setFilteredVacancies(vacanciesRef.current)
	}

	const checkFocus = (event) => {
		if (event.target.name === 'form') setActiveForm(true)
		else if (event.target.name === 'position') setActivePosition(true)
	}
	const checkBlur = (event) => {
		if (event.target.name === 'form') setActiveForm(false)
		else if (event.target.name === 'position') setActivePosition(false)
	}

	useEffect(() => {
		//filterVacancies(form, position)
		if (form || position) setIsFiltered(true)
		else setIsFiltered(false)
	}, [form, position])

	const clickSearch = () => {
		filterVacancies(form, position)
		if (form || position) setIsFiltered(true)
		else setIsFiltered(false)
	}

	const clickShowMore = () => {
		showenCardCount + 5 < filteredVacancies.length
			? setShowenCardCount((prev) => prev + 5)
			: setShowenCardCount(filteredVacancies.length)
	}

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

	const options = ['Опция 1', 'Опция 2', 'Опция 3']

	return (
		<div className={styles['app']}>
			<div className={styles['wrapper']}>
				<div className={styles['top']}>
					<header className={styles['filters']}>
						<h1>List of vacancies</h1>
						<form className={styles['filters-card']}>
							<div>
								<label>Form</label>
								<select
									value={form}
									name='form'
									onChange={formChange}
									onFocus={(event) => checkFocus(event)}
									onBlur={(event) => checkBlur(event)}>
									<option value='' disabled hidden>
										Not selected
									</option>
									<option value='full'>Full time</option>
									<option value='half'>Half time</option>
									<option value='part'>Part time</option>
									<option value='probation'>Internship</option>
								</select>
							</div>
							<div>
								<label>Position</label>
								<select
									value={position}
									name='position'
									onChange={positionChange}
									onFocus={(event) => checkFocus(event)}
									onBlur={(event) => checkBlur(event)}>
									<option value='' disabled hidden>
										Not selected
									</option>
									{allPositions.map((item, index) => (
										<option value={item} key={index}>
											{item}
										</option>
									))}
								</select>
							</div>

							<button
								className={`${styles['button']} ${styles['button__search']}`}
								type='button'
								onClick={clickSearch}>
								Search
							</button>
						</form>
						{isFiltered ? (
							<div className={styles['close-block']}>
								<Close />
								<button
									onClick={clickClearFilters}
									type='reset'
									className={`${styles['button']} ${styles['button__clear-filters']}`}>
									Clear filters
								</button>
							</div>
						) : (
							''
						)}
					</header>
					<main>
						{filteredVacancies.length ? (
							filteredVacancies
								.slice(0, showenCardCount)
								.map((item, index) => createCard(item, index))
						) : (
							<p>Нет подходящей выкансии</p>
						)}
						{showenCardCount < filteredVacancies.length ? (
							<button className={styles['button']} onClick={clickShowMore}>
								Show more
							</button>
						) : (
							''
						)}
					</main>
				</div>
				<footer>
					<FeedbackForm />
					<div className={styles['footer-bottom']}>
						<div className={styles['footer-bottom__contacts']}>
							<p>+7 499 391-66-69</p>
							<p>mail@greensight.ru</p>
						</div>
						<div className={styles['footer-bottom__address']}>
							<p>322A, 2nd Floor, Zelenograd, Moscow, Russia</p>
							<a>Directions</a>
						</div>
					</div>
				</footer>
			</div>
		</div>
	)
}

export default App
