import React from 'react';
import PostListItem from '../post-list-item'

import './post-list.css'

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map((item)=>{
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem 
                label={item.label}
                important={item.important}
                like={item.like}
                onToggleImportant={()=>onToggleImportant(item.id)}
                onToggleLiked={()=>onToggleLiked(item.id)}
                onDelete={()=> onDelete(item.id)}>

                </PostListItem>
            </li>
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;