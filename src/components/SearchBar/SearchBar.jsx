import PropTypes from 'prop-types'
import { Component } from 'react'
import styles from './SearchBar.module.css'

export class Searchbar extends Component {
    state = {
        searchText: "",
    }

    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value,
        })
    }
    render() {
        return (
            <header className={styles.searchbar_header}>
                <form className={styles.form} onSubmit={this.props.onSubmit}>
                    <button type="submit" className={styles.form_button}>&#x1F50D;</button>

                    <input 
                        onChange={this.onInputChange}
                        className={styles.form_input}
                        name='searchInput'
                        type="text"
                        autoComplete="off"
                        value={this.state.searchText}
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}