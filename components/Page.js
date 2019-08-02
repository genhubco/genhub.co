import classnames from "classnames";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";

export default ({ className, contentClassName = "content-medium", header = <Header/>, footer = <Footer/>, children }) => (
    <div className={classnames("page", className)}>
        <Head/>
        {header}
        <div className={classnames("content", contentClassName)}>
            {children}
        </div>
        {footer}
        <style jsx global>{`
            html {
                margin: 0;
                height: 100%;
            }

            #__next {
                margin: 0;
                height: 100%;
            }

            body {
                margin: 0;
                height: 100%;
            }

            *:focus {
                outline: 1px solid #007fff;
            }

            .page {
                display: flex;
                flex-flow: column;
                height: 100vh;
            }

            .btn-primary {
                font-family: "PT Sans", sans-serif;
                margin-right: 10px;
                height: 30px;
                min-width: 100px;
                background-color: white;
                border: 1px solid #dddfe2;
                font-size: 12px;
                border-radius: 5px;
                cursor: pointer;
                padding: 0;
            }

            .btn-primary:last-child {
                margin-right: 0;
            }

            .btn-primary:hover {
                background-color: #f2f3f4;
            }

            .small-btn-primary {
                font-family: "PT Sans", sans-serif;
                margin-right: 10px;
                padding: 1px 7px 1px;
                height: 18px;
                min-width: 70px;
                background-color: white;
                border: 1px solid #dddfe2;
                font-size: 12px;
                border-radius: 5px;
                cursor: pointer;
            }

            .small-btn-primary:last-child {
                margin-right: 0;
            }

            .small-btn-primary:hover {
                background-color: #f2f3f4;
            }

            .link {
                margin-right: 10px;
                font-size: 14px;
                color: #007fff;
                text-decoration: none;
                font-family: "PT Sans", sans-serif;
                border: none;
                background: none;
                cursor: pointer;
                padding: 0;
            }

            .link:hover {
                font-weight: bold;
            }

            .link:last-child {
                margin-right: 0;
            }

            .internal-link {
                margin-right: 10px;
                color: black;
                text-decoration: none;
                font-size: 14px;
                font-family: "PT Sans", sans-serif;
                border: none;
                background: none;
                cursor: pointer;
                padding: 0;
            }

            .internal-link:hover {
                font-weight: bold;
            }

            .internal-link:last-child {
                margin-right: 0;
            }

            .internal-link-active {
                font-weight: bold;
            }

            .content-tiny {
                width: 400px;
                margin: 0 auto auto auto;
            }

            .content-small {
                width: 500px;
                margin: 0 auto auto auto;
            }

            .content-medium {
                width: 750px;
                margin: 0 auto auto auto;
            }

            .content-big {
                width: 1000px;
                margin: 0 auto auto auto;
            }

            .content-tiny-center {
                width: 400px;
                margin: auto;
            }

            .content-small-center {
                width: 500px;
                margin: auto;
            }

            .content-medium-center {
                width: 750px;
                margin: auto;
            }

            .content-big-center {
                width: 1000px;
                margin: auto;
            }

            .text {
                font-family: "PT Sans", sans-serif;
                font-size: 14px;
                margin: 0;
            }

            .error {
                margin: 0;
                color: #EE6868;
                font-family: "PT Sans", sans-serif;
                font-size: 12px;
            }

            .desc {
                font-family: "PT Sans", sans-serif;
                font-size: 14px;
                color: #a7afb5;
                margin: 0;
            }

            .title {
                font-weight: normal;
                font-family: "PT Sans", sans-serif;
                margin: 0;
            }

            .granit-editor-container {
                background-color: #f2f3f4;
                border-radius: 5px;
            }

            .granit-editor-highlight .string {
                color: #78C365;
            }

            .granit-editor-highlight .comment {
                color: #a7afb5;
            }

            .granit-editor-unsaved-indicator {
                background: #4BA7DB;
            }
        `}</style>
    </div>
);
