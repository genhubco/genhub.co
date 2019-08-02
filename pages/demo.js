import { post } from "axios";
import { parse } from "toml";
import { decode } from "jsonwebtoken";
import { parseCookies } from "nookies";
import Error from "next/error";

import EditorWithMapAndTable from "../components/EditorWithMapAndTable";
import Header from "../components/Header";
import Page from "../components/Page";

export default class DemoPage extends React.Component {
    static async getInitialProps(ctx) {
        const cookies = parseCookies(ctx);
        const token = cookies[process.env.TOKEN_COOKIE_NAME];
        const authUser = decode(token);

        try {
            const defaultConfig = "# Algorithms available: \"cnn\", \"cfd\", \"all\"\n" +
                                "algo = \"all\"\n" +
                                "# Name of the gene you are targeting\n" +
                                "gene = \"EMX1\"\n" +
                                "# PAM sequence\n" +
                                "pam = \"CGG\"\n" +
                                "# Your guide RNA\n" +
                                "grna = \"GAGCGTCGTCG\"";
            const parsedToml = parse(defaultConfig);
            parsedToml.numItems = 10;
            const res = await post(process.env.SEARCH_URL, JSON.stringify(parsedToml));
            return { predictions: res.data, config: defaultConfig, authUser };
        } catch (e) {
            console.log(e);
            const status = e.response ? e.response.status : 500;
            return { status };
        }
    }

    render() {
        const { predictions, config, status, authUser } = this.props;
        if (status) {
            return (<Error statusCode={status} />);
        }
        return (
            <Page header={<Header user={authUser} />}>
                <EditorWithMapAndTable editable={true} initialState={{ status: "success", message: "✓ Compiled", predictions, config }} onSave={async (value) => {
                    try {
                        const parsedToml = parse(value);
                        parsedToml.numItems = 10;
                        const res = await post(process.env.SEARCH_URL, JSON.stringify(parsedToml));
                        return { predictions: res.data, status: "success", message: "✓ Compiled" };
                    } catch (e) {
                        if (e.name == "SyntaxError") {
                            return { status: "error", message: "× Failed to parse toml file." };
                        } else {
                            return { status: "error", message: "× Invalid config." };
                        }
                    }
                }} />
            </Page>
        );
    }
}
