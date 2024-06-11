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
        <body className='bg-primary'>
          <Provider>
            <div className='bg-primary flex w-full relative'>
              <div className='md:w-1/5'>
                <Sidebar />
              </div>
              
              <div className='flex flex-col flex-1 w-full'>
                <div className='fixed w-full md:w-4/5'>
                  <Navbar />
                </div>
                {children}
              </div>
            </div>
          </Provider>
        </body>
    </html>
  )
};

export default RootLayout;