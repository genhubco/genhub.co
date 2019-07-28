const api = "https://api-io3i6v3cn.now.sh/";
const data = "https://data-o6m8znu9c.now.sh/";

module.exports = {
    target: "serverless",
    env: {
        TOKEN_COOKIE_NAME: "jwt-token-genhub-h4t98g4987tfg8944ea",
        RESULT_IMAGES_NOW_NAME: "images-genhub-h4t98g4987tfg8944ea",
        LOGIN_URL: api + "login",
        PROFILE_URL: api + "profile",
        PROJECTS_URL: api + "projects",
        RESULTS_URL: api + "results",
        AVATAR_URL: api + "avatar",
        API_DOCS_URL: api + "docs/",
        DATA_DOCS_URL: data + "docs/",
        SEARCH_URL: data + "search",
        SCORE_URL: data + "score",
        PROXY_REDIRECT_URL: "https://proxy.genhub.now.sh/redirect",
        GOOGLE_CLIENT_ID: "862067484080-upmf5o3qh3bmaeq7loub8imclm0ceebf.apps.googleusercontent.com",
        GITHUB_CLIENT_ID: "21e31307f46eb37b341b",
        ZEIT_API_TOKEN: process.env.ZEIT_API_TOKEN
    }
};
