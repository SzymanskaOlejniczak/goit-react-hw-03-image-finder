import React, { Component } from "react";
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'
import PropTypes from "prop-types";

const modalRoot = document.getElementById('root');

export class Modal extends Component {
        
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('click', this.handleCloseClick)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('click', this.handleCloseClick)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
        return this.props.onClose();
        }
        };
        
        handleCloseClick = e => {

            if (e.target.alt === undefined ) {
                return this.props.onClose();
            }      
        }

    render() {
        return createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
            <img src={this.props.modalImage} alt="modalPicture" />
            </div>
        </div>, modalRoot
        );
    }
    }

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired,
};