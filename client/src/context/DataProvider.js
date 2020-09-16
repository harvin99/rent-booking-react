import React, { createContext } from "react";
import { useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [state, setState] = useState({});
  
    // handle for auth
    const setAuth = async (user, token) => {
      const auth = { user, token };
      setState({ ...state, auth });
      if (user.isOwnerSubStore) {
        // get store
        try {
          const store = await UserService.getStoreByUser(user._id);
          setState(state => ({
            ...state,
            auth: { ...state.auth, store }
          }));
          const books = await BookService.getBooks({
            all: 1,
            storeId: store._id
          });
          setState(state => ({
            ...state,
            auth: { ...state.auth, books }
          }));
        } catch (error) {
          message.error(error.message);
        }
      }
    };
  
    const setMyStore = store => {
      const user = { ...state.auth.user, isOwnerSubStore: true };
      setState(state => ({ ...state, auth: { ...state.auth, store, user } }));
    };
    // handle for book
    const setBooks = books => {
      setState(state => ({ ...state, books }));
    };
  
    const addBooksToStore = addedBooks => {
      const {
        auth: { books = [] }
      } = state;
      let newBooks = [...addedBooks, ...books];
      setState(state => ({ ...state, auth: { ...state.auth, books: newBooks } }));
    };
    const updateBookInStore = updatedBook => {
      const {
        auth: { books = [] }
      } = state;
      let newBooks = books.slice();
      const index = books.findIndex(book => book._id === updatedBook._id);
      newBooks.splice(index, 1, updatedBook);
      setState(state => ({ ...state, auth: { ...state.auth, books: newBooks } }));
    };
  
    // handle for cart
    const addToCart = (book, cb = () => {}) => {
      const { cart, cartSize } = state;
      let newCart = cart ? { ...cart } : {};
      if (newCart[book._id]) {
        cb();
        return;
      }
      newCart[book._id] = { ...book, count: 1 };
      setState({ ...state, cart: newCart, cartSize: cartSize + 1 });
    };
  
    const removeBookInCart = bookId => {
      const { cart, cartSize } = state;
      let newCart = { ...cart };
      delete newCart[bookId];
      setState({ ...state, cart: newCart, cartSize: cartSize - 1 });
    };
  
    const resetCart = () => {
      const { cart, cartSize } = initState;
      setState(state => ({ ...state, cart, cartSize }));
    };
  
    const checkoutCart = () => {
      const { cart, auth } = state;
      if (!cart || !auth) return;
      const books = Object.values(cart);
      let booksWithStore = books.reduce((acc, { _id, store }) => {
        if (!acc[store._id]) {
          acc[store._id] = [_id];
        } else {
          acc[store._id].push(_id);
        }
        return acc;
      }, {});
      booksWithStore = Object.entries(booksWithStore);
      return TransactionService.addTransaction(
        auth.user._id,
        booksWithStore
      ).then(transaction => {
        resetCart();
        return transaction;
      });
    };
  
    // handle for store
    const addSubStores = subStores => {
      setState(state => ({ ...state, subStores }));
    };
  
    const setSubStores = subStores =>
      setState(state => ({ ...state, subStores }));
    const resetState = () => setState(initState);
  
    // handle transaction
    const setTransactions = transactions => {
      setState(state => ({ ...state, transactions }));
    };
  
    return (
      <DataContext.Provider
        value={{
          state: { ...state },
          action: {
            addToCart,
            removeBookInCart,
            resetCart,
            resetState,
            setAuth,
            addSubStores,
            setSubStores,
            setMyStore,
            setBooks,
            addBooksToStore,
            updateBookInStore,
            checkoutCart,
            setTransactions
          }
        }}
      >
        {children}
      </DataContext.Provider>
    );
  };