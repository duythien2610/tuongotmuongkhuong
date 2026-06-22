import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AIConsultantPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col">
      <Header />
      <div className="flex-1 pt-16 lg:pt-20">
        <div 
          className="w-full h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]"
          dangerouslySetInnerHTML={{
            __html: `
              <trustai-main
                uid="tuong-ot-muong-khuong"
                tenant-id="374039086400275295"
                layout="full"
                width="100%"
                height="100%"
              ></trustai-main>
            `
          }}
        />
      </div>
      <Footer />
    </div>
  );
}
