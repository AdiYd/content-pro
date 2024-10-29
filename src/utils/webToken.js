export function createTokenFromQueryParams(queryParams) {
  // Convert query parameters to a JSON string, then Base64 encode it
  const base64Token = btoa(JSON.stringify(queryParams));
  return base64Token;
}

export function parseTokenToQueryParams(token) {
  try {
    // Decode the Base64 token and parse it back to an object
    const decodedParams = JSON.parse(atob(token));
    return decodedParams;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
