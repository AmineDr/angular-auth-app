export const setTokens = ({ tokens }: { tokens: Tokens }) => {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  };
  
  
  export const getTokens = () => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    if (!access || !refresh) return null;
    return {
      access_token: access,
      refresh_token: refresh,
    };
  };
  