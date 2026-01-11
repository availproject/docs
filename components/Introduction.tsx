import { IntroData } from "@static/introductionData";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Introduction() {
  return IntroData ? (
    <>
      <div id="intro">
        <div className="mx-auto max-w-screen-xl px-12 py-16 sm:px-6">
          {/* Changed from columns to grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {IntroData.map((x, index) => {
              return (
                <div
                  key={index}
                  className="transform transition-transform duration-300 hover:scale-[.99] mb-8 bg-[#f3f5f6] dark:bg-[#141414] p-2 sm:break-inside-avoid rounded-2xl"
                >
                  <h3 className="text-xl md:text-3xl font-SpaceGrotes dark:text-white px-5 pt-5 opacity-90 font-thicccboi font-bold">
                    {x.title}
                  </h3>
                  <h4 className="text-md md:text-lg font-SpaceGrotesk dark:text-white px-5 py-5 opacity-50 dark:opacity-70 font-ppmori">
                    {x.description} 
                  </h4>
                  {x.links &&
                    x.links.map((z, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col px-5 py-2"
                        >
                          <div className="border-t border-[#e5e5e5] dark:border-[#2e2e2e] pt-4">
                            {z.links.map((l, index) => {
                              return (
                                <Link
                                  href={l.link}
                                  key={l.id || index}
                                  className="intro-link flex flex-row justify-between items-center dark:hover:bg-[#242424] hover:bg-gray-200 transition-colors duration-300 px-4 py-2"
                                >
                                  <span
                                    className="text-base font-medium"
                                    style={{
                                      color: `#${z.textcolor || "000"}`,
                                    }}
                                  >
                                    {l.placeholder}
                                  </span>
                                  <FaArrowRight className="opacity-50" />
                                </Link>
                              );
                            })}
                          </div>
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