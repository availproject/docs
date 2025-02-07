import { IntroData } from "@static/introductionData";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function Introduction() {
  return IntroData ? (
    <>
      <div id="intro">
        <div className="mx-auto max-w-screen-2xl px-12 py-16 sm:px-6">
          {/* Changed from columns to grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {IntroData.map((x, index) => {
              return (
                <div
                  key={index}
                  className="transform transition-transform duration-300 hover:scale-[.99] mb-8 card_background bg-[#f8fbff] dark:bg-[#212123] p-2 sm:break-inside-avoid rounded-2xl"
                >
                  <h3 className="text-xl md:text-3xl font-SpaceGrotes dark:text-white px-5 pt-5 opacity-90 font-thicccboi font-bold">
                    {x.title}
                  </h3>
                  <h4 className="text-md md:text-lg font-SpaceGrotes dark:text-white px-5 py-5 opacity-50 dark:opacity-70 font-ppmori">
                    {x.description}
                  </h4>
                  {x.links &&
                    x.links.map((z, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col px-5 py-2 space-y-2"
                        >
                          <h2 className="text-xl text-[#4E6786] font-thicccboi font-semibold">
                            {"topic" in z ? z.topic : ""}
                          </h2>
                          <div className="pb-2">
                            {z.links.map((l, index) => {
                              return (
                                <Link
                                  href={l.link}
                                  key={l.id || index}
                                  className="flex flex-row justify-between items-center hover:bg-gray-200 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-md"
                                >
                                  <div
                                    className="text-2xl hover:underline font-thicccboi font-bold"
                                    style={{
                                      color: `#${z.textcolor || "000"}`,
                                    }}
                                  >
                                    {l.placeholder}
                                  </div>
                                  <FaArrowRight className="transform transition-transform duration-300 hover:scale-110" />
                                </Link>
                              );
                            })}
                          </div>
                          {x.links.length - 1 !== index && (
                            <hr className="my-12 h-px border-t-0 bg-[#D0E5FF] opacity-25 dark:opacity-100" />
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
