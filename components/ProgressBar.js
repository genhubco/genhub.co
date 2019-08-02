function map(input_start, input_end, output_start, output_end, input) {
    const output = output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
    return output;
}

export default ({ progress, width }) => (
    <div className="progress-bar-container">
        <div className="progress-bar"/>
        <style jsx>{`
            .progress-bar-container {
                display: inline-block;
                height: 7px;
                width: ${width}px;
                border: 1px solid #007fff;
                border-radius: 7px;
            }

            .progress-bar {
                border-radius: 7px;
                height: 7px;
                background: #007fff;
                width: ${map(0, 1, 0, width, progress)}px;
            }
        `}</style>
    </div>
);
