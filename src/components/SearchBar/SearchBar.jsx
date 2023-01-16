import PropTypes from 'prop-types'
import { Component } from 'react'
import styles from './SearchBar.module.css'

export class Searchbar extends Component {
    
    render() {
        return (
            <header className={styles.searchbar_header}>
                <form className={styles.form} onSubmit={this.props.onSubmit}>
                    <button type="submit" className={styles.form_button}>&#x1F50D;</button>

                    <input 
                        onChange={this.props.onInputChange}
                        className={styles.form_input}
                        name='searchInput'
                        type="text"
                        autoComplete="off"
                        value={this.props.searchText}
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