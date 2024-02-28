import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import InputField from '../components/InputField';

const CreatePage = () => {
  const navigate = useNavigate();
  //formun gönderilmesi
  const handleSubmit =(e)=>{
    //sayfa yenilemeyi engelle
    e.preventDefault();

    //inputlardaki verileri bir obje oluştur
    const form = new FormData(e.target);
    
    const data = Object.fromEntries(form.entries());

    //veriyi apiye gönder

    axios.post("http://127.0.0.1:5001/api/movies", data)
    .then(()=>{
      //bildirim ver
      toast.success("Film başarıyla oluşturuldu")
      //anasyafaya yönlendir
navigate("/");
    })
    .catch(()=>{
      //bildirim ver
      toast.error("Film oluşturma başarısız")
    });
  };
      return (
    <div className="grid place-items-center bg-green-200 h-[calc(100vh-81px)]">
      <div className="max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 gap-10 bg-white rounded p-10 shadow-lg">
      
        <form onSubmit={handleSubmit} className="flex flex-col gap-8" >
        <h1 className="text-4xl font-bold mb-10">Yeni Film Oluştur</h1>
          <InputField label= "Başlık" type="text" name= "title"/>
          <InputField label="Kategori"type="text" name= "genre"/>
          <InputField label="Puan"type="number" name= "rating"/>
          <InputField label="Yıl"type="number" name= "year"/>


<button className='bg-green-200 p-1 rounded-md text-white font-semibold hover:bg-green-100'>Oluştur</button>
        </form>
        <div className='flex items-center justify-center'>
        <img className= "rounded-full max-h-[300px]"src="movie-bg.jpg"/>
        </div>
     
      </div>
    </div>
  )
}

export default CreatePage;