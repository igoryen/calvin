import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    //================================

    handleDeleteOptions = () => {
        this.setState(() => ({
            options: []
        }));
    };

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };

    handlePick = () => {
        const rno = Math.floor(Math.random() * this.state.options.length); // rno = random number
        const opt = this.state.options[rno];
        // alert(opt);
        this.setState(() => ({
            selectedOption: opt
        }));
    };
    handleAddOption = (option) => {
        if (!option) { // if an empty string
            return 'Enter valid value to add item'
        }
        else if (this.state.options.indexOf(option) > -1) { // array already has a match
            return 'This option already exists'
        }
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    };
    //===================================
    // Life-cycle methods work on CBCs, not on SFCs.
    // CBC - class-based components
    // SFC - stateless functional comps

    // remotely like $(foo).load()
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options })); // = options: options
            }
        }
        catch (e) {
            // If JSON data is invalid, do nothing at all.
        }
    }

    // remotely like $(foo).change()
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    // right before the component unmounts/disappears from the screen
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }


    //---------------------------------
    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOpts={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        )
    }
}
