import { ACCOUNT_MOCK_DISPLAY_NAME, ACCOUNT_MOCK_EMAIL } from '~/data/accountMock'
import { ACCOUNT_SESSION_STORAGE_KEY, ACCOUNT_SIGNED_IN_COOKIE } from '~/constants/session'

function writeSignedInToSessionStorage(signedIn: boolean) {
  if (!import.meta.client) {
    return
  }
  if (signedIn) {
    sessionStorage.setItem(ACCOUNT_SESSION_STORAGE_KEY, '1')
  } else {
    sessionStorage.removeItem(ACCOUNT_SESSION_STORAGE_KEY)
  }
}

export function useAccountSession() {
  const signedInCookie = useCookie<string | null>(ACCOUNT_SIGNED_IN_COOKIE, {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
  })

  const isSignedIn = useState('account-signed-in', () => signedInCookie.value === '1')
  const email = useState('account-email', () => ACCOUNT_MOCK_EMAIL)
  const displayName = useState('account-display-name', () => ACCOUNT_MOCK_DISPLAY_NAME)

  function applySignedInState(signedIn: boolean) {
    isSignedIn.value = signedIn
    signedInCookie.value = signedIn ? '1' : null
    writeSignedInToSessionStorage(signedIn)
    if (signedIn) {
      email.value = ACCOUNT_MOCK_EMAIL
      displayName.value = ACCOUNT_MOCK_DISPLAY_NAME
    }
  }

  function signIn() {
    applySignedInState(true)
  }

  function signOut() {
    applySignedInState(false)
  }

  function syncFromCookie() {
    if (signedInCookie.value === '1') {
      isSignedIn.value = true
      writeSignedInToSessionStorage(true)
    }
  }

  return { isSignedIn, email, displayName, signIn, signOut, syncFromCookie, signedInCookie }
}
