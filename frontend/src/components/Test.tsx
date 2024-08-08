import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const postCode = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/github/auth/callback",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ code }),
          }
        );

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    if (code) {
      postCode();
    }
  }, []);

  const handleGithubLogin = () => {
    const clientID = import.meta.env.VITE_APP_CLIENT_ID;
    console.log("Hello", clientID);
    const redirectURI = import.meta.env.VITE_APP_REDIRECT_URI;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  return (
    <div>
      <button onClick={handleGithubLogin}>Github Login</button>
    </div>
  );
};

export default Test;
