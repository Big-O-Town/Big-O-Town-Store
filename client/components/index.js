/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as Product} from './product'
export {default as Checkout} from './checkout'
export {default as AdminPage} from './adminPage/adminPage'
export {default as SearchBar} from './searchBar/searchBar'
export {default as FilterBar} from './filterBar/filterBar'
export {default as AccountPage} from './accountPage/accountPage'
export {Confirmation} from './confirmation'
