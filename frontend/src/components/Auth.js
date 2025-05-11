import { GoogleLogin, googleLogout } from '@react-oauth/google'
import useAuth from '../hooks/useAuth'

export default function Auth() {
  const { user, login, logout } = useAuth()
  return user ? (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={() => { googleLogout(); logout() }}>Logout</button>
    </div>
  ) : (
    <GoogleLogin
      onSuccess={cred => {
        // For demo, just store the credential
        login({ name: 'Google User', ...cred })
      }}
      onError={() => alert('Login Failed')}
    />
  )
} 