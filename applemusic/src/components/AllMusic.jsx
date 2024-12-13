import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSongs } from '../Redux/reducers/playerReducer'

const AllMusic = () => {
  const dispatch = useDispatch()
  const { songs, isLoading } = useSelector((state) => state.player)

  useEffect(() => {
    dispatch(fetchSongs('top'))
  }, [dispatch])

  if (isLoading) return <div>Caricamento...</div>

  return (
    <div className="all-music">
      <h2>Tutti i brani</h2>
      <div className="songs-grid">
        {songs.map((song) => (
          <div key={song.id} className="song-card">
            <img src={song.album.cover_medium} alt={song.title} />
            <h3>{song.title}</h3>
            <p>{song.artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllMusic
