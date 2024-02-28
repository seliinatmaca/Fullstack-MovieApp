
const Hero = () => {
  return (
    <div className="p-10 py-20 mb-10 lg:px-20 bg-[url('wick.jpg')] bg-center bg-cover text-white">
        <h1 className="text-4xl md:text-5xl font-bold">Hoşgeldin.</h1>
        <h2 className="text-2xl md:text-3xl font-semibold">Milyonlarca Film, Dizi ve Aktörleri Keşfet.</h2>

        <div className=" relative rounded-full  flex mt-5 overflow-hidden">
            <input className="w-full p-2 text-black"
            placeholder="Film, Dizi, Aktör arayın..."
            type="text" />
            <button className="absolute bg-blue-400 end-0 h-full w-20 text-white font-semibold hover:bg-blue-500 transition">Ara</button>
        </div>
    </div>
  )
}

export default Hero