import { Component } from 'react'
import Notiflix from 'notiflix';
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Searchbar } from "../SearchBar/SearchBar";
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal'
import {fetchPhotos} from 'components/api';
import styles from './App.module.css'

export class App extends Component {

  state = {
    cards: [],
    search: "",
    error: "",
    loading: false,
    page: 1,
    showModal: false,
    modalImage: null,
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search || this.state.page !== prevState.page) {
      setTimeout(this.fetchPosts, 600) 
    }
  }
  fetchPosts = async() => {
    const { search, page } = this.state;
    try {
      const data = await fetchPhotos(search, page);
      const dataArray = [];
      data.map(({ id, webformatURL, largeImageURL }) =>dataArray.push({ id, webformatURL, largeImageURL })
      )
      if (dataArray.length === 0) {
        Notiflix.Notify.failure('not found any picture!');
        return dataArray;
      };
    
      const newCards=await fetchPhotos(search, page);
      this.setState((prevState) => {
          if (prevState.cards.length === 0) {
            return {
              cards: newCards,
            }
          } else {
            return {
              cards: [...prevState.cards, ...newCards]
            }
          }
        })
        console.log(newCards)
      }
      catch (error) {
        this.setState({
          error
        })
      }
      finally {this.setState({
        loading: false  
        })
      }

  }
  
  onSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== this.state.search) {
      this.setState({
      cards: [],
      search: searchValue,
      page: 1,
      loading: true,
      
    })
    } else if (searchValue === "") {
      Notiflix.Notify.info('input is empty!');
    }  
  }

  onLoadMore = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
        loading: true,
      }
    })
  }
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, }));
  }
  
  openModal = (largeImageURL) => {
    this.setState({
      modalImage: largeImageURL,
    })
    this.toggleModal()
  }
render () {

    const {showModal,modalImage,cards,loading} = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.onSubmit}  />
        <ImageGallery cards={cards} onOpen={this.openModal} />
        {loading && <Loader/>}
        {cards.length > 1 && <Button onLoadMore={this.onLoadMore} />}
        {showModal && modalImage && (<Modal onClose={this.toggleModal} modalImage={modalImage} />)}
      </div>
    );
  }
}
