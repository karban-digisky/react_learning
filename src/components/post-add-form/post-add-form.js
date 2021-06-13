import React from 'react';

import './post-add-form.css'

const PostAddForm = ({onAdd}) => {
    return (
        <form className="bottom-panel d-flex">
            <input 
                className="form-control new-post-label"
                type="text" 
                placeholder="О чём вы думаете сейчас?">
            </input>

            <button 
                className="btn btn-outline-secondary"
                type="submit"
                onClick={()=> onAdd('Hello')}
            >Добавить</button>
        </form>
    )
}

export default PostAddForm;
