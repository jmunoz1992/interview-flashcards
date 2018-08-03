/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'

export {default as AllFlashcards} from './flashcards/all-flashcards'
export {default as EachFlashcard} from './flashcards/each-flashcard'
export {default as AddFlashcard} from './flashcards/add-flashcard'
export {default as SingleFlashcard} from './flashcards/single-flashcard'
export {default as EditFlashcard} from './flashcards/edit-flashcard'
// export {default as EachFlashcard} from './each-flashcard'

export {default as AllPacks} from './packs/all-packs'
export {default as EditPack} from './packs/edit-pack'
export {default as AddPack} from './packs/add-pack'

export {default as UserHome} from './user/auth-form'
export {Login, Signup} from './user/auth-form'
