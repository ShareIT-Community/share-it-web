import { useState, type FormEvent } from 'react'
import { FiArrowRight, FiArrowUpRight, FiLock } from 'react-icons/fi'
import './LoginPanel.css'

type Props = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
	message: string
}

export default function LoginPanel({ onSubmit, message }: Props) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className='dashboard-login'>
			<header className='dashboard-login__header'>
				<a className='dashboard-login__wordmark' href='/' aria-label='Share It, inicio'>
					share it<span>.</span>
				</a>
				<div className='dashboard-login__header-meta'>
					<span className='dashboard-login__admin-label'>Panel de administración</span>
					<a className='dashboard-login__back' href='/'>Volver al sitio <FiArrowUpRight aria-hidden='true' /></a>
				</div>
			</header>

			<main className='dashboard-login__main'>
				<div className='dashboard-login__container'>
					<section className='dashboard-login__card' aria-labelledby='login-title'>
						<p className='dashboard-login__eyebrow'>Panel de grupos</p>
						<h1 id='login-title'>Hola de nuevo.</h1>
						<p className='dashboard-login__copy'>Ingresa con tu cuenta para administrar los grupos de Share It.</p>
						{message && <p id='login-message' className='dashboard-login__message' role='alert'>{message}</p>}
						<form className='dashboard-login__form' onSubmit={onSubmit}>
							<div>
								<label htmlFor='login-email'>Correo electrónico</label>
								<div className='dashboard-login__input-wrap'>
									<input id='login-email' name='username' type='email' autoComplete='username' placeholder='nombre@share-it.tech' aria-describedby={message ? 'login-message' : undefined} required />
								</div>
							</div>
							<div>
								<label htmlFor='login-password'>Contraseña</label>
								<div className='dashboard-login__input-wrap'>
									<input id='login-password' name='password' type={showPassword ? 'text' : 'password'} autoComplete='current-password' placeholder='Tu contraseña' aria-describedby={message ? 'login-message' : undefined} required />
									<button className='dashboard-login__show-password' type='button' aria-controls='login-password' aria-pressed={showPassword} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword((visible) => !visible)}>
										{showPassword ? 'Ocultar' : 'Mostrar'}
									</button>
								</div>
							</div>
							<button type='submit' className='dashboard-login__submit'>Ingresar al panel <FiArrowRight aria-hidden='true' /></button>
						</form>
						<p className='dashboard-login__note'><FiLock aria-hidden='true' />Acceso exclusivo para administradores.</p>
					</section>
					<div className='dashboard-login__mobile-back'><a className='dashboard-login__back' href='/'>Volver al sitio</a></div>
				</div>
			</main>

			<footer className='dashboard-login__footer'><span className='dashboard-login__desktop-footer'>Share It / Admin</span><span className='dashboard-login__mobile-footer'>Share It · Panel de administración</span></footer>
		</div>
	)
}
