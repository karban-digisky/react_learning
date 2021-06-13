import React, {Component} from 'react';

import AppHeader from '../app-header';
import PostAddForm from '../post-add-form';
import PostList from '../post-list';
import PostStatusFilter from '../post-status-filter';
import SearchPanel from '../search-panel';

import './app.css'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[
                {label: 'Hope, this stuff works', important: true, like: false, id:1},
                {label: "A little unicorn",important: false, like: false, id:2},
                {label: "Need more sleep",important: false, like: false, id:3},
                {label: "Let's add one more post",important: false, like: false, id:4},
                {label: "And another one",important: false, like: false, id:5}
            ],
            term: ''
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);

        this.maxId = 6;
    }
    deleteItem(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
                const before = data.slice(0, index);
                const after = data.slice(index+1);
                const newArr = [...before, ...after];

                return {
                    data: newArr
                }
        });
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data})=>{
            const newArr = [...data, newItem];
            return {
               data: newArr

            }
        })
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        return {
            data: newArr
        }
        })
    }

    onToggleLiked(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        return {
            data: newArr
        }
        })
    }

    searchPost(items, term){
        if (term.length === 0){
            return items
        }

        return items.filter((item)=>{
            return item.label.indexOf(term) > -1
        })
    }
    onUpdateSearch(term){
        this.setState({term})
    }

    render() {
        const {data, term} = this.state
        const liked = data.filter(item => item.like).length
        const allPosts = data.length;

        const visiblePosts = this.searchPost(data, term);

        return (
            <div className="app">
                <AppHeader
                liked={liked}
                allPosts={allPosts}
                ></AppHeader>
                <div className = "search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}></SearchPanel>
                    <PostStatusFilter></PostStatusFilter>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}></PostList>
                <PostAddForm
                    onAdd={this.addItem}></PostAddForm>
            </div>
        )
    }
};



