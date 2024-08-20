import React from 'react'

const StockDetailsNews = () => {
    const newsItems = [
        {
            id: 1,
            image: "/assets/image1.png",
            title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
            source: "The Hindu Businessline",
            time: "4 hours ago",
            link: "/news/vidhi-specialty-food-approval",
        },
        {
            id: 2,
            image: "/assets/image1.png",
            title: "Another News Item Title",
            source: "The Times of India",
            time: "2 hours ago",
            link: "/news/another-news-item",
        },
        {
            id: 3,
            image: "/assets/image1.png",
            title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
            source: "The Hindu Businessline",
            time: "4 hours ago",
            link: "/news/vidhi-specialty-food-approval",
        },
        {
            id: 4,
            image: "/assets/image1.png",
            title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
            source: "The Hindu Businessline",
            time: "4 hours ago",
            link: "/news/vidhi-specialty-food-approval",
        },
        {
            id: 5,
            image: "/assets/image1.png",
            title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
            source: "The Hindu Businessline",
            time: "4 hours ago",
            link: "/news/vidhi-specialty-food-approval",
        },
        {
            id: 6,
            image: "/assets/image1.png",
            title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
            source: "The Hindu Businessline",
            time: "4 hours ago",
            link: "/news/vidhi-specialty-food-approval",
        },
    ];

    return (
        <div>
            <div className="pt-[5px]">
                {newsItems.map((item) => (
                    <a key={item.id} href={item.link} className="block mb-4">
                        <div className="flex flex-row md:flex-row items-start md:items-center gap-4 p-4  rounded-md bg-white  cursor-pointer hover:bg-gray-50 transition">
                            {/* <!-- Image Section --> */}
                            <div className="flex-shrink-0">
                                <img src={item.image} alt="News Image" className="w-[50px] h-[50px] md:w-[75px] md:h-[75px] object-cover rounded-md" />
                            </div>

                            {/* <!-- Content Section --> */}
                            <div className="flex-1">
                                <div className="flex flex-col gap-1">
                                    {/* <!-- Title --> */}
                                    <p className="text-sm md:text-base font-bold text-gray-800 line-clamp-2">
                                        {item.title}
                                    </p>
                                    {/* <!-- Meta Info --> */}
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{item.source}</span>
                                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Arrow/Action Icon --> */}
                            <div className="flex items-center justify-end md:flex">
                                <img src="/assets/share1.svg" alt="" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="flex flex-row md:flex-row items-start md:items-center justify-center gap-4 p-4 border rounded-md bg-white  cursor-pointer hover:bg-gray-50 transition">
                <p>Load more</p>
            </div>
        </div>
    )
}

export default StockDetailsNews