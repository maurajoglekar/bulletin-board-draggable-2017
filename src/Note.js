import React from 'react'
import createReactClass from 'create-react-class';
import './App.css'
import Draggable from 'react-draggable'

var Note = createReactClass({
            getInitialState() {
                return {editing: false}
            },
            componentWillMount() {
                this.style = {
                    right: this.randomBetween(0, window.innerWidth - 150, 'px'),
                    top: this.randomBetween(0, window.innerHeight -150, 'px'),
                    backgroundColor: this.randomColor()
                }
            },
            componentDidUpdate() {
                if (this.state.editing) {
                    this.refs.newText.focus()
                    this.refs.newText.select()
                }
            },
            shouldComponentUpdate(nextProps, nextState) {
                return this.props.children !== nextProps.children || this.state !== nextState
            },
            randomBetween(x, y, s) {
                return (x + Math.ceil(Math.random() * (y-x))) + s
            },
            randomColor() {
                var colors = ["#58B3FF", "#FF605F", "#FFD52E", "#49DD8E", "#AE99FF"];
                var bgcolor= Math.floor(Math.random() * colors.length); 
                return colors[bgcolor];
            },
            edit() {
                this.setState({editing: true})
            },
            save() {
                this.props.onChange(this.refs.newText.value, this.props.id)
                this.setState({editing: false})
            },
            remove() {
                this.props.onRemove(this.props.id)
            },
            renderForm() {
                return (
                    <div className="note" 
                         style={this.style}>
                      <textarea ref="newText"
                                defaultValue={this.props.children}>
                      </textarea>
                      <button onClick={this.save}>SAVE</button>
                    </div>
                )
            },
            renderDisplay() {
                return ( 
                    <div className="note"
                         style={this.style}>
                        <p>{this.props.children}</p>
                        <span>
                          <button onClick={this.edit}>EDIT</button>
                          <button onClick={this.remove}>X</button>
                        </span>
                    </div>
                    )
            },
            render() {
              return ( <Draggable>
                       {(this.state.editing) ? this.renderForm()
                                          : this.renderDisplay()}
                       </Draggable>
                )

            }
        })

export default Note
