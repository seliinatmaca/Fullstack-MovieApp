import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FaStar, FaBookmark } from 'react-icons/fa6';
import { BiSolidCameraMovie } from 'react-icons/bi';
import Loader from '../components/Loader';
import ErrorDisplay from '../components/ErrorDisplay';
import { FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal';

function DetailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  //1) urlden filmin idsini tanımlayan parametreyi al
  const { id } = useParams();
  //2) apiden filmin verilerini al
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:5001/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(()=> setIsLoading(false));
  }, []);
  console.log(error);
  return (
    <div className='p-10'>
      {isLoading ? (
       <Loader />
      ) : error ? (
        <ErrorDisplay message = {error}/>
      ) :   movie && (
        <div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400"
            >
              <FaTrash />
            </button>
          </div>
          <div className="flex flex-col gap-10 items-center md:flex-row">
            <div>
              <img
                className="rounded-md"
                src="https://picsum.photos/250/400"
                alt="poster"
              />
            </div>
            <div className="flex flex-col gap-10">
              <h1 className="text-3xl font-semibold">
                {movie.title} <span>({movie.year})</span>
              </h1>

              <p>
                <span className="font-semibold me-3">
                  Kullanıcı Skoru:
                </span>
                <span
                  className="p-2 rounded-full text-white font-semibold"
                  style={{
                    background:
                      movie.rating > 8
                        ? 'green'
                        : movie.rating > 6
                        ? 'orange'
                        : 'red',
                  }}
                >
                  {movie.rating}

              </span>

            </p>
            <div className='flex gap-5'>
              <button className='bg-gray-800 text-white p-3 rounded-full'><FaHeart /></button>
              <button className='bg-gray-800 text-white p-3 rounded-full'><FaBookmark /></button>
              <button className='bg-gray-800 text-white p-3 rounded-full'><FaStar /></button>
              <button className='bg-gray-800 text-white p-3 rounded-full'><BiSolidCameraMovie /></button>

            </div>

          


            <p>
              <span className='font-semibold me-3'>Kategoriler:</span>
              <span className='p-2 bg-yellow-600 rounded-full text-white font-semibold'>{movie.genre}</span>

            </p>
            </div>
          </div>
        </div>
      )}

      {/*modal */}
      {isOpen && ( <Modal movie={movie} close={()=> setIsOpen(false)} />
      )}
    </div>
  );
}

export default DetailPage;
