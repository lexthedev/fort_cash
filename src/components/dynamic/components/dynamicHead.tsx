import Head from "next/head";
import React from "react";
import { IDynamicHead } from "../..";

export function DynamicHead(props: IDynamicHead) {

    const { title, description, icon } = props;

    return <Head>
        <title>{!!title ? title : "money calculator"}</title>
        <meta name="description" content={!!description ? description : "calculator app"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={!!icon ? icon : "/favicon.ico"} />
    </Head>
}