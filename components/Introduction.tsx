import { IntroData } from "@/static/introductionData";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Introduction() {
  
  return IntroData ? (
    <>
      <div id="intro">
        <div className="mx-auto max-w-screen-lg px-8 py-16 sm:px-6 ">
          <div className="[column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-2 lg:gap-8">
            {IntroData.map((x, index) => {
              return (
                <div
                  key={index}
                  className="transform transition-transform duration-3 hover:scale-95 mb-8 card_background sm:break-inside-avoid rounded-2xl border-solid border border-[#212123]"
                >
                  <h3 className="text-xl md:text-3xl font-SpaceGrotesk text-black px-5 pt-5 opacity-90 font-thicccboibold">
                    {x.title}
                  </h3>
                  <h4 className="text-md md:text-lg font-SpaceGrotesk text-black px-5 py-5 opacity-50 font-ppmori">
                    {x.description}
                  </h4>
                  {x.links &&
                    x.links.map((z, index) => {
                      return (
                        <div key={index} className="flex flex-col px-5 py-2  space-y-2">
                         <h2 className={`text-xl text-[#4E6786] font-thicccboisemibold`}>{'topic' in z ? z.topic : ''}</h2>
                          <div className="pb-2">
                            {z.links.map((l, index) => {
                              return (
                                <>
                                  <div key={index}
                                    className={`flex flex-row justify-between items-center`}
                                  >
                                    <Link
                                      href={l.link}
                                      className={`text-2xl hover:underline  font-thicccboibold`}
                                      style={{ color: `#${z.textcolor || '000'}` }}
                                    >
                                      {l.placeholder}
                                    </Link>
                                    <FaArrowRight />
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          {x.links.length - 1 !== index && (
                            <hr className="my-12 h-px border-t-0 bg-[#D0E5FF]  opacity-25 dark:opacity-100" />
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div></div>
  );
}
