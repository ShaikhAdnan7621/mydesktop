// ignore
import Todo from "@/components/Todo";
import Search from "../components/Search";
import Clock from "@/components/Clock";
import WeatherForecast from "@/components/WeatherComponent";
import Bookmark from "@/components/Bookmark";

export default function Home() {
    return (
        <main className="min-h-screen flex-col items-center justify-between px-12 pb-12 dark:bg-black">
            <div className=" flex items-center justify-between p-4 pt-12">
                <div className="h-80 flex justify-center items-center w-96">
                    <Clock />
                </div>
                <div>
                    <Search />
                </div>
                <div className=" w-80 mt-5">
                    <WeatherForecast />
                </div>
            </div>
            <div className="flex mt-10 max-h-[75vh] h-[75vh] gap-4 ">
                <div className=" w-96 overflow-y-scroll no-scrollbar rounded-lg shadow-lg border ">
                    <Todo />
                </div>
                <div className=" w-96 no-scrollbar rounded-lg shadow-lg border">
                    <Bookmark />
                </div>
                <div className=" flex-grow no-scrollbar rounded-lg shadow-lg border">
                    <iframe
                        src="https://open.spotify.com/embed/playlist/2369MfX21WxCOHmfwD00If?utm_source=generator&theme=0&shuffle=true"
                        width="100%"
                        height="100%"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </main>
    );
}
