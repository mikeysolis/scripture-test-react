import { useLazyQuery, useQuery } from '@apollo/client';
import {
  GET_CHAPTERS,
  GET_VERSES,
  GET_VERSE_BY_ID,
  GET_BOOKS,
} from './api/queries';

// Function: Home
// The main component that runs the Home page. Below are
// additional components included in this one.
function Home() {
  // Load in the initial books from the New Testament for the
  // Books Select dropdown. This is loaded immediately.
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { volumeId: 2 },
  });
  // Set up apollo queries that will be used at a later time.
  const [getChapters, chaptersResults] = useLazyQuery(GET_CHAPTERS);
  const [getVerses, versesResults] = useLazyQuery(GET_VERSES);
  const [getVerseById, verseByIdResults] = useLazyQuery(GET_VERSE_BY_ID);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <h3>React API Example</h3>
            <p>
              This example uses React to pull data from a GraphQL scripture API.
              The user may search the scriptures and the result is printed to
              the page.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="one-third column">
            <label htmlFor="book">Book</label>
            <BookSelect data={data} onChangeHandler={getChapters} />
          </div>
          <div className="one-third column">
            <label htmlFor="chapter">Chapter</label>
            <ChapterSelect
              chaptersResults={chaptersResults}
              onChangeHandler={getVerses}
            />
          </div>
          <div className="one-third column">
            <label htmlFor="verse">Verse</label>
            <VerseSelect
              versesResults={versesResults}
              onChangeHandler={getVerseById}
            />
          </div>
        </div>

        <div className="row">
          <div className="twelve columns">
            <h5 className="search-result">Search Result</h5>
            <VerseDisplay verseByIdResults={verseByIdResults} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Function: BookSelect
// @Param: data - the initial book data retrieved upon page load.
// @Param: onChangeHandler - the change handler created from
// Apollo's useLazyQuery (getChapters)
// This component displays the Book Select form input
const BookSelect = ({ data, onChangeHandler }) => {
  return (
    <select
      className="u-full-width"
      placeholder="Select a book"
      onChange={e => onChangeHandler({ variables: { bookId: e.target.value } })}
    >
      <option>Select a book</option>
      {data &&
        data.books?.map(book => (
          <option key={book.id} value={book.id}>
            {book.bookTitle}
          </option>
        ))}
    </select>
  );
};

// Function: const ChapterSelect = ({ chaptersResults, onChangeHandler }) => {
// @Param: chaptersResults - the chapter results retrieved after selecting from the
// books select.
// @Param: onChangeHandler - the change handler created from
// Apollo's useLazyQuery (getVerses)
// This component displays the Chapters Select form input
const ChapterSelect = ({ chaptersResults, onChangeHandler }) => {
  const { data, loading } = chaptersResults;

  if (loading)
    return <select className="u-full-width" placeholder={'Loading...'} />;

  return (
    <select
      className="u-full-width"
      id="chapter"
      placeholder="Select a chapter"
      onChange={e =>
        onChangeHandler({ variables: { chapterId: e.target.value } })
      }
    >
      <option>Select a chapter</option>
      {data &&
        data.chapters &&
        data.chapters.map(chapter => (
          <option key={chapter.id} value={chapter.id}>
            {chapter.chapterNumber}
          </option>
        ))}
    </select>
  );
};

// Function: const VerseSelect = ({ versesResults, onChangeHandler }) => {
// @Param: versesResults - the verses results retrieved after selecting from the
// verses select.
// @Param: onChangeHandler - the change handler created from
// Apollo's useLazyQuery (getVerseById)
// This component displays the Verse Select form input
const VerseSelect = ({ versesResults, onChangeHandler }) => {
  const { data, loading } = versesResults;

  if (loading)
    return <select className="u-full-width" placeholder={'Loading...'} />;

  return (
    <select
      className="u-full-width"
      placeholder="Select a verse"
      onChange={e =>
        onChangeHandler({ variables: { verseId: e.target.value } })
      }
    >
      <option>Select a verse</option>
      {data &&
        data.verses &&
        data.verses.map(verse => (
          <option key={verse.id} value={verse.id}>
            {verse.verseNumber}
          </option>
        ))}
    </select>
  );
};

// Function: const VerseDisplay = ({ verseByIdResults }) => {
// @Param: verseByIdResults - the individual verseId
// This component displays the actual verse selected
const VerseDisplay = ({ verseByIdResults }) => {
  const { data, loading, error } = verseByIdResults;

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error...</p>;

  return (
    <>
      {!data || data.verses.length === 0 ? (
        <p>Select a Book, then a Chapter and finally a Verse</p>
      ) : (
        <p>
          {data.verses[0].verseNumber} {data.verses[0].scriptureText}
        </p>
      )}
    </>
  );
};

export default Home;
