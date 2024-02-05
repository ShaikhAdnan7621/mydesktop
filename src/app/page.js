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
            <div className="flex mt-10 h-screen ">
                <div className=" w-96 overflow-y-scroll no-scrollbar">
                    <Todo />
                </div>
                <div className=" w-96 ">
                    <Bookmark />
                </div>
            </div>
        </main>
    );
}
