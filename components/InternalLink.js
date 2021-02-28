import React from "react";
import css from "styled-jsx/css";
import Link from "next/link";

const InternalLink = ({ children, to = "" }) => (
  <div className="internal-link-container">
    <Link href={to}>
      <a className="internal-link">{children}</a>
    </Link>
    <style jsx>{styles}</style>
  </div>
);

const styles = css`
  .internal-link-container {
    display: inline-block;
  }
  .internal-link {
    display: block;
    border: none;
    background: none;
    cursor: pointer;
    box-sizing: border-box;
    padding: 4px 10px;
    border-radius: 10px;
    text-decoration: none;
    color: black;
  }

  .internal-link:hover {
    opacity: 0.7;
    background: #f2f3f4;
  }
`;

export default InternalLink;
