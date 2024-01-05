import '@styles/globals.css';
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import Provider from '@components/Provider';


export const metadata = {
    title: "Nuude! Admin",
    description: "The world's most exclusive members-only club!"
};


const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
          
            <div className='bg-primary flex md:px-16 px-6'>
              <Sidebar />
              <div className='flex flex-col flex-1 overflow-hidden'>
                <Navbar />
                {children}
              </div>
            </div>
          
        </body>
    </html>
  )
};

export default RootLayout;