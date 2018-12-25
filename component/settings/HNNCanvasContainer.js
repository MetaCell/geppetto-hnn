import React, { Component } from 'react'
import HNNInstantiated from "../instantiation/HNNInstantiated";

export default class HNNCanvasContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <HNNInstantiated />
            </div>
        )
    }
}
