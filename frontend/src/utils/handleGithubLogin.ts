const handleGithubLogin = () => {
    const clientID = import.meta.env.VITE_APP_CLIENT_ID;
    console.log("Hello", clientID);
    const redirectURI = import.meta.env.VITE_APP_REDIRECT_URI;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
 };

export default handleGithubLogin;