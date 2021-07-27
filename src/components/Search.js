import React from 'react';
import Item from './Item';
const url = 'https://restcountries.eu/rest/v2/all';

class Search extends React.Component {
    constructor() {
        super();
        this.countries = [];
        this.state = {
            loading: true,
            filteredCountries: [],
        };
    }

    performAPICall = async () => {

        this.setState({
            loading: true,
          });

        try {
            const res = await fetch(url);
            const count = await res.json();
            return count;
        } catch (err) {
            return null;
        }

    
    }

    getCountries = async () => {
        let res = await this.performAPICall();
        this.countries = res;
        this.setState({
            filteredCountries: [...this.countries],
            loading: false,
        })
    }

    componentDidMount = () => {
        this.getCountries();

        let details = document.querySelectorAll('.card');
        const header = document.querySelector('.header');
        const input = document.querySelector('#search');
        const select = document.querySelector('.select');
        if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)') {
            details.forEach((detail) => {
                detail.classList.toggle('light-theme');
            });
            if (input)
                input.classList.toggle('light-theme');
            if (select)
                select.classList.toggle('light-theme');
        }
    }

    componentDidUpdate = () => {
        let details = document.querySelectorAll('.card');
        const header = document.querySelector('.header');
        const input = document.querySelector('#search');
        const select = document.querySelector('.select');
        if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)') {
            details.forEach((detail) => {
                detail.classList.toggle('light-theme');
            });
            if (input)
                input.classList.toggle('light-theme');
            if (select)
                select.classList.toggle('light-theme');
        }
    }

    searchCountry = (text) => {
        this.setState({
            loading: true,
          });
        let temp = this.countries.filter((da) => {
            return da.name.toLowerCase().includes(text.toLowerCase());
        });
        this.setState({
            filteredCountries: [...temp],
            loading: false,
        });
        let details = document.querySelectorAll('.card');
        const input = document.querySelector('#search');
        const select = document.querySelector('.select');
        const header = document.querySelector('.header');
        if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)') {
            details.forEach((detail) => {
                detail.classList.toggle('light-theme');
            });
            if (input)
                input.classList.toggle('light-theme');
            if (select)
                select.classList.toggle('light-theme');
        }
    }

    searchRegion = (text) => {
        this.setState({
            loading: true,
          });
        if (text == 'Filter by Region') {
            this.setState({
                filteredCountries: [...this.countries],
                loading: false,
            })
        }
        else {
            let temp = this.countries.filter((da) => {
                return da.region.toLowerCase().includes(text.toLowerCase());
            });
            this.setState({
                filteredCountries: [...temp],
                loading: false,
            })
        }
        let details = document.querySelectorAll('.card');
        const input = document.querySelector('#search');
        const select = document.querySelector('.select');
        const header = document.querySelector('.header');
        if ((window.getComputedStyle(header, null).getPropertyValue('background-color')) != 'rgb(43, 57, 69)') {
            details.forEach((detail) => {
                detail.classList.toggle('light-theme');
            });
            if (input)
                input.classList.toggle('light-theme');
            if (select)
                select.classList.toggle('light-theme');
        }
    }

    render() {
        return (
            <>
                <section className="filter">
                    <form className='form-contro'>
                        <input type="search" className="search" id="search" placeholder="&#xf002;    Search for a country..." onChange
                            ={(e) => this.searchCountry(e.target.value)}  />
                    </form>
                    <div className="region-filter">
                        <select name="select" id="select" className="select" onChange={(e) => this.searchRegion(e.target.value)}>
                            <option value="Filter by Region">Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>

                        </select>
                    </div>
                </section>
                {this.state.loading ? 
                <h2 className = "not-found"> Loading ..</h2>
                : <Item countries={this.state.filteredCountries} />}
                
            </>
        )
    }
}

export default Search;