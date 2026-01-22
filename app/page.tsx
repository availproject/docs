export const metadata = {
  title: "Avail Developer Docs"
};

import Introduction from "components/Introduction";
import { Footer } from "@components/Footer/Footer";

export default function HomePage() {
  return (
    <>
      <div className="relative lg:w-[80vw] max-md:px-3 mx-auto mt-16 mb-8">
        {/* Main heading - regular weight */}
        <h1
          className="text-center text-3xl md:text-4xl lg:text-5xl mt-4 text-[#0a0a0a] dark:text-[#ededed]"
          style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Avail Developer Docs
        </h1>

        {/* Bold blue headline - Thunder ExtraBold LC condensed */}
        <h2 className="thunder-heading text-center text-[80px] md:text-[120px] lg:text-[180px] mt-4">
          BUILD WITH AVAIL
        </h2>

        {/* Subtitle */}
        <p
          className="text-center text-base md:text-lg mx-auto mt-4 max-w-xl text-[#737373] dark:text-[#a1a1a1]"
          style={{
            fontFamily: 'Inter, -apple-system, sans-serif',
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Scale Access to the Onchain Economy.


        </p>
      </div>
      <Introduction />
      <Footer />
    </>
  );
}