function extractTokens() {
  // extractTokensFromCookies
  const cookies = document.cookie;
  const cookieArray = cookies.split("; ");

  let accessToken = null;
  let refreshToken = null;

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i];
    const [name, value] = cookie.split("=");

    // Tokens must be stored with specific names
    if (name === "accessToken") {
      accessToken = value;
    } else if (name === "refreshToken") {
      refreshToken = value;
    }
  }

  return { accessToken, refreshToken };
}
