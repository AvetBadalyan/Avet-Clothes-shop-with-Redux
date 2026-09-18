// ============================================================
//  Auth service abstraction.
//
//  The rest of the app talks to this module only — it never touches
//  the auth backend directly. Today it is a localStorage-backed mock
//  that issues a fake JWT. Swapping in Supabase Auth later means
//  reimplementing these four functions with supabase.auth.* calls
//  and nothing else in the app has to change.
// ============================================================
import { loadState, saveState, clearState } from "@/store/storage.js";

const USERS_KEY = "users";
const SESSION_KEY = "session";

const readUsers = () => loadState(USERS_KEY, {});
const writeUsers = (users) => saveState(USERS_KEY, users);

// A deliberately fake, decodable "JWT-shaped" token (NOT secure — mock only).
const issueToken = (email) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: email,
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  );
  const signature = btoa(`luxe-mock-${email}`);
  return `${header}.${payload}.${signature}`;
};

const delay = (ms = 550) => new Promise((r) => setTimeout(r, ms));

const nameFromEmail = (email) => {
  const handle = email.split("@")[0].replace(/[._-]+/g, " ");
  return handle.replace(/\b\w/g, (c) => c.toUpperCase());
};

export const authService = {
  /** Returns the persisted session ({ user, token }) or null. */
  getSession() {
    return loadState(SESSION_KEY, null);
  },

  async signUp({ name, email, password }) {
    await delay();
    const users = readUsers();
    const key = email.toLowerCase();
    if (users[key]) {
      throw new Error("An account with this email already exists.");
    }
    users[key] = { name: name || nameFromEmail(email), email: key, password };
    writeUsers(users);
    const user = { name: users[key].name, email: key };
    const session = { user, token: issueToken(key) };
    saveState(SESSION_KEY, session);
    return session;
  },

  async signIn({ email, password }) {
    await delay();
    const users = readUsers();
    const key = email.toLowerCase();
    const record = users[key];
    if (!record || record.password !== password) {
      throw new Error("Incorrect email or password.");
    }
    const user = { name: record.name, email: key };
    const session = { user, token: issueToken(key) };
    saveState(SESSION_KEY, session);
    return session;
  },

  async signOut() {
    clearState(SESSION_KEY);
  },
};
