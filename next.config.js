module.exports = {
    target: "serverless",
    env: process.env.NODE_ENV === "development" ? {
        TOKEN_COOKIE_NAME: "jwt-token-genhub-h4t98g4987tfg8944e-local",
        AUTH_URL: "https://api-57op7h7jj.now.sh/login",
        // AUTH_URL: "http://localhost:3001/login",
        API_DOCS_URL: "https://api-f2soaqfdq.now.sh/docs/",
        DATA_DOCS_URL: "https://data-34z66io3d.now.sh/docs/",
        AVATAR_URL: "https://api-qraf5zs8p.now.sh/avatar",
        SEARCH_URL: "https://api-9hxv0jktr.now.sh/search",
        SCORE: "https://api-9hxv0jktr.now.sh/score",
        GOOGLE_CLIENT_ID: "862067484080-d6e8j9kima1brtmp06t3mccv68rvghhj.apps.googleusercontent.com",
        GOOGLE_REDIRECT_URI: "http://localhost:3000/login?provider=google",
        GITHUB_CLIENT_ID: "b9b75de36e8de1da59ca",
        GITHUB_REDIRECT_URI: "http://localhost:3000/login?provider=github"
    } : {
        TOKEN_COOKIE_NAME: "jwt-token-genhub-h4t98g4987tfg8944e",
        AUTH_URL: "https://api-jrpl3g1n3.now.sh/login",
        API_DOCS_URL: "https://api-3g94hivvg.now.sh/docs/",
        DATA_DOCS_URL: "https://data-34z66io3d.now.sh/docs/",
        AVATAR_URL: "https://api-qraf5zs8p.now.sh/avatar",
        SEARCH_URL: "https://api-9hxv0jktr.now.sh/search",
        SCORE_URL: "https://api-9hxv0jktr.now.sh/score",
        GOOGLE_CLIENT_ID: "862067484080-upmf5o3qh3bmaeq7loub8imclm0ceebf.apps.googleusercontent.com",
        GOOGLE_REDIRECT_URI: "https://genhub.co/login?provider=google",
        GITHUB_CLIENT_ID: "21e31307f46eb37b341b",
        GITHUB_REDIRECT_URI: "https://genhub.co/login?provider=github"
    }
};
