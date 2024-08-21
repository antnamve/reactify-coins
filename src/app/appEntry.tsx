import { MainPage } from '@/pages/main'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '../shared/index.css'
import { store } from './appStore'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<MainPage />
		</Provider>
	</StrictMode>
)
