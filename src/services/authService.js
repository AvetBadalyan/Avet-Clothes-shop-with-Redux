// ============================================================
//  Mock Auth Service (localStorage-based demo)
// ============================================================
//  This simulates authentication for the portfolio demo.
//
//  IN A REAL APP you would:
//  1. Send email/password to your backend over HTTPS
//  2. Backend validates and hashes password with bcrypt
//  3. Backend stores user in database
//  4. Backend returns a signed JWT token
//
//  This mock stores users in localStorage and creates fake tokens.
//  The API is designed so you could swap in Supabase/Firebase easily
//  by just reimplementing these functions.
// ============================================================

import { clearState, loadState, saveState } from '@/store/storage.js'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'
const SAVED_ADDRESSES_KEY = 'savedAddresses'

// localStorage helpers
const readUsers = () => loadState(USERS_KEY, {})
const writeUsers = users => saveState(USERS_KEY, users)
const readAddresses = () => loadState(SAVED_ADDRESSES_KEY, {})
const writeAddresses = addresses => saveState(SAVED_ADDRESSES_KEY, addresses)

// Create a mock token (just base64 encoded data, NOT a real JWT)
// In production: your backend creates real signed JWTs
const createMockToken = email => {
	const payload = {
		email,
		createdAt: Date.now(),
		expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
	}
	return btoa(JSON.stringify(payload))
}

// Simulate network delay (makes UI feel more realistic)
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Generate a display name from email (e.g., "john.doe@gmail.com" → "John Doe")
const nameFromEmail = email => {
	const handle = email.split('@')[0].replace(/[._-]+/g, ' ')
	return handle.replace(/\b\w/g, c => c.toUpperCase())
}

export const authService = {
	/**
	 * Check if user is logged in (reads from localStorage)
	 * Returns { user, token } or null if not logged in / token expired
	 */
	getSession() {
		const session = loadState(SESSION_KEY, null)
		if (!session?.token) return null

		try {
			// Check if token is expired
			const payload = JSON.parse(atob(session.token))
			if (payload.expiresAt && Date.now() > payload.expiresAt) {
				clearState(SESSION_KEY)
				return null
			}
		} catch {
			// Invalid token format
			clearState(SESSION_KEY)
			return null
		}

		return session
	},

	/**
	 * Create a new account
	 * In production: POST to /api/auth/signup
	 */
	async signUp({ name, email, password }) {
		await delay()

		const users = readUsers()
		const key = email.toLowerCase()

		// Check if email already exists
		if (users[key]) {
			throw new Error('An account with this email already exists.')
		}

		// Create user record
		// NOTE: In a real app, NEVER store passwords client-side!
		// This is just for demo. Real apps hash with bcrypt on the server.
		const createdAt = new Date().toISOString()
		users[key] = {
			name: name || nameFromEmail(email),
			email: key,
			password, // ⚠️ Demo only! Real apps use bcrypt server-side
			createdAt
		}
		writeUsers(users)

		// Create session
		const user = { name: users[key].name, email: key, createdAt }
		const session = { user, token: createMockToken(key) }
		saveState(SESSION_KEY, session)

		return session
	},

	/**
	 * Log in with existing account
	 * In production: POST to /api/auth/login
	 */
	async signIn({ email, password }) {
		await delay()

		const users = readUsers()
		const key = email.toLowerCase()
		const record = users[key]

		// Check credentials
		if (!record || record.password !== password) {
			throw new Error('Incorrect email or password.')
		}

		// Create session
		const user = {
			name: record.name,
			email: key,
			createdAt: record.createdAt ?? null
		}
		const session = { user, token: createMockToken(key) }
		saveState(SESSION_KEY, session)

		return session
	},

	/**
	 * Log out (clear session)
	 */
	async signOut() {
		clearState(SESSION_KEY)
	},

	/**
	 * Save shipping address for a user (persists across sessions)
	 */
	saveAddress(email, address) {
		if (!email) return
		const addresses = readAddresses()
		addresses[email.toLowerCase()] = address
		writeAddresses(addresses)
	},

	/**
	 * Get saved shipping address for a user
	 */
	getAddress(email) {
		if (!email) return null
		const addresses = readAddresses()
		return addresses[email.toLowerCase()] ?? null
	}
}
