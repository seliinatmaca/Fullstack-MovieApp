import { Link } from 'react-router-dom';
const Card = ({ movie, index }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="cursor-pointer  flex flex-col items-center"
    >
      <div className="relative">
        <img
          className="rounded-md"
          height={300}
          src={`https://picsum.photos/200/30${index}`}
          alt="poster"
        />
        <span
          style={{
            background:
              movie.rating > 8
                ? 'green'
                : movie.rating > 6
                ? 'orange'
                : 'red',
          }}
          className="absolute left-[10px] bottom-[-10px] p-1 rounded-full text-white font-semibold"
        >
          {movie.rating}
        </span>
      </div>

      <h3 className="mt-4 font-bold">{movie.title}</h3>
      <p className="text-gray-400 flex gap-2">
        <span>{movie.year}</span>
        <span>{movie.genre}</span>
      </p>
    </Link>
  );
};

export default Card;
