import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ countries }) => {


    return (
        <>
            {countries.length != 0 ? 
                <div className="cd card-group">
                {countries.map((country) => {
                    const { numericCode, name, population, region, capital, flag } = country;
                    return (
                        <Link to={`/countries/${name}`} className="test col-lg-3 col-md-4 col-sm-6 col-xs-12">


                            <div className="card card-det">
                                <img className="img-det card-img-top" src={flag} alt="Card image cap" />
                                <div className="card-body cb-det">
                                    <h5 className="card-title font-weight-bold">{name}</h5>
                                    <p className="card-text font-weight-normal">Population: <span className="font-weight-light">{population}</span></p>
                                    <p className="card-text font-weight-normal">Region: <span className="font-weight-light">{region}</span></p>
                                    <p className="card-text font-weight-normal">Capital: <span className="font-weight-light">{capital}</span></p>
                                </div>
                            </div>
                        </Link>
                    )
                })
                }
            </div> : 
            <div>
                <h2 className="not-found">Search Not Valid</h2>
                </div>}
            {/*<div className="cd card-group">
                {countries.map((country) => {
                    const { numericCode, name, population, region, capital, flag } = country;
                    return (
                        <Link to={`/countries/${name}`} className="test col-lg-3 col-md-4 col-sm-6 col-xs-12">


                            <div className="card card-det">
                                <img className="img-det card-img-top" src={flag} alt="Card image cap" />
                                <div className="card-body cb-det">
                                    <h5 className="card-title font-weight-bold">{name}</h5>
                                    <p className="card-text font-weight-normal">Population: <span className="font-weight-light">{population}</span></p>
                                    <p className="card-text font-weight-normal">Region: <span className="font-weight-light">{region}</span></p>
                                    <p className="card-text font-weight-normal">Capital: <span className="font-weight-light">{capital}</span></p>
                                </div>
                            </div>
                        </Link>
                    )
                })
                }
            </div>*/}
        </>
    )
}

export default Item