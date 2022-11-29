import Header from "../components/Header";
// import FullCalendar from "@fullcalendar/react";
// The import order DOES MATTER here. If you change it, you'll get an error!
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-[url('/img/asphalt_myco.jpg')] bg-fixed bg-black home bg-cover max-w-screen h-screen">
        <h1 className="text-8xl home text-yellow-400 absolute bottom-1/2 left-10">
          James Oliver
        </h1>
        <h2 className="home text-6xl text-white bg-bruise absolute bottom-0 right-0 left-0 w-full p-3">
          Mycology
          <span className=""> & </span>
          <span className="">Soil Science</span>
        </h2>
      </div>
      <div id="extra" className="h-screen w-100 bg-zinc-200 text-black">
        <p>
          {" "}
          In this section we could have an event/news feed like blog posts
          almost{" "}
        </p>
        <div className="flex flex-col">
          <h2 className="text-5xl">
            microscopic photograph of mycorrhizae in plant roots{" "}
          </h2>
          <div className="flex flex-row">
            <p className="p-5 text-sm">
              {" "}
              This image is Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
