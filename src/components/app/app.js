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
                {label: 'Hope, this stuff works', important: true, id:1},
                {label: "A little unicorn",important: false, id:2},
                {label: "Need more sleep",important: false, id:3},
                {label: "Let's add one more post",important: false, id:4},
                {label: "And another one",important: false,id:5}
            ]
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addteItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);

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
        this.state(({data})=>{
            const newArr = [...data, newItem];
            return {
               data: newArr

            }
        })
    }

    onToggleImportant(id){
        console.log(`important: ${id}`)
    }

    onToggleLiked(id){
        console.log(`liked: ${id}`)
    }


    render() {
        return (
            <div className="app">
                <AppHeader></AppHeader>
                <div className = "search-panel d-flex">
                    <SearchPanel></SearchPanel>
                    <PostStatusFilter></PostStatusFilter>
                </div>
                <PostList 
                    posts={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}></PostList>
                <PostAddForm
                    onAdd={this.addItem}></PostAddForm>
            </div>
        )
    }
};



