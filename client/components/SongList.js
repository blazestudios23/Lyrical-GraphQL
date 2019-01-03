import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {

  // renderSongs(songs) {
  //   return songs.map(song =>
  //     <li key={song.id}>{song.title}</li>
  //    );
  //  };
  //
  onSongDelete(id){
    this.props.mutate({ variables: { id }})
    .then(() => this.props.data.refetch());
  }

  render(){
    const {songs, loading} = this.props.data;
    if(loading){return <div>Loading ... </div>}
    return (
      <div>
        <ul className="collection">
          {songs.map(({ id, title }) => <li className="collection-item" key={id}>
            <Link to={`/songs/${id}`} >{title}</Link>
            <i className="material-icons"
              onClick={() => this.onSongDelete(id)} >
              delete
            </i>
          </li>)}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
          >
            <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation deleteSong($id: ID){
    deleteSong(id: $id){
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
