import React from 'react'
import styles from './CardVacancy.module.scss'

const CardVacancy = ({title, logoSrc, form, company, web, address, description, requirements}) => {
	return (
		<div className={styles['card']}>
			<div className={styles['content__header']}>
				<div className={styles['content__header__top']}>
					<h4 className={styles['content__header__top__title']}>{title}</h4>
					<img className={styles['content__header__top__logo']} src={logoSrc}></img>
					<button className={`${styles['button']} ${styles['button-respond']}`}>Respond</button>
				</div>
				<div className={styles['content__header__bottom']}>
					<ul>
						<li>
							<span>Form</span>
							<span>{form}</span>
						</li>
						<li>
							<span>Company</span>
							<span>{company}</span>
						</li>
						<li>
							<span>Web</span>
							<a href={web}>{web}</a>
						</li>
						<li>
							<span>Address</span>
							<span>{address}</span>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles['description']}>
				<p>{description}</p>
				<div className={styles['requirements']}>
					<p>Success Snapshot:</p>
					<ul>
						{requirements ? (
							requirements
								.trim()
								.split('. ')
								.map((item, index) => <li key={index}>{item}</li>)
						) : (
							<li>'No requirements'</li>
						)}
					</ul>
				</div>
			</div>
			<button className={styles['button__more-info']}>Less details</button>
		</div>
	)
}

export default CardVacancy
