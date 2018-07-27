/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'

export {default as AllFlashcards} from './all-flashcards'
export {default as EachFlashcard} from './each-flashcard'
export {default as AddFlashcard} from './add-flashcard'
// export {default as EachFlashcard} from './each-flashcard'
export {default as SingleFlashcard} from './single-flashcard'

export {default as AllPacks} from './all-packs'
export {default as EditPack} from './edit-pack'
export {default as AddPack} from './add-pack'

