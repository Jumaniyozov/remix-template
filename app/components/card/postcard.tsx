import {createContext, PropsWithChildren, useContext} from "react";

type PostCardContext = {
    post: Post;
}

const PostCardContext = createContext<PostCardContext | undefined>(undefined)

type PostCardContextProviderProps = PropsWithChildren & {
    post: Post
}

function usePostCardContext() {
    const context = useContext(PostCardContext)
    if (!context) {
        throw new Error('usePostCardContext must be used within a PostCardContextProvider')
    }

    return context

}

function PostCardContextProvider({children, post}: PostCardContextProviderProps) {
    return (
        <PostCardContext.Provider value={{post}}>
            {children}
        </PostCardContext.Provider>
    )
}


type Post = {
    id: number
    title: string
    content: string
    user: {
        id: number
        name: string
    }
}

type PostCardProps = PropsWithChildren & {
    post: Post
}

export default function PostCard({post, children}: PostCardProps) {
    return (
        <PostCardContext.Provider value={{post}}>
            <div className="flex flex-col gap-2 rounded-md bg-green-200 h-full w-full text-white p-4">
                {children}
            </div>
        </PostCardContext.Provider>
    )
}

PostCard.Title = function PostCardTitle() {
    const {post: {title}} = usePostCardContext()
    return (
        <h2 className="text-lg font-semibold">{title}</h2>
    )
}

PostCard.Content = function PostCardContent() {
    const {post: {content}} = usePostCardContext()
    return (
        <p>{content}</p>
    )
}

PostCard.User = function PostCardUser() {
    const {post: {user}} = usePostCardContext()
    return (
        <p className="text-sm text-neutral-400">By {user.name}</p>
    )
}

PostCard.Buttons = function PostCardButtons() {
    return (
        <div className="flex flex-row gap-2">
            <button>Read More</button>
            <button>Comments</button>
        </div>
    )
}