export function saveToken(token) {
  localStorage.setItem('player-token', token);
}

export function getToken() {
  return localStorage.getItem('player-token');
}

export function decodeToken() {
  const token = getToken();
  if (!token) return {};
  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded;
}

export function deleteToken() {
  localStorage.removeItem('player-token');
}

export function isAuthenticated() {
  return !!getToken();
}

export function authorizationHeader() {
  return {
    headers: { Authorization: 'Bearer ' + getToken() }
  };
}

export function tokenUserId() {
  return decodeToken().sub;
}
