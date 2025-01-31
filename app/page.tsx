export const metadata = {
  title: "Avail Developer Docs"
};

import Introduction from "components/Introduction";

export default function HomePage() {
  return (
    <>
      <div className="relative lg:w-[80vw] max-md:px-3 mx-auto mt-16">
        <img
          src="/introshapes.png"
          alt="left image"
          className="absolute left-0 top-0 -z-10 max-md:opacity-30"
        />
        {/* <h1 className="text-center text-4xl tracking-tighter font-bold md:text-5xl mt-4 font-thicccboibold">
          Avail Developer Docs
        </h1>
        <h1 className="text-center text-xl font-normal mx-auto mt-3 max-w-xl font-thicccboiregular">
          Build with Avail DA, the validity proven data availability layer unifying Web3
        </h1>
        <img
          src="/introshapes.png"
          alt="right image"
          className="absolute right-0 top-0 -z-10 max-md:opacity-30"
        />
      <Introduction /> */}
      </div>

    </>
  );
}