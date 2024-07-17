import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
    allusers: []

}


export const authslice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user,
                state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null,
                state.token = null
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("User friends non-existent")
            }
        },

        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },

        setPost: (state, action) => {
            const updatedPost = state.posts.map((e) => {
                if (e._id === action.payload._id) return action.payload
                return e;
            })
            state.posts = updatedPost
        },
        setallusers: (state, action) => {
            state.allusers = action.payload.allusers
        },
    }
})

export const { setMode, setFriends, setLogin, setLogout, setPosts, setPost, setallusers } = authslice.actions;

export default authslice.reducer