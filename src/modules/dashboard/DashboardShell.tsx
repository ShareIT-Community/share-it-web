import type { ReactNode } from 'react'
import { FiAlertCircle, FiArrowUpRight, FiCalendar, FiGrid, FiInbox, FiLogOut, FiPlus, FiSearch, FiUsers } from 'react-icons/fi'
import './Dashboard.css'

export type DashboardSection = 'groups' | 'referents' | 'events'
export type DashboardLoadState = 'loading' | 'ready' | 'error'

interface Props {
	section: DashboardSection
	onSectionChange: (section: DashboardSection) => void
	onLogout: () => void
	groupCount?: number
	referentCount?: number
	eventCount?: number
	children: ReactNode
}

export default function DashboardShell({ section, onSectionChange, onLogout, groupCount, referentCount, eventCount, children }: Props) {
	const sections = [
		{ id: 'groups' as const, label: 'Grupos', icon: FiGrid, count: groupCount },
		{ id: 'referents' as const, label: 'Referentes', icon: FiUsers, count: referentCount },
		{ id: 'events' as const, label: 'Eventos', icon: FiCalendar, count: eventCount },
	]

	return (
		<div className='dashboard-shell'>
			<a className='dashboard-shell__skip' href='#dashboard-content'>Ir al contenido</a>
			<aside className='dashboard-shell__sidebar'>
				<div className='dashboard-shell__brand-block'>
					<a className='dashboard-shell__brand' href='/' aria-label='Share It, inicio'>share it<span>.</span></a>
					<p>Administración</p>
				</div>
				<nav className='dashboard-shell__navigation' aria-label='Navegación del panel'>
					<span className='dashboard-shell__nav-caption'>Comunidad</span>
					{sections.map(({ id, label, icon: Icon, count }) => (
						<button key={id} type='button' aria-current={section === id ? 'page' : undefined} onClick={() => onSectionChange(id)}>
							<Icon aria-hidden='true' /><span>{label}</span>{count !== undefined && <span className='dashboard-shell__count'>{count}</span>}
						</button>
					))}
				</nav>
				<div className='dashboard-shell__sidebar-footer'>
					<a href='/'><FiArrowUpRight aria-hidden='true' />Ver sitio</a>
					<button type='button' onClick={onLogout}><FiLogOut aria-hidden='true' />Salir</button>
				</div>
			</aside>

			<div className='dashboard-shell__workspace'>
				<header className='dashboard-shell__mobile-header'>
					<a className='dashboard-shell__brand' href='/' aria-label='Share It, inicio'>share it<span>.</span></a>
					<a href='/' className='dashboard-shell__site-link'>Ver sitio<FiArrowUpRight aria-hidden='true' /></a>
				</header>
				<main id='dashboard-content' className='dashboard-shell__content' tabIndex={-1}>{children}</main>
			</div>

			<nav className='dashboard-shell__bottom-nav' aria-label='Navegación móvil del panel'>
				{sections.map(({ id, label, icon: Icon }) => (
					<button key={id} type='button' aria-current={section === id ? 'page' : undefined} onClick={() => onSectionChange(id)}><Icon aria-hidden='true' /><span>{label}</span></button>
				))}
				<button type='button' onClick={onLogout}><FiLogOut aria-hidden='true' /><span>Salir</span></button>
			</nav>
		</div>
	)
}

export function DashboardHeading({ title, description, action, onAdd }: { title: string; description: string; action: string; onAdd: () => void }) {
	return (
		<header className='dashboard-heading'>
			<div><h1>{title}</h1><p>{description}</p></div>
			<button className='dashboard-button dashboard-button--primary' type='button' onClick={onAdd}><FiPlus aria-hidden='true' />{action}</button>
		</header>
	)
}

export function DashboardToolbar({ query, onQueryChange, placeholder, resultLabel }: { query: string; onQueryChange: (value: string) => void; placeholder: string; resultLabel: string }) {
	return (
		<div className='dashboard-toolbar'>
			<label className='dashboard-search'><FiSearch aria-hidden='true' /><input type='search' value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>
			<p className='dashboard-toolbar__count' role='status'>{resultLabel}</p>
		</div>
	)
}

export function DashboardState({ title, description, loading, onRetry }: { title: string; description?: string; loading?: boolean; onRetry?: () => void }) {
	return (
		<div className='dashboard-state' role={onRetry ? 'alert' : 'status'}>
			{!loading && (onRetry ? <FiAlertCircle aria-hidden='true' /> : <FiInbox aria-hidden='true' />)}
			<h2>{title}</h2>
			{description && <p>{description}</p>}
			{onRetry && <button className='dashboard-button' type='button' onClick={onRetry}>Reintentar</button>}
		</div>
	)
}
