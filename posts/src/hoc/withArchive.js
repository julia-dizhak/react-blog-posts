import React, { Component } from 'react';
import byArchived from './../utils/archived';

export default function withArchiveHOC(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                archivedItems: []
            };

            this.onArchive = this.onArchive.bind(this);
        }

        onArchive(id) {
            const { archivedItems } = this.state;
        
            this.setState({
                archivedItems: [...archivedItems, id]
            });
        }

        render() {
            const { list } = this.props;
            const { archivedItems } = this.state;

            const filteredList = list.filter(byArchived(archivedItems));

            return (
                <WrappedComponent
                    {...this.props}
                    list={filteredList}
                    onArchive={this.onArchive} 
                />
            )
        }
    };
}
