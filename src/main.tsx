import React from 'react'
import ReactDOM from 'react-dom/client'
import { SessionContextProvider } from "@supabase/auth-helpers-react"

import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { supabase } from './lib/supabaseClient.ts'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SessionContextProvider supabaseClient={supabase}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
            </ThemeProvider>
        </SessionContextProvider>
    </React.StrictMode>,
)
