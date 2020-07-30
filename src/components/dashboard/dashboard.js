import React, { Component } from "react";
import './dashboard.css';
import ReactMapGL from 'react-map-gl';
import {PostDates} from '../../service/PostDates';
import {PostCarrier} from '../../service/PostCarrier';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: '100%',
                height: 300,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 7,
                mapboxApiAccessToken: 'pk.eyJ1IjoiYWxleC0xMzkiLCJhIjoiY2tkNHl2emYyMG1sMDJ4b2NoODJieW9sZiJ9.6sRiF8vW8x6CWsNfsVRQgQ',
            },
            tableData: [],
            nonWorkingDays: [],
            printerRequired: false,
            paidReturn: false,
            showResults: []
        }
    }

    componentDidMount() {
        PostDates(this.state.nonWorkingDays).then((result) => {
            
        });

        PostCarrier(this.state.tableData).then((result) => {
            if (result) {
                this.setState({tableData: result, showResults: result});
            }
        });
    }

    filterTable(target) {
        this.setState({[target]: !this.state[target]},
            () => {
                let filtered = [] 

                if (target === 'printerRequired') {
                    if (this.state.printerRequired === true) {
                        filtered = this.state.showResults.filter(item => item.requiredPrinter === "yes")
                    } else {
                        filtered = this.state.showResults;
                    }

                } else if (target === 'paidReturn') {
                    if (this.state.paidReturn === true) {
                        filtered = this.state.showResults.filter(item => item.price === "0" || item.price === "0$")
                    } else {
                        filtered = this.state.showResults;
                    }
                }

                this.setState({tableData: filtered})
            })
    }

    render() {
    
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <p className="text-center">Please choose your return method</p>
                    </div>
                </div>
                <div className="row mb-20">
                    <div className="col-md-5">
                    <input
                            className="form-control"
                            type="text"
                            placeholder="Address"
                        />
                    </div>
                </div>
                <div className="row mb-20">
                    <div className="col-md-8 text-left mt-10">
                        <p>Drop off</p>
                        <ReactMapGL
                            {...this.state.viewport}
                            onViewportChange={(viewport) => this.setState({viewport})}
                        />
                    </div>
                    <div className="col-md-2 text-left">
                        <p>Filter</p>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="printerRequired"
                                onChange={() => this.filterTable('printerRequired')}    
                                checked={this.state.printerRequired} 
                             />
                            <label className="form-check-label" for="printerRequired">Printer required</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" 
                                type="checkbox" 
                                value="" 
                                id="paidReturn" 
                                onChange={() => this.filterTable('paidReturn')}
                                checked={this.state.paidReturn}
                            />
                            <label className="form-check-label" for="paidReturn">Paid return</label>
                        </div>
                    </div>
                </div>
               
               <div className="row border-bottom-bold mb-20">
                    <div className="col-md-2">
                        <h5>Collections</h5>
                    </div>
                    <div className="col-md-2">
                        <h5>Method</h5>
                    </div>
                    <div className="col-md-2">
                        <h5>Printer required</h5>
                    </div>
                    <div className="col-md-2">
                        <h5>Price</h5>
                    </div>
                </div>
                <div className="mb-20">                
                    { (this.state.tableData.length > 0) ? this.state.tableData.map( (data, index) => {
                        return (
                            <div className="row border-bottom">
                            <div className="col-md-2">{ data.logo }</div>
                            <div className="col-md-2">{ data.serviceName }</div>
                            <div className="col-md-2">{ data.requiredPrinter}</div>
                            <div className="col-md-2">{ data.price }</div>
                            </div>
                        )
                    }) : <div>Loading...</div> }
                </div>
                <div className="text-center">
                    <div className="button-wrapper">
                        <button className="btn btn-primary" type="submit">Proceed</button>
                    </div>  
                </div>
            </div>
        );
    }
}

export default Dashboard;