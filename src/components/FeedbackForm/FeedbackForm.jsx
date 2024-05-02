import React, {useEffect, useState} from 'react'
import styles from './FeedbackForm.module.scss'

const FeedbackForm = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [comment, setComment] = useState('')
	const [isNameCorrect, setIsNameCorrect] = useState(true)
	const [isEmailCorrect, setIsEmailCorrect] = useState(true)
	const [isPhoneCorrect, setIsPhoneCorrect] = useState(true)
	const [nameError, setNameError] = useState('Имя не должно быть пустым')
	const [emaiError, setEmailError] = useState('Email не должен быть пустым')
	const [phoneError, setPhoneError] = useState('Номер не должен быть пустым')
	const [isDisabled, setIsDisabled] = useState(true)

	useEffect(() => {
		nameError || emaiError || phoneError ? setIsDisabled(true) : setIsDisabled(false)
	}, [nameError, emaiError, phoneError])

	const checkBlur = (event) => {
		switch (event.currentTarget.name) {
			case 'name':
				setIsNameCorrect(false)
				break
			case 'email':
				setIsEmailCorrect(false)
				break
			case 'phone':
				setIsPhoneCorrect(false)
				break
		}
	}

	const checkNameValid = (event) => {
		setName(event.target.value)
		event.target.value.length > 0 ? setNameError('') : setNameError('Имя не пустое')
	}

	const checkEmailValid = (event) => {
		setEmail(event.target.value)
		const emailRegExp =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
		event.target.value.length > 0 && emailRegExp.test(event.target.value)
			? setEmailError('')
			: setIsEmailCorrect('Некорректный email')
	}

	const checkPhoneValid = (event) => {
		setPhone(event.target.value)
		event.target.value.length > 0 &&
		!(isNaN(event.target.value) || event.target.value.includes('.'))
			? setPhoneError('')
			: setPhoneError('Номер может состоять только из цифр')
	}

	return (
		<form className={styles['feedback']}>
			<div className={styles['feedback__name']}>
				<label htmlFor='name'>Your name</label>
				{!isNameCorrect && nameError && <span className={styles['error-text']}>{nameError}</span>}
				<input
					type='text'
					name='name'
					id='name'
					value={name}
					onChange={(event) => checkNameValid(event)}
					onBlur={(event) => checkBlur(event)}
					placeholder='Please introduce yourself'
					className={`${styles['feedback__name-input']} ${
						isNameCorrect ? '' : styles['feedback__input-error']
					}`}
				/>
			</div>
			<div className={styles['feedback__email']}>
				<label htmlFor='email'>Email</label>
				{!isEmailCorrect && emaiError && <span className={styles['error-text']}>{emaiError}</span>}
				<input
					name='email'
					id='email'
					value={email}
					onChange={(event) => checkEmailValid(event)}
					onBlur={(event) => checkBlur(event)}
					placeholder='ivanov@gmail.com'
					className={`${styles['feedback__input']} ${
						isEmailCorrect ? '' : styles['feedback__input-error']
					}`}
				/>
			</div>
			<div className={styles['feedback__phone']}>
				<label htmlFor='phone'>Phone number</label>
				{!isPhoneCorrect && phoneError && (
					<span className={styles['error-text']}>{phoneError}</span>
				)}
				<input
					name='phone'
					id='phone'
					value={phone}
					onChange={(event) => checkPhoneValid(event)}
					onBlur={(event) => checkBlur(event)}
					placeholder='+7 (999) 000 00 00'
					className={`${styles['feedback__input']} ${
						isPhoneCorrect ? '' : styles['feedback__input-error']
					}`}
				/>
			</div>
			<div className={styles['feedback__comment']}>
				<label htmlFor='comment'>Comment</label>
				<textarea
					name='comment'
					id='comment'
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					placeholder='Message text'
					className={styles['feedback__comment-textarea']}
				/>
			</div>
			<div className={styles['form-bottom']}>
				<button className={styles['button']} disabled={isDisabled}>
					Send
				</button>

				<p>By clicking "Send" you confirm your consent to the</p>
				<p>
					<a href='https://www.figma.com/file/nrUnG4nK4CoKxFAW8dnyLT/%D0%A1%D1%82%D0%B0%D0%B6%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0-Frontend?type=design&node-id=14-1882&mode=design&t=8lvRb2lRhio8WOWd-0'>
						processing of personal data
					</a>
				</p>
			</div>
		</form>
	)
}

export default FeedbackForm
