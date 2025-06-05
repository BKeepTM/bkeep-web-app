import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export default function NotifyAnalize({ dated, recent }) {
    useEffect(() => {
    if (!recent || !dated) return;

    if (recent.weight > dated.weight) {
        toast.success(
        <>
            <div style={{ marginTop: '8px', fontSize: '16px', lineHeight: '1.6' }}>
            <b>Teža medu v panju se je povečala za {(recent.weight - dated.weight).toFixed(2)} kg!</b><br />
            Čebele dobro delajo – verjetno dober donos nektarja <EmojiNatureIcon />
            </div>
        </>,
        {
            toastId: 'medu-vec',
            style: {
            width: '550px',
            minHeight: '120px',
            padding: '16px',
            fontSize: '16px',
            },
        }
        );
    } else {
        toast.warning(
        <>
            <div style={{ marginTop: '8px', fontSize: '16px', lineHeight: '1.6' }}>
            <b>Teža se je zmanjšala za {(dated.weight - recent.weight).toFixed(2)} kg!</b><br />
            Možen razlog: čebele so porabljale zaloge / slab dan za pašo <ThunderstormIcon/>
            </div>
        </>,
        {
            toastId: 'medu-manj',
            style: {
            width: '550px',
            minHeight: '120px',
            padding: '16px',
            fontSize: '16px',
            },
        }
        );
    }
    }, [dated, recent]);

  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
