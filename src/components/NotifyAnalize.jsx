import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function NotifyAnalize() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [notifications, setNotifications] = useState([]);
  const shownNotifications = useRef(new Set()); 
  const hasFetched = useRef(false);


  const {id} = useParams(); 

  useEffect(() => {
    if (hasFetched.current) return; 

    async function fetchData() {
      try {
        const { data } = await axios.get(`${apiUrl}/notification/getByHref`, {
          params: { href: `/panj/${id}` },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('site')}`,
          },
        });

        setNotifications(data);

        data.forEach((noti) => {
          if (!shownNotifications.current.has(noti.id)) {
            shownNotifications.current.add(noti.id);
            showToast(noti);
          }
        });

        hasFetched.current = true;
      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov z API-ja:', error);
      }
    }

    fetchData();
  }, []);

  const showToast = (noti) => {
    const options = {
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    const content = (
      <div>
        <strong>{noti.summary}</strong>
        <div>{noti.description}</div>
      </div>
    );

    switch (noti.severity) {
      case 1:
        toast.info(content, options);
        break;
      case 2:
        toast.warn(content, options);
        break;
      case 3:
        toast.error(content, options);
        break;
      default:
        toast.info(content, options);
    }
  };

  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
