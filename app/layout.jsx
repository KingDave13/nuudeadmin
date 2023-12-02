import '@styles/globals.css';
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';


export const metadata = {
    title: "Nuude! Admin",
    description: "The world's most exclusive members-only club!"
};


const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <main className='bg-primary'>
                <Navbar />
                <Sidebar />
                {children}
            </main>
        </body>
    </html>
  )
};

export default RootLayout;