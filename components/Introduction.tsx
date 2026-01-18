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
                  className="mb-4 bg-[#f3f5f6] dark:bg-[#141414] p-4 sm:break-inside-avoid rounded-lg border border-[#e5e5e5] dark:border-[#2e2e2e]"
                >
                  <h3 className="text-lg md:text-xl dark:text-white px-3 pt-2 font-semibold">
                    {x.title}
                  </h3>
                  <h4 className="text-sm md:text-base dark:text-white px-3 py-2 opacity-60 dark:opacity-70">
                    {x.description}
                  </h4>
                  {x.links &&
                    x.links.map((z, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col px-3 py-1"
                        >
                          <div className="border-t border-[#e5e5e5] dark:border-[#2e2e2e] pt-3">
                            {z.links.map((l, index) => {
                              return (
                                <Link
                                  href={l.link}
                                  key={l.id || index}
                                  className="intro-link flex flex-row justify-between items-center dark:hover:bg-[#242424] hover:bg-gray-200 transition-colors duration-300 px-3 py-1.5 rounded"
                                >
                                  <span
                                    className="text-sm font-medium"
                                    style={{
                                      color: `#${z.textcolor || "000"}`,
                                    }}
                                  >
                                    {l.placeholder}
                                  </span>
                                  <FaArrowRight className="opacity-50 text-xs" />
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