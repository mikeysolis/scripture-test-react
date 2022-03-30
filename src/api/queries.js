// The queries used in the app for retrieving data from Apollo.

import { gql } from '@apollo/client';

const GET_VOLUMES = gql`
  query getVolumes {
    volumes {
      id
      volumeLongTitle
      volumeSubtitle
    }
  }
`;

const GET_BOOKS = gql`
  query getBooks($volumeId: Int!) {
    books(where: { volume: { id: { _eq: $volumeId } } }) {
      id
      bookTitle
    }
  }
`;

const GET_CHAPTERS = gql`
  query getChapters($bookId: Int!) {
    chapters(
      where: { book: { id: { _eq: $bookId } } }
      order_by: { chapterNumber: asc }
    ) {
      id
      chapterNumber
    }
  }
`;

const GET_VERSES = gql`
  query getVerses($chapterId: smallint!) {
    verses(
      where: { chapterId: { _eq: $chapterId } }
      order_by: { verseNumber: asc }
    ) {
      id
      verseNumber
      scriptureText
    }
  }
`;

const GET_VERSE_BY_ID = gql`
  query getVerses($verseId: Int!) {
    verses(where: { id: { _eq: $verseId } }) {
      verseNumber
      scriptureText
    }
  }
`;

export { GET_VOLUMES, GET_BOOKS, GET_CHAPTERS, GET_VERSES, GET_VERSE_BY_ID };
