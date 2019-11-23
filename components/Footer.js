export default () => (
  <div className="footer">
    <a target="_blank" href="mailto:lazoviccorp@gmail.com" className="link">
      {" "}
      contact{" "}
    </a>
    -
    <a target="_blank" href="https://medium.com/genhub" className="link">
      {" "}
      blog{" "}
    </a>
    -
    <a target="_blank" href="https://angel.co/genhubco/jobs" className="link">
      {" "}
      jobs{" "}
    </a>
    <style jsx global>{`
      .footer {
        border-top: 1px solid #f2f3f4;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
      }
    `}</style>
  </div>
);
