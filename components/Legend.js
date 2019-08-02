export default ({ color }) => (
    <div className="legend">
        <style jsx>{`
            .legend {
                display: inline-block;
                height: 7px;
                width: 7px;
                background-color: ${color};
                border-radius: 7px;
            }
        `}</style>
    </div>
);
