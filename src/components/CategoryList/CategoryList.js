import React, { Component } from 'react';
import CardEvents from '../CardEvents/CardEvents';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowLeftRounded from '@material-ui/icons/KeyboardArrowLeftRounded';
import { IconButton } from '@material-ui/core';


// All items component
// Important! add unique key
export const Menu = (style) => [1,2,3,4,5,6,7,8,9].map(el => {
    const { index } = el;
    return <CardEvents key={el} type={style.type} style={style.style} />;
});

const Arrow = ({ text, className }) => {
    return (
        <IconButton aria-label="delete" className={className}>
            {text}
        </IconButton>
    );
};

const ArrowLeft = Arrow({ text: <KeyboardArrowLeftRounded /> , className: 'arrow-prev' });
const ArrowRight = Arrow({ text: <KeyboardArrowRightRounded />, className: 'arrow-next' });

class CategoryList extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            selected: this.props.active
        };
    }
    
    onSelect = (key) => {
        this.setState({ selected: key });

        if(this.props.callback){
            this.props.callback(key);
        }
    }

    
    componentDidUpdate = () =>{
        if(this.state.selected !== this.props.active){
            this.setState({
                selected: this.props.active
            });
        }
    }

    
    render() {
        const { selected } = this.state;
        // Create menu from items
        const m = {
            style: this.props.style ? this.props.style : "",
            type: this.props.type ? this.props.type : ""
        }
        const menu = Menu(m, selected);

        return (
            <ScrollMenu
                data={menu}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={selected}
                onSelect={this.onSelect}
                wheel={true}
                hideArrows={true}
                hideSingleArrow={true}
                inertiaScrolling={true}
                scrollToSelected={true}
                alignCenter={false}
            />
        );
    }
}



export default CategoryList;