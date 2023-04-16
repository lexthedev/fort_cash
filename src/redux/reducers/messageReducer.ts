import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "..";

interface MessageState {
    messages: IMessage[];
    // isLoading: boolean;
    // error: any | any[];
}

const initialState: MessageState = {
    messages: [] as IMessage[],
    // isLoading: false,
    // error: null
}

export const messageSlice = createSlice({
    name: 'messageSlice',
    initialState,
    reducers: {
        addMessage(state: MessageState, action: PayloadAction<IMessage>) {
            const newMessage: IMessage = {
                timeout: 10,
                ...action.payload,
                dateTimeId: String(Date.now())
            }
            state.messages.push(newMessage)
        },
        removeMessage(state: MessageState, action: PayloadAction<string>) {
            const messages = state.messages;
            const newMessages = messages.filter(msg => msg.dateTimeId !== action.payload)
            state.messages = newMessages;
        }
    }
})

export default messageSlice.reducer;