import classNames from "classnames";

export default ({data}) => {
    if (!data.headers.length) {
        return null;
    }
    return (
        <div className="rank-table-container">
            <table className="rank-table">
                <tbody>
                    <tr>
                        {data.headers.map((item, i) => (<th key={`key-${i}`} className={classNames({
                            "rank-table-first-header": i == 0,
                            "rank-table-header": i != 0,
                        })}>{item.display}</th>))}
                    </tr>
                    {data.results.map((row, i) => (
                        <tr key={`key-${i}`}>
                            {data.headers.map((item, j) => (<td key={`key-${i}-${j}`} className={classNames({
                                "rank-table-first-column": j == 0,
                                "rank-table-column": j != 0,
                            })}>{row[item.key]}</td>))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx global>{`
                  .rank-table-container {
                      width: 750px;
                      border-radius: 5px;
                      box-sizing: border-box;
                      padding: 10px;
                      border: 1px solid #f2f3f4;
                  }

                  .rank-table {
                      font-family: "PT Sans", sans-serif;
                      width: 728px;
                  }

                  .rank-table-first-header {
                      font-weight: 200;
                      padding: 4px;
                      color: #a7afb5;
                      text-align: left;
                  }

                  .rank-table-header {
                      font-weight: 200;
                      padding: 4px;
                      color: #a7afb5;
                      text-align: center;
                  }

                  .rank-table-first-column {
                      text-align: left;
                      padding: 4px;
                  }

                  .rank-table-column {
                      text-align: center;
                      padding: 4px;
                  }
            `}</style>
        </div>
    );
};
