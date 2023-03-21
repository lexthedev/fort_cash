import { transactionSlice, useAppDispatch } from "@/redux";
import { categorySlice } from "@/redux/reducers/categoryReducer";
import { LocalStoreService } from "@/redux/services/localStoreService";
import Head from "next/head";
import React, { useEffect } from "react";
import { IDynamicHead } from "../..";

export function DynamicHead(props: IDynamicHead) {

    const { title, description, icon } = props;

    const { setTransactions } = transactionSlice.actions;
    const { setCategories } = categorySlice.actions;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setTransactions(LocalStoreService.GetFromStore('transactions')));
        dispatch(setCategories(LocalStoreService.GetFromStore('categories')));
    }, [])

    return <Head>
        <title>{!!title ? title : "money calculator"}</title>
        <meta name="description" content={!!description ? description : "calculator app"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={!!icon ? icon : "/favicon.ico"} />
    </Head>
}