import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
    allusers: [],
    loading: false
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

        // setPost: (state, action) => {
        //     const updatedPost = state.posts.map((e) => {
        //         if (e._id === action.payload._id) return action.payload
        //         return e;
        //     })
        //     state.posts = updatedPost
        // },

        setPost: (state, action) => {
            state.posts = state.posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
            );
        },
        setallusers: (state, action) => {
            state.allusers = action.payload.allusers
        },
        setloading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setMode, setFriends, setLogin, setLogout, setPosts, setPost, setallusers, setloading } = authslice.actions;

export default authslice.reducer