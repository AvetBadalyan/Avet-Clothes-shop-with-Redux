import { Component } from 'react'

/**
 * App-level error boundary. Catches render/lifecycle errors in the tree below
 * it so a single failing component can't blank the whole app. In production
 * this is where you'd forward the error to a monitoring service (Sentry etc.).
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Replace with your monitoring provider in production.
    if (import.meta.env.DEV) {
      console.error('Uncaught error:', error, info)
    }
  }

  handleReset = () => {
    // Full reload is the safest recovery for an unknown render error.
    window.location.assign('/')
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'grid',
            placeContent: 'center',
            textAlign: 'center',
            gap: '1rem',
            padding: '2rem'
          }}
        >
          <p className="overline">Something went wrong</p>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>
            We hit an unexpected error
          </h1>
          <p
            style={{
              color: 'var(--color-slate)',
              maxWidth: '42ch',
              margin: '0 auto'
            }}
          >
            Sorry about that. Reloading usually clears it — if it keeps
            happening, please try again later.
          </p>
          <div>
            <button
              className="btn"
              onClick={this.handleReset}
            >
              Back to home
            </button>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}
