import { decode } from "jsonwebtoken";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import Card from "../components/Card";
import Page from "../components/Page";
import Header from "../components/Header";


const Profile = ({ user }) => (
    <Page content="small" header={<Header user={user}/>}>
        <p className="small-title">Coming soon...</p>
    </Page>
);

Profile.getInitialProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const token = cookies[process.env.TOKEN_COOKIE_NAME];
    const user = decode(token);
    return { user };
};

export default Profile;
