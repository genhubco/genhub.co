import Link from "next/link";
import classnames from "classnames";
import { withRouter } from "next/router";

export default withRouter(({ router, user }) => {
  return (
    <div className="header">
      <Link href="/">
        <a className="header-logo">
          <img src="/static/applogo.svg" />
        </a>
      </Link>
      <style jsx global>{`
        .header {
          padding-top: 10px;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .header-logo {
          height: 30px;
          margin-left: 25px;
        }

        .header-logo img {
          height: 30px;
        }

        .header-avatar-link {
          display: inline-block;
          height: 20px;
          vertical-align: middle;
        }

        .header-avatar-link img {
          border-radius: 50%;
        }

        .header-links {
          padding-top: 5px;
          margin-right: 25px;
        }
      `}</style>
    </div>
  );
});
