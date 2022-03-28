import { useLazyQuery, useQuery } from '@apollo/client';
import {
  GET_CHAPTERS,
  GET_VERSES,
  GET_VERSE_BY_ID,
  GET_BOOKS,
} from './api/queries';

function Home() {
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { volumeId: 2 },
  });
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
